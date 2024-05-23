import * as core from '@actions/core'
import { context, getOctokit } from '@actions/github'
import { defaults as defaultGitHubOptions } from '@actions/github/lib/utils'
import { requestLog } from '@octokit/plugin-request-log'
import { retry } from '@octokit/plugin-retry'

import { getRetryOptions, parseNumberArray } from './retry-options'
import { Options } from './types'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function main(): Promise<void> {
  const token = core.getInput('github-token', { required: true })
  const debug = core.getBooleanInput('debug')
  const userAgent = core.getInput('user-agent')
  const previews = core.getInput('previews')
  const retries = parseInt(core.getInput('retries'))
  const exemptStatusCodes = parseNumberArray(core.getInput('retry-exempt-status-codes'))

  const [retryOpts, requestOpts] = getRetryOptions(retries, exemptStatusCodes, defaultGitHubOptions)

  const opts: Options = {
    log: debug ? console : undefined,
    userAgent: userAgent || undefined,
    previews: previews ? previews.split(',') : undefined,
    retry: retryOpts,
    request: requestOpts,
  }

  const github = getOctokit(token, opts, retry, requestLog)

  console.log(github) // eslint-disable-line no-console

  const whoToGreet = core.getInput('who-to-greet', { required: true })
  core.info(`Hello, ${whoToGreet}!`)

  // Get the current time and set as an output
  const time = new Date().toTimeString()
  core.setOutput('time', time)

  // Output the payload for debugging
  core.info(`The event payload: ${JSON.stringify(context.payload, null, 2)}`)
}

module.exports = {
  main,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function handleError(err: any): void {
  // Fail the workflow step if an error occurs
  console.error(err)
  core.setFailed(`Unhandled error: ${err.message}`)
}

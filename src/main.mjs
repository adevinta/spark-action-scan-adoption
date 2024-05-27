import * as core from '@actions/core'
import * as github from '@actions/github'
import { defaults as defaultGitHubOptions } from '@actions/github/lib/utils.js'
import { requestLog } from '@octokit/plugin-request-log'
import { retry } from '@octokit/plugin-retry'
import chalk from 'chalk'

import { getRetryOptions, parseNumberArray } from './retry-options.mjs'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function main() {
  const token = core.getInput('github-token', { required: true })
  const debug = core.getBooleanInput('debug')
  const userAgent = core.getInput('user-agent')
  const previews = core.getInput('previews')
  const retries = parseInt(core.getInput('retries'))
  const exemptStatusCodes = parseNumberArray(core.getInput('retry-exempt-status-codes'))

  const [retryOpts, requestOpts] = getRetryOptions(retries, exemptStatusCodes, defaultGitHubOptions)

  const opts = {
    log: debug ? console : undefined,
    userAgent: userAgent || undefined,
    previews: previews ? previews.split(',') : undefined,
    retry: retryOpts,
    request: requestOpts,
  }

  const gh = github.getOctokit(token, opts, retry, requestLog)

  console.log(gh)

  const whoToGreet = core.getInput('who-to-greet', { required: true })
  core.info(chalk.bgYellow.black.bold(`Hello, ${whoToGreet}!`))

  // Get the current time and set as an output
  const time = new Date().toTimeString()
  core.setOutput('time', time)

  // Output the payload for debugging
  core.info(`The event payload: ${JSON.stringify(github.context.payload, null, 2)}`)
}

export function handleError(err) {
  // Fail the workflow step if an error occurs
  console.error(err)
  core.setFailed(`Unhandled error: ${err.message}`)
}

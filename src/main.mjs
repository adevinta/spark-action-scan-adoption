import * as core from '@actions/core'
import { exec } from '@actions/exec'
// import * as github from '@actions/github'
// import { defaults as defaultGitHubOptions } from '@actions/github/lib/utils.js'
// import { requestLog } from '@octokit/plugin-request-log'
// import { retry } from '@octokit/plugin-retry'

// import { getRetryOptions, parseNumberArray } from './retry-options.mjs'

let output = ''
let error = ''

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function main() {
  // const token = process.env.GITHUB_TOKEN
  const debug = process.env.DEBUG === 'true'
  const fileConfiguration = process.env.CONFIGURATION
  const fileOutput = process.env.OUTPUT
  // const userAgent = core.getInput('user-agent')
  // const previews = core.getInput('previews')
  // const retries = parseInt(core.getInput('retries'))
  // const exemptStatusCodes = parseNumberArray(core.getInput('retry-exempt-status-codes'))

  // const [retryOpts, requestOpts] = getRetryOptions(retries, exemptStatusCodes, defaultGitHubOptions)
  //
  // const opts = {
  //   log: debug ? console : undefined,
  //   userAgent: userAgent || undefined,
  //   previews: previews ? previews.split(',') : undefined,
  //   retry: retryOpts,
  //   request: requestOpts,
  // }
  //
  // const gh = github.getOctokit(token, opts, retry, requestLog)
  //
  // // eslint-disable-next-line no-console
  // console.log(gh)

  // eslint-disable-next-line no-console
  console.log('debug:', debug)
  // eslint-disable-next-line no-console
  console.log('config:', fileConfiguration)

  const options = {
    listeners: {
      stdout: data => {
        output += data.toString()
      },
      stderr: data => {
        error += data.toString()
      },
    },
    cwd: process.cwd(),
  }

  const opts = {
    config: fileConfiguration ? [] : ['--configuration', fileConfiguration],
    output: fileOutput ? [] : ['--output', fileOutput],
  }

  await exec(
    'node',
    [
      'node_modules/@spark-ui/cli-utils/bin/spark.mjs',
      'scan',
      'adoption',
      ...Object.values(opts).flat(),
    ],
    options
  )

  core.info(output)

  // Get the current time and set as an output
  // const time = new Date().toTimeString()
  // core.setOutput('time', time)

  // Output the payload for debugging
  // core.info(`The event payload: ${JSON.stringify(github.context.payload, null, 2)}`)
}

export function handleError(err) {
  // Fail the workflow step if an error occurs
  core.setFailed(`scan error: ${error}`)
  core.setFailed(`Unhandled error: ${err.message}`)
}

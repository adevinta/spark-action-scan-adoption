import * as core from '@actions/core'
import { exec } from '@actions/exec'
// import * as github from '@actions/github'
// import { defaults as defaultGitHubOptions } from '@actions/github/lib/utils.js'
// import { requestLog } from '@octokit/plugin-request-log'
// import { retry } from '@octokit/plugin-retry'

// import { getRetryOptions, parseNumberArray } from './retry-options.mjs'

// let output = ''
let error = ''

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function main() {
  // const token = process.env.GITHUB_TOKEN
  const {
    DEBUG,
    CONFIGURATION,
    OUTPUT,
    VERBOSE,
    DETAILS,
    SORT,
    DIRECTORY,
    EXTENSIONS,
    IMPORTS,
    DATADOG_TAG_KEY,
  } = process.env
  const {
    debug,
    fileConfiguration,
    fileOutput,
    verbose,
    details,
    directory,
    sort,
    extensions,
    imports,
    datadogTagKey,
  } = {
    debug: DEBUG === 'true',
    fileConfiguration: CONFIGURATION,
    fileOutput: OUTPUT,
    verbose: VERBOSE === 'true',
    details: DETAILS === 'true',
    sort: SORT,
    directory: DIRECTORY,
    extensions: EXTENSIONS ? EXTENSIONS.split(',') : [],
    imports: IMPORTS ? IMPORTS.split(',') : [],
    datadogTagKey: DATADOG_TAG_KEY,
  }
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
  console.log('fileConfiguration:', fileConfiguration)
  // eslint-disable-next-line no-console
  console.log('fileOutput:', fileOutput)
  // eslint-disable-next-line no-console
  console.log('verbose:', verbose)
  // eslint-disable-next-line no-console
  console.log('details:', details)
  // eslint-disable-next-line no-console
  console.log('directory:', directory)
  // eslint-disable-next-line no-console
  console.log('sort:', sort)
  // eslint-disable-next-line no-console
  console.log('extensions:', extensions)
  // eslint-disable-next-line no-console
  console.log('imports:', imports)
  // eslint-disable-next-line no-console
  console.log('datadogTagKey:', datadogTagKey)

  const options = {
    listeners: {
      stdout: data => {
        // output += data.toString()
      },
      stderr: data => {
        error += data.toString()
      },
    },
    env: {},
    cwd: process.cwd(),
  }

  const opts = {
    config: fileConfiguration ? ['--configuration', fileConfiguration] : [],
    output: fileOutput ? ['--output', fileOutput] : [],
    verbose: verbose ? ['--verbose'] : [],
    details: details ? ['--details'] : [],
    directory: directory ? ['--directory', directory] : [],
    sort: sort ? ['--sort', sort] : [],
    extensions: extensions ? ['--extensions', extensions] : [],
    imports: imports ? ['--imports', imports] : [],
  }

  console.log(JSON.stringify(opts, null, 2))

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

  core.info('------------------')
  // core.info(output)

  // Get the current time and set as an output
  // const time = new Date().toTimeString()
  // core.setOutput('time', time)

  // Output the payload for debugging
  // core.info(`The event payload: ${JSON.stringify(github.context.payload, null, 2)}`)

  if (datadogTagKey) {
    core.info(`datadog-tag-key: ${datadogTagKey}`)
  }
}

export function handleError(err) {
  // Fail the workflow step if an error occurs
  core.setFailed(`scan error: ${error}`)
  core.setFailed(`Unhandled error: ${err.message}`)
}

import process from 'node:process'

import * as core from '@actions/core'
import { exec } from '@actions/exec'
import { readFileSync } from 'fs'
import path from 'path'

import { log } from './log.mjs'
import { sendMetrics } from './sendMetrics.mjs'

// let output = ''
let error = ''
const fileOutput = './.spark-ui.adoption.json'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function main() {
  const {
    DEBUG,
    CONFIGURATION,
    VERBOSE,
    DETAILS,
    SORT,
    DIRECTORY,
    EXTENSIONS,
    IMPORTS,
    DATADOG_METRICS,
    DATADOG_ORGANISATION_NAME,
  } = process.env
  const {
    debug,
    fileConfiguration,
    verbose,
    details,
    directory,
    sort,
    extensions,
    imports,
    datadogMetrics,
    datadogOrganisationName,
  } = {
    debug: DEBUG === 'true',
    fileConfiguration: CONFIGURATION,
    verbose: VERBOSE === 'true',
    details: DETAILS === 'true',
    sort: SORT,
    directory: DIRECTORY,
    extensions: EXTENSIONS ? EXTENSIONS.split(',') : null,
    imports: IMPORTS ? IMPORTS.split(',') : null,
    datadogMetrics: DATADOG_METRICS === 'true',
    datadogOrganisationName: DATADOG_ORGANISATION_NAME,
  }

  // eslint-disable-next-line no-console
  console.log('debug:', debug)
  // eslint-disable-next-line no-console
  console.log('fileConfiguration:', fileConfiguration)
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
  console.log('datadogMetrics:', datadogMetrics)
  // eslint-disable-next-line no-console
  console.log('datadogOrganisationName:', datadogOrganisationName)

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
    output: ['--output', fileOutput],
    verbose: verbose ? ['--verbose'] : [],
    details: details ? ['--details'] : [],
    directory: directory ? ['--directory', directory] : [],
    sort: sort ? ['--sort', sort] : [],
    extensions: extensions ? ['--extensions', extensions] : [],
    imports: imports ? ['--imports', imports] : [],
  }

  log(JSON.stringify(opts, null, 2))

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

  if (datadogMetrics) {
    let fileContent
    try {
      fileContent = readFileSync(path.join(process.cwd(), fileOutput), 'utf8')
      fileContent = JSON.parse(fileContent)
    } catch (err) {
      log.error('Error reading file:', err)
    }

    try {
      log.info(path.join(process.cwd(), fileOutput))
      log.info(JSON.stringify(fileContent, null, 2))
      if (Object.keys(fileContent).length > 0) {
        await sendMetrics({ data: fileContent, organisationName: datadogOrganisationName })
      } else {
        log.warn('No data to sent to Datadog')
      }
    } catch (error) {
      handleError(error)
    }
  }
}

export function handleError(err) {
  // Fail the workflow step if an error occurs
  core.setFailed(`scan error: ${error}`)
  core.setFailed(`Unhandled error: ${err.message}`)
}

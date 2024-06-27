import { ciMetrics } from './api/index.mjs'
import { log } from './log.mjs'

export const sendMetrics = async ({ data, organisationName, authToken }) => {
  // try {
  //   const promise = await health.read()
  //   log.info('Metrics service alive')
  //   const response = await promise.json()
  //   log.info(JSON.stringify(response, null, 2))
  // } catch (e) {
  //   log.error('Metrics service error')
  // } finally {
  //   log.info('Sending metrics')
  // }

  try {
    const promise = await ciMetrics.create({
      organisationName,
      authToken,
      tags: Object.entries(data).map(([key, values]) => {
        return {
          suffixName: key.slice(key.startsWith('@') ? 1 : 0),
          content: values.importsCount,
        }
      }),
    })
    log.success('Metrics sent')
    const response = await promise.json()
    log.info(JSON.stringify(response, null, 2))
    log.success('Metrics parsed')
    log.success('CI Metrics service sent')

    return response
  } catch (e) {
    log.error('Metrics service error', e)
  }

  return {}
}

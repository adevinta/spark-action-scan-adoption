import { ciMetrics, health } from './api/index.mjs'
import { log } from './log.mjs'

export const sendMetrics = async ({ data, organisationName }) => {
  try {
    const promise = await health.read()
    log.info('Metrics service alive')
    const response = await promise.json()
    log.info(JSON.stringify(response, null, 2))
  } catch (e) {
    log.error('Metrics service error')
  } finally {
    log.info('Sending metrics')
  }

  try {
    const promise = await ciMetrics.create({
      organisationName,
      tags: data.map(([key, values]) => {
        return {
          suffixName: key,
          content: values.importsCount,
        }
      }),
    })
    log.sucess('Metrics sent')
    const response = await promise.json()
    log.info(JSON.stringify(response, null, 2))
    log.sucess('Metrics parsed')
    log.info('CI Metrics service alive')

    return response
  } catch (e) {
    log.error('Metrics service error')
  }

  return {}
}

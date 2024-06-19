import { ciMetrics, health } from './api/index.mjs'
import { log } from './log.mjs'

export const sendMetrics = async ({ data, organisationName }) => {
  try {
    const response = await health.read()
    log.info('Metrics service alive')
    log.info(JSON.stringify(response, null, 2))
  } catch (e) {
    log.error('Metrics service error')
  } finally {
    log.info('Sending metrics')
  }

  try {
    const response = await ciMetrics.create({
      organisationName,
      tags: data.map(([key, values]) => {
        return {
          suffixName: key,
          content: values.importsCount,
        }
      }),
    })
    log.sucess('Metrics sent')
    const json = response.json()
    log.info(JSON.stringify(json, null, 2))
    log.sucess('Metrics parsed')
  } catch (e) {
    log.error('Metrics service error')
  } finally {
    log.info('CI Metrics service alive')
  }
}

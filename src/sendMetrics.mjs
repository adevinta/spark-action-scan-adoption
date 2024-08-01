import { ciMetrics } from './api/index.mjs'
import { log } from './log.mjs'

export const sendMetrics = async ({ data, organisationName, authToken }) => {
  // try {
  //   const promise = await health.read({authToken})
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
      data: Object.entries(data).map(([key, values]) => {
        return {
          packageName: key.slice(key.startsWith('@') ? 1 : 0),
          value: values.importsCount,
        }
      }),
    })
    log.success('Metrics sent')
    if (promise.status === 200) {
      log.success('Metrics sent')

      return promise.status
    } else {
      log.error('Metrics service error')

      return promise.status
    }
  } catch (error) {
    log.error('Metrics service error', error.message)
  }

  return {}
}

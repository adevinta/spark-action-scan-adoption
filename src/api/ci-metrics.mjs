import { log } from '../log.mjs'
import {
  API_DASHBOARD_NAME,
  API_DASHBOARD_TAG_SET_ID,
  API_HOST,
  API_ID,
  API_PROTOCOL,
} from './configuration.mjs'

const PATHNAME = 'ci-metrics'

export const create = async ({
  name = API_DASHBOARD_NAME,
  id = API_ID,
  organisationName,
  tags = [],
  tagSet = API_DASHBOARD_TAG_SET_ID,
  authToken,
}) => {
  log.info(`${API_PROTOCOL}://${API_HOST.PRO}/${PATHNAME}`)
  log.info(
    JSON.stringify(
      {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Basic ${authToken}}`,
      },
      null,
      2
    )
  )
  log.info(
    JSON.stringify(
      {
        name,
        id,
        organisationName,
        tags: tags.map(tag => ({
          tagSetId: API_DASHBOARD_TAG_SET_ID,
          ...tag,
        })),
      },
      null,
      2
    )
  )

  return await fetch(`${API_PROTOCOL}://${API_HOST.PRO}/${PATHNAME}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Basic ${authToken}}`,
    },
    body: JSON.stringify(
      {
        name,
        id,
        organisationName,
        tags: tags.map(tag => ({
          tagSetId: API_DASHBOARD_TAG_SET_ID,
          ...tag,
        })),
      },
      null,
      2
    ),
  })
}

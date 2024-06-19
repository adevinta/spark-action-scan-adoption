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
}) => {
  return await fetch(`${API_PROTOCOL}://${API_HOST}/${PATHNAME}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      id,
      organisationName,
      tags: tags.map(tag => ({
        tagSetId: API_DASHBOARD_TAG_SET_ID,
        ...tag,
      })),
    }),
  })
}

import {
  API_DASHBOARD_NAME,
  API_DASHBOARD_TAG_SET_ID,
  API_HOST,
  API_ID,
  API_PROTOCOL,
} from './configuration.mjs'

const PATHNAME = 'ci-metrics'

export const create = ({
  name = API_DASHBOARD_NAME,
  id = API_ID,
  organisationName,
  data = [],
  tagSet = API_DASHBOARD_TAG_SET_ID,
  authToken,
}) => {
  return fetch(`${API_PROTOCOL}://${API_HOST.PRO}/${PATHNAME}`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Basic ${authToken}`,
    }),
    body: JSON.stringify(
      {
        metrics: name,
        repositoryId: id,
        organisationName,
        tags: {
          tagSetId: tagSet,
          suffixName: organisationName,
          value: true,
        },
        values: data.map(pkg => ({
          key: pkg.packageName,
          value: pkg.value,
        })),
      },
      null,
      2
    ),
  })
}

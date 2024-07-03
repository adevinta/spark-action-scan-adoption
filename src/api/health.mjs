import { API_HOST, API_PROTOCOL } from './configuration.mjs'

const PATHNAME = 'health'

export const read = async ({ authToken }) => {
  return await fetch(`${API_PROTOCOL}://${API_HOST.PRO}/${PATHNAME}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${authToken}`,
    },
  })
}

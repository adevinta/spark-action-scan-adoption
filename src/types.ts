import { RequestRequestOptions } from '@octokit/types'

export interface RetryOptions {
  doNotRetry?: number[]
  enabled?: boolean
}

export interface Options {
  log?: Console
  userAgent?: string
  baseUrl?: string
  previews?: string[]
  retry?: RetryOptions
  request?: RequestRequestOptions
}

#! /usr/bin/env node

/**
 * The entrypoint for the action.
 */
import { handleError, main } from '../src/main.mjs'

process.on('unhandledRejection', handleError)
main().catch(handleError)

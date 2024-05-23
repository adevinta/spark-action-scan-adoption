/**
 * The entrypoint for the action.
 */
import { handleError, main } from './main'

process.on('unhandledRejection', handleError)
main().catch(handleError)

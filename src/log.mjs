import chalk from 'chalk'

// eslint-disable-next-line no-console
const log = console.log

// eslint-disable-next-line no-console
log.success = (...args) => console.log(chalk.green('🎉 ', ...args))
// eslint-disable-next-line no-console
log.error = (...args) => console.log(chalk.red('💥 ', ...args))
// eslint-disable-next-line no-console
log.warn = (...args) => console.log(chalk.yellow('⚠️ ', ...args))
// eslint-disable-next-line no-console
log.info = (...args) => console.log(chalk.cyan('ℹ️ ', ...args))

export { log }

import chalk from 'chalk'

// eslint-disable-next-line no-console
export const log = new Proxy(console.log, {
  // eslint-disable-next-line no-console
  success: (...args) => console.log(chalk.green('🎉 ', ...args)),
  // eslint-disable-next-line no-console
  error: (...args) => console.log(chalk.red('💥 ', ...args)),
  // eslint-disable-next-line no-console
  warn: (...args) => console.log(chalk.yellow('⚠️ ', ...args)),
  // eslint-disable-next-line no-console
  info: (...args) => console.log(chalk.cyan('ℹ️ ', ...args)),
})

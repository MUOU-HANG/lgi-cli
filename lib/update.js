const updateNotifier = require('update-notifier')
const chalk = require('chalk')
const pkg = require('../package.json')

const notifier = updateNotifier({
	pkg,
	updateCheckInterval: 1000,
})

async function updateChk () {
	if (notifier.update) {
		console.log(`New version available: ${chalk.cyan(notifier.update.latest)}, it's recommended that you update before using.`)
		notifier.notify()
	} else {
		console.log(chalk.gray('No new version is available.'))
	}
	return notifier.update
}

// 将上面的 updateChk() 方法导出
module.exports = updateChk


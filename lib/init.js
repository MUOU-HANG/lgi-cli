const inquirer = require('inquirer')
const fse = require('fs-extra');
const download = require('./download');
module.exports = async (projectName) => {
  // 初始化之前判断是否已经存在项目
  const exists = await fse.pathExists(projectName)
  if (exists) {
      // 存在则有用户选择是否需要更换项目名
     const answer = await  inquirer.prompt({
        type: 'confirm',
        name: 'clearProject',
        message: `The project ${projectName} is not empty, continue?`,
        default: false
     })
     answer.clearProject?download(projectName):process.exit(0);
    } else {
    download(projectName);
    }
}

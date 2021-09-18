const download = require('download-git-repo')
const chalk = require('chalk')
const path = require('path')
const inquirer = require('inquirer')
const fse = require('fs-extra')
const templatePath = path.resolve(__dirname, '../templates')
const handlebarHandel = require('./handelbars')

const templatesList = [
  {
    type: "list",
    message: "Please choose a template:",
    name: "type",
    choices: [{
      name: "vue-admin",
      value: {
        url: "github:MUOU-HANG/muou-admin",
        gitName: "MUOU-HANG",
        val:"vue-admin"
      }
    }]
  }
];

module.exports = async (projectName) => {
  const ora = (await import('ora')).default;
  const spinner = ora(chalk.blue("Began to download the template ..."));
  const infosList = [
    {
      type: "input",
      name: "projectName",
      message: `Input your project name:`,
      default: projectName
    },
    {
      type: "input",
      name: "version",
      message: `version:`,
      default: "1.0.0"
    },
    {
      type: "input",
      name: "author",
      message: `anthor:`,
      default: "admin"
    },
    {
      type: "input",
      name: "license",
      message: `license:`,
      default: "MIT"
    }
  ]
  // 获取自定义数据
  const answer = await inquirer.prompt(templatesList);
  inquirer.prompt(infosList).then((infos) => {
    spinner.start();
    // 从git仓库拉取代码
    download(answer.type.url, `${templatePath}/${projectName}`, function (err) {
      if (err) console.log(err);
      // 替换模板中的值
      handlebarHandel(infos);
      spinner.succeed(chalk.blue("Download successfully!"))
    })
    fse.copySync(`${templatePath}/${projectName}`,`./${projectName}`)
  }).catch((err) => {
    spinner.fail(chalk.red("Download filed!"))
    console.log(err);
  })
}

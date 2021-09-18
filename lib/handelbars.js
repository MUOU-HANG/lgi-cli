const path = require('path')
const templatePath = path.resolve(__dirname, '../templates')
const handlebars = require('handlebars')
const fse = require('fs-extra')
module.exports = async (params) => {
  const { projectName, version, license, author } = params;

  // 要替换的信息
  const multiMeta = { projectName, version, license, author }
   // 要替换的文件
  const multiFiles = [
    `${templatePath}/${projectName}/package.json`,
  ]

  // 遍历文件，替换信息
   for (var i = 0;i < multiFiles.length;i++){
    // 这里记得 try {} catch {} 哦，以便出错时可以终止掉 Spinner
      try {
        // 等待读取文件
          const multiFilesContent = await fse.readFile(multiFiles[i], 'utf8')
          // 等待替换文件，handlebars.compile(原文件内容)(模板字符)
          const multiFilesResult = await handlebars.compile(multiFilesContent)(multiMeta)
          // 等待输出文件
          await fse.outputFile(multiFiles[i], multiFilesResult)
      } catch (err) {
          // 退出进程
          process.exit()
      }
  }
}

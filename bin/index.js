#!/usr/bin/env node

// 引入chalk
const chalk = require('chalk');
// 引入commander 命令行交互
const commander = require('commander');
// 引入package.json
const pkg = require('../package.json');
const download = require("../lib/download")
const update = require("../lib/update")
const init = require("../lib/init")

// 版本号
commander.version(pkg.version, '-v -version');

// 初始化项目
commander
  .command("init <projectName>")
  .description("Please input your project name replace <proectName>")
  .action((value) => {
    init(value);
  })

// 启动项目
commander
  .command("dev")
  .description("start your project")
  .action(() => {
    console.log("project start");
  })

// 构建项目
commander
  .command("build")
  .description("build your project")
  .action(() => {
    console.log("project build");
  })

// update
commander
.command("upgrade")
.description("Check the lg-cli Version")
.action(() => {
  update()
})
// test
commander
.command("test <projectName>")
.description("build your project")
.action((projectName,value) => {
  download(projectName)
})
commander.parse(process.argv)


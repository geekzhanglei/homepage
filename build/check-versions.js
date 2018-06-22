// 检查node与npm版本，提示更新相应模块版本
'use strict'
const chalk = require('chalk') //控制台输入样式 chalk
const semver = require('semver') // 语义化控制版本的插件
const packageConfig = require('../package.json')
const shell = require('shelljs') //shell 脚本 Unix shell commands for Node.js

// require('child_process')创建子进程执行命令cmd，返回命令
function exec(cmd) {
    return require('child_process').execSync(cmd).toString().trim()
}

const versionRequirements = [{
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node
}]

// 需要使用npm
if (shell.which('npm')) {
    versionRequirements.push({
        name: 'npm',
        currentVersion: exec('npm --version'),
        versionRequirement: packageConfig.engines.npm
    })
}

// 导出一个检查版本的函数
module.exports = function() {
    const warnings = []

    for (let i = 0; i < versionRequirements.length; i++) {
        const mod = versionRequirements[i]

        // 当前版本不大于所需版本
        if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
            warnings.push(mod.name + ': ' +
                chalk.red(mod.currentVersion) + ' should be ' +
                chalk.green(mod.versionRequirement)
            )
        }
    }

    // 如果有警告，全部输出到控制台
    if (warnings.length) {
        console.log('')
        console.log(chalk.yellow('To use this template, you must update following to modules:'))
        console.log()

        for (let i = 0; i < warnings.length; i++) {
            const warning = warnings[i]
            console.log('  ' + warning)
        }

        console.log()
        process.exit(1)
    }
}

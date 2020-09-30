# code-format
创建一个项目之后引入vuter、eslint、prettier、vscode，发现使用比较混乱，经常会爆一些恶心的错误。潜心研究，搞懂我们的配置，提升以后的开发效率

## vscode vuter插件

* 语法错误检查，包括 CSS/SCSS/LESS/Javascript/TypeScript
* 语法高亮，包括 html/jade/pug css/sass/scss/less/stylus js/ts
* emmet 支持
* 代码自动补全（目前还是初级阶段），包括 HTML/CSS/SCSS/LESS/JavaScript/TypeScript
* 格式化
* [其他](https://vuejs.github.io/vetur/setup.html)

1. [github](https://github.com/vuejs/vetur)
2. [介绍和快速设置](https://vuejs.github.io/vetur/)
3. 格式化程序课在vscode中vuter项中设置，也可以读取.prettierrc文件 [设置](https://vuejs.github.io/vetur/formatting.html#formatters)
4. 可以在jsconfig.json或[tsconfig.json](https://www.tslang.cn/docs/handbook/tsconfig-json.html)配置一些别名

## eslint 
1. [中文官网](https://cn.eslint.org/) 
2. 完全可配置javascript的代码检查工具
3. 主要是读取.eslintrc.*文件  [.eslintrc.js文件配置](https://cn.eslint.org/docs/user-guide/configuring), package.json中也可以定eslintConfig属性进行配置
4. [eslint rules配置规则](https://cn.eslint.org/docs/rules/)
5. .eslintignore 忽略校验的文件和目录，或读取package.json中的eslintIgnore，package.json文件中也会有eslintIgnore文件可供配置，优先读取.eslintignore文件配置

### vscode eslint 
* [vscode eslint配置博客](https://blog.csdn.net/my_new_way/article/details/105177909)
* 主要作用就是根据.eslintrc规则检验编辑器中的代码，不符合提示给出警告、报错。也提供格式化相关配置
* vscode>setting>拓展>ESLint>ESLint: Enable 一定要勾选，否则无法格式化（默认就是勾选）
* 可以看到vscode设置、vscode eslint设置、还有我们后续说的lint-staged都是对编辑器代码进行格式化，因为格式化程序跟检验规则对不上，导致保存后检验出错的主要原因
* 我的eslint编辑器配置
"eslint.codeAction.showDocumentation": {
  "enable": true
}

### vscode eslint PK npm eslint
1. [引用网上作出的区分](https://www.h5w3.com/13505.html)
2. vscode中的eslint是为了你在编辑器中编码不符合eslint规范的时候的提示。npm中的eslint是为了webpack打包的时候，检验代码是否符合eslint规范提示
3. vscode eslint和npm eslint读取.eslintrc.js配置文件，生成规则

## prettier eslint-plugin-prettier
1. [官网](https://prettier.io/)已挂，参照[博客](https://zhuanlan.zhihu.com/p/81764012)
2. 大概意思就是解决风格差异、编辑器差异、设置差异，开放一些必须的设置
3. [prettier配置选项]（https://blog.csdn.net/guowenf/article/details/107346230）
4. 读取.prettierrc文件配置，.prettier.config.js配置，package.json中新建prettier属性
5. eslint-plugin-prettier主要是配合git commit时lint-staged校验使用

### eslint PK prettier
* [eslint和prettier](https://www.jianshu.com/p/dd07cca0a48e)
* eslint为代码格式的校验、代码质量的校验
* prettier只是代码格式的校验（并格式化代码）
* 代码格式的问题通常指单行代码长度、tab长度、空格、逗号表达式等问题
* 代码质量问题指的是：未使用变量、三等号、全局变量声明等问题

### eslint-plugin-vue
* [博客](https://www.lagou.com/lgeduarticle/19420.html)
1. Vue.js官方eslint插件，检查.vue文件中的\<template\> and \<script\>,查找语法，vue指令，vue风格指南错误。
2. @vue/eslint-config-prettier eslint-plugin-vue插件的拓展
3. @vue/eslint-config-typescript 集成Vue-TypeScript的基本配置
4. @vue/cli-plugin-eslint 主要是注入命令vue-cli-service lint。通过.eslintrc或者package.json中eslintConfig字端配置

### lint-staged eslint-config-standard
* [lint-staged使用](https://www.cnblogs.com/jiaoshou/p/12250278.html)
1. 每次修改一次文件就进行一次lint检查
2. eslint-config-standard extends中的扩展流行风格（可能现在没有使用上）

## .editorconfig文件
1. 有助于在不同的编辑器和 IDE 中保持一致的编码样式

## .vscode/settings.json
1. 保存当前工作区的配置，应用于不同的项目不同vscode配置


# 自动化保存>
1. 编辑器自动格式化首先读取.prettierrc文件的配置，http://www.mamicode.com/info-detail-3027882.html  （.prettierrc文件内写注释可能导致不好用）只是一些比较基础的配置。
2. vscode需要以下配置，这样VSCode会根据项目下的.eslintrc.js文件对泽进行验证、格式化代码。参考文章：https://zhuanlan.zhihu.com/p/94175872（）
"editor.codeActionsOnSave": {
     "source.fixAll": true,
 }

## .prettierrc
{
  // tab缩进大小,默认为2
  "tabWidth": 2,
  // 使用分号, 默认true
  "semi": false,
  // 使用单引号, 默认false(在jsx中配置无效, 默认都是双引号)
  "singleQuote": true,
  // 对象、数组最后一个是否包含尾随逗号
  "trailingComma": "none",
  // always 总是有括号 avoid 箭头函数一个参数
  "arrowParens": "avoid",
  // 方法括号之间插入空格
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
  // 让vue中的js按编辑器自带的ts格式进行格式化
  "vetur.format.defaultFormatter.js": "vscode-typescript",
  // 换行长度
  "printWidth": 140,
  // 用tab缩紧，而不是用空格
  "useTabs": false
}

## 一些ts、js文件自动化保存，完全依靠lint-staged这种npm插件
如果需要识别ts文件这种，需要有tsconfig.json配置一些校验的文件路径
需要在.eslintrc.js配置解析ts的解析器
.json文件可以根据eslint规则校验，但是修改后自动格式化无法成功

## 去除vscode的设置
* 编辑器设置中Format On Paste和Format On Save配置一定要去掉，保证我们走lint-staged格式化

## 寻找一下网上比较优的方案
* [腾讯前端规范](https://www.kancloud.cn/digest/code-guide)
* [前端规范](https://guide.aotu.io/index.html)
* [w3cschool前端规范](https://www.w3cschool.cn/webdevelopment/)




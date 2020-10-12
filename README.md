# 统一前端代码风格

> 代码格式问题通常指的是：单行代码长度、tab长度、空格、逗号表达式等问题。
> 代码质量问题指的是：未使用变量、三等号、全局变量声明等问题。

<font color='red'>目标：保证每个同学代码风格一直。编辑保存能自动格式化代码、编辑器能够提示一些常见的错误</font>

使用STAR模型整理，项目[github](https://github.com/swing-hh/uni-mp-template)

## 原因

> 由于代码风格差异、编辑器差异、设置差异导致的开发问题，导致代码风格不统一

## 任务

1. 搞懂有哪些可以配置?
2. 配置项作用是什么?
3. 相互之间的冲突怎么解决?
4. 配置一套统一代码风格的配置后期使用

## 行动

### 可配置项介绍

> 由于涉及一些软件功能过于强大，只讲跟我们博文相关的功能

#### vscode 

* [vscode代码自动格式化](https://www.jianshu.com/p/5cdead935cf9)
* [vscode代码自动格式化配置](https://blog.csdn.net/weixin_40030173/article/details/99852236)

#### vscode vuter插件

* [官网](https://vuejs.github.io/vetur/)
* 语法错误检查，包括 CSS/SCSS/LESS/Javascript/TypeScript
* 语法高亮，包括 html/jade/pug css/sass/scss/less/stylus js/ts
* emmet 支持
* 代码自动补全（目前还是初级阶段），包括 HTML/CSS/SCSS/LESS/JavaScript/TypeScript
* 格式化程序可在vscode中vuter项中设置，也可以读取.prettierrc文件[格式化](https://vuejs.github.io/vetur/formatting.html#formatters)

#### eslint

* [官网](https://cn.eslint.org/) 
* 完全可配置javascript的代码检查工具
* 主要是读取.eslintrc.*文件  [.eslintrc.js文件配置](https://cn.eslint.org/docs/user-guide/configuring), package.json中也可以定eslintConfig属性进行配置
* [eslint rules配置规则](https://cn.eslint.org/docs/rules/)
* .eslintignore 忽略校验的文件和目录，或读取package.json中的eslintIgnore，package.json文件中也会有eslintIgnore文件可供配置，优先读取.eslintignore文件配置

> vscode eslint PK npm eslint

* vscode中的eslint是为了你在编辑器中编码不符合eslint规范的时候的提示。npm中的eslint是为了webpack打包的时候，检验代码是否符合eslint规范提示
* vscode eslint和npm eslint读取.eslintrc.js配置文件，生成规则

#### prettier

* [官网](https://prettier.io/)
* 解决风格差异、编辑器差异、设置差异，只开放一些必须的设置
* 读取.prettierrc文件、.prettier.config.js、package.json中prettier属性

#### vscode Prettier - Code formatter插件

* 按照prettier代码格式化的程序，读取.prettierrc文件，[配置文档](https://prettier.io/docs/en/configuration.html)

#### lint-staged

* [lint-staged使用](https://www.cnblogs.com/jiaoshou/p/12250278.html)
* 每次修改一次文件就进行一次lint检查

#### .vscode/settings.json

* 保存当前工作区的配置，应用于不同的项目不同vscode配置

#### .editorconfig文件

* 有助于在不同的编辑器和 IDE 中保持一致的编码样式

### 配置项互相冲突

> 多个配置项可以设置代码编辑保存格式化，每个规则的不统一可能导致保存后格式与eslint冲突问题而大面积爆红
> 两个同学配置不同，同学A提交代码后B保存代码格式变化导致git diff不准确

<font color='red'>思路：基于项目纬度做代码风格统一，不受限制于编辑器和插件。尽量做到一套配置过后，开发同学最简单的配置统一规范</font>

### 项目配置

> 我们采用prettier格式化代码格式，eslint校验代码质量，lint-staged保存代码时做eslint校验和热修复，husky增强commit和push代码的质量，ts也使用eslint做校验

---
编辑器配置

* vscode去除Format On Paste和Format On Save配置，保证我们走项目格式化程序
* 添加vscode vuter插件（编辑器内其他不做任何配置）
* 添加vscode eslint插件（编辑器内不做任何配置）


---
添加的配置文件

* 添加.prettierrc文件，目标是保持统一的格式
```
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
```
* 添加.eslintrc.js文件，目标是提示一些简单的错误
```
module.exports = {
  // eslint限定为当前特定的项目
  root: true,
  // 全局变量
  env: {
    es6: true,
    node: true
  },
  // plugin:vue/essential 使用eslint-plugin-vue
  // @vue/prettier 使用@vue/eslint-config-prettier
  // @vue/typescript 使用@vue/eslint-config-typescript
  extends: ['plugin:vue/essential', '@vue/prettier', '@vue/typescript'],
  // 一些extend之外的规则配置
  rules: {
    // -------------------------------- 强制的风格 -------------------------------------
    // 禁用console
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 禁用debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 要求或禁止末尾逗号
    'comma-dangle': [2, 'never'],
    // 强制在逗号前后使用一致的空格
    'comma-spacing': 0,
    // 要求箭头函数的参数使用圆括号
    'arrow-parens': 0,
    // 变量只能在其作用域内使用
    'block-scoped-var': 'error',
    // 构造函数首字母大写
    'new-cap': ['error', { capIsNew: false }],
    'no-tabs': 'off',
    // 不允许类成员中有重复的名称
    'no-dupe-class-members': 'error',
    // 禁止 if 语句作为唯一语句出现在 else 语句块中
    'no-lonely-if': 'error',
    // 禁止使用嵌套的三元表达式
    'no-nested-ternary': 'error',
    // 禁用 new Symbol()
    'no-new-symbol': 'off',
    // 禁用八进制字面量
    'no-octal': 'error',
    // 禁止重新声明变量
    'no-redeclare': 'error',
    // 禁止自身比较（要判断 NaN 请使用 typeof x === 'number' && isNaN(x)）
    'no-self-compare': 'error',
    // 关键字不能被遮蔽
    'no-shadow-restricted-names': 'error',
    // 禁止定义前使用变量
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: false
      }
    ],
    // 禁止使用 var（请使用 let or const）
    'no-var': 'error',
    // 禁止使用 void 操作符
    'no-void': 'error',
    // 禁用 with 语句
    'no-with': 'error',
    // 使用单引号，字符串都可以
    quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],

    // -------------------------------- 建议的风格 -------------------------------------
    // 要求使用 === 和 !==
    eqeqeq: ['warn', 'always', { null: 'ignore' }],
    // 强制回调函数最大嵌套深度
    'max-nested-callbacks': ['warn', 10],
    // 限制最大参数个数
    'max-params': ['warn', 10],
    // 提醒空语句块
    'no-empty': 'warn',
    // 禁止不必要的布尔类型转换
    'no-extra-boolean-cast': 'warn',
    // 建议可以表达为更简单结构的条件表达式
    'no-unneeded-ternary': 'warn',
    // 提醒未使用过的变量
    'no-unused-vars': 'warn',
    // 避免不必要的 .call() 和 .apply()
    'no-useless-call': 'warn',
    // 避免没有必要的字符拼接
    'no-useless-concat': 'warn',
    // 避免不必要的转义
    'no-useless-escape': 'warn'
  },
  // TS解析器
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
```
* 添加.editorconfig文件（项目初始化自带），目标是在不同的编辑器中保持统一的样式
```
[*]
charset=utf-8
end_of_line=lf
insert_final_newline=false
indent_style=space
indent_size=2

[{*.ng,*.sht,*.html,*.shtm,*.shtml,*.htm}]
indent_style=space
indent_size=2

[{*.jhm,*.xslt,*.xul,*.rng,*.xsl,*.xsd,*.ant,*.tld,*.fxml,*.jrxml,*.xml,*.jnlp,*.wsdl}]
indent_style=space
indent_size=2

[{.babelrc,.stylelintrc,jest.config,.eslintrc,.prettierrc,*.json,*.jsb3,*.jsb2,*.bowerrc}]
indent_style=space
indent_size=2

[*.svg]
indent_style=space
indent_size=2

[*.js.map]
indent_style=space
indent_size=2

[*.less]
indent_style=space
indent_size=2

[*.vue]
indent_style=space
indent_size=2

[{.analysis_options,*.yml,*.yaml}]
indent_style=space
indent_size=2
```

* package.json文件中增加husky，用于阻止不合法的commit和push
```
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},
"lint-staged": {
  "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}": [
    "eslint --fix"
  ]
}
```

---
使用的插件

* eslint 识别js/es代码规范和错误检查工具
* babel-eslint 解析eslint规则
* eslint-plugin-vue vue官网提供的eslint，继承自动修复
* @vue/cli-plugin-eslint 主要是注入命令vue-cli-service lint。通过.eslintrc或者package.json中eslintConfig字端配置
* prettier 解决风格差异、编辑器差异、设置差异，开放一些必须的设置
* @vue/eslint-config-prettier 关闭eslint与prettier的冲突代码格式化规则
* eslint-plugin-prettier 可以将prettier的规则设置为eslint的规则，对不符合规则的进行提示。（与eslint-plugin-vue相同）
* lint-staged 每次修改一次文件就进行一次lint检查，可以修复一些错误
* @vue/eslint-config-standard vue-cli使用，不是外部使用，是对于eslint-plugin-vue的一些扩展
* eslint-plugin-standard 可以配置的eslint补充standard规则
* husky git commit的时候触发钩子函数，校验规则，阻止不合法的commit和push
* @typescript-eslint/parser 使用eslint规则校验typescript
* @typescript-eslint/eslint-plugin 为typescript提供lint规则

## 结果得到

* 了解了编辑器、插件、npm包之间的一些关系
* 知道了统一前端代码风格的大概流程，之后项目可以按这个思路走
* .eslintrc.js的规则中可以更细的去研究，在开发期可以更好的报警
* 文档的重要性

# 更多的前端规范

* [腾讯前端规范](https://www.kancloud.cn/digest/code-guide)
* [京东前端规范](https://guide.aotu.io/index.html)
* [w3cschool前端规范](https://www.w3cschool.cn/webdevelopment/)
* [百度EFE前端规范](https://github.com/ecomfe/spec)

# 参考链接

* https://segmentfault.com/a/1190000015315545
* https://segmentfault.com/a/1190000020972147
* https://juejin.im/post/6844904065319731208
* https://zhuanlan.zhihu.com/p/68026905

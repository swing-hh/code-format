# code-format
创建一个项目之后引入vuter、eslint、prettier、vscode，发现使用比较混乱，经常会爆一些恶心的错误。潜心研究，搞懂我们的配置，提升以后的开发效率

## vscode vuter插件
1. github：https://github.com/vuejs/vetur
2. 介绍和快速设置：https://vuejs.github.io/vetur/
3. 可以读取.prettierrc文件
4. jsconfig.json或tsconfig.json配置

## eslint 
1. 中文官网：https://cn.eslint.org/
2. javascript的代码监测工具
3. 主要是读取.eslintrc.js文件
4. .eslintignore 忽略校验的文件和目录，或读取package.json中的eslintIgnore

### vscode eslint PK npm eslint
1. 引用网上作出的区分
2. vscode中的eslint是为了你在编辑器中编码不符合eslint规范的时候的提示。npm中的eslint是为了webpack打包的时候，检验代码是否符合eslint规范的
3. vscode eslint和npm eslint读取.eslintrc.js配置文件，生成规则

### prettier eslint-plugin-prettier
1. eslint-plugin-prettier插件会调用prettier对你的代码风格进行检查，其原理是先使用prettier对你的代码进行格式化，然后与格式化之前的代码进行对比，如果过出现了不一致，这个地方就会被prettier进行标记
2. 读取prettier.config.js规则

### eslint-plugin-vue
1. vue官网给出的eslint校验
2. @vue/eslint-config-prettier eslint-plugin-vue插件的拓展
3. @vue/eslint-config-typescript 集成Vue-TypeScript的基本配置
4. @vue/cli-plugin-eslint 主要是注入命令vue-cli-service lint。通过.eslintrc或者package.json中eslintConfig字端配置

### lint-staged eslint-config-standard
1. 每次修改一次文件就进行一次lint检查

## prettier
1. 格式化程序
2. 官网：https://prettier.io/
3. vscode插件 Prettier - Code formatter
4. 读取.prettierrc文件配置，.prettier.config.js配置，package.json中新建prettier属性

## .editorconfig文件
1. 有助于在不同的编辑器和 IDE 中保持一致的编码样式

## .vscode/settings.json
1. 保存当前工作区的配置，应用于不同的项目不同vscode配置


# 自动化保存>
1. vscode>首选项>设置>文本编辑器>正在格式化>Format On Save勾选 （一些格式化都是基于这个）
2. 编辑器自动格式化首先读取.prettierrc文件的配置，http://www.mamicode.com/info-detail-3027882.html  （.prettierrc文件内写注释可能导致不好用）只是一些比较基础的配置。

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

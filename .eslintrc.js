module.exports = {
  // 启用es6 node 浏览器环境监测
  // 浏览器全局变量,
  // 启用除模块以外的所有ECMAScript 6功能
  // Node.js全局变量和Node.js作用域
  env: {
    es6: true,
    node: true,
    // jest: true,
    browser: true
  },
  // 扩展规则
  // 针对vue规则和standard规则
  extends: ['plugin:vue-libs/recommended', 'standard'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018
  },
  rules: {
    // -------------------------------- 强制的风格 -------------------------------------
    // 变量只能在其作用域内使用
    'block-scoped-var': 'error',
    // 大括号规则：控制语句不允许省略大括号
    curly: ['error', 'all'],
    // 使用2个空格作为一个缩进层级，switch 下的 case 和 default 必须增加一个缩进层级
    indent: ['error', 2, { SwitchCase: 1 }],
    // 构造函数首字母大写
    'new-cap': ['error', { capIsNew: false }],
    'no-tabs': 'off',
    // 要求调用无参构造函数时带括号
    'new-parens': 'error',
    // 不允许修改类声明的变量
    'no-class-assign': 'error',
    // 不允许改变用 const 声明的变量
    'no-const-assign': 'error',
    // 不允许类成员中有重复的名称
    'no-dupe-class-members': 'error',
    // 禁止扩展原生对象
    'no-extend-native': 'error',
    // 禁止 if 语句作为唯一语句出现在 else 语句块中
    'no-lonely-if': 'error',
    // 禁止使用 空格 和 tab 混合缩进
    'no-mixed-spaces-and-tabs': 'error',
    // 禁止对原生对象赋值
    'no-native-reassign': 'error',
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
    // 末尾加分号
    semi: ['error', 'always'],
    // 立即执行的函数强制总是包裹 function 表达式，比如 (function () { return { y: 1 };})();
    'wrap-iife': ['error', 'inside'],

    // -------------------------------- 建议的风格 -------------------------------------

    // 建议数组方括号中使用一致的空格
    'array-bracket-spacing': [
      'warn',
      'never',
      {
        objectsInArrays: false,
        arraysInArrays: false
      }
    ],
    // 大括号风格
    'brace-style': ['warn', '1tbs', { allowSingleLine: true }],
    // 提醒变量遵循驼峰写法
    camelcase: 'warn',
    // 建议在逗号前不使用空格，在逗号后使用空格
    'comma-spacing': ['warn', { before: false, after: true }],
    // 建议使用一致的逗号风格
    'comma-style': ['warn', 'last'],
    // 要求使用 === 和 !==
    eqeqeq: ['warn', 'always', { null: 'ignore' }],
    // 建议在对象字面量的键和值之间使用一致的空格
    'key-spacing': [
      'warn',
      {
        beforeColon: false,
        afterColon: true
      }
    ],
    // 强制回调函数最大嵌套深度
    'max-nested-callbacks': ['warn', 10],
    // 限制最大参数个数
    'max-params': ['warn', 10],
    // 提醒使用console
    'no-console': 'off',
    // 提醒空语句块
    'no-empty': 'warn',
    // 禁止不必要的布尔类型转换
    'no-extra-boolean-cast': 'warn',
    // 禁止使用多个空格
    'no-multi-spaces': 'warn',
    // 禁用行尾空格
    'no-trailing-spaces': ['warn', { skipBlankLines: true }],
    // 提醒未声明的变量
    'no-undef': 'warn',
    // 建议可以表达为更简单结构的条件表达式
    'no-unneeded-ternary': 'warn',
    // 提醒未使用过的变量
    'no-unused-vars': 'warn',
    // 避免不必要的 .call() 和 .apply()
    'no-useless-call': 'warn',
    // 避免没有必要的字符拼接
    'no-useless-concat': 'warn',
    // 避免不必要的转义
    'no-useless-escape': 'warn',
    // 禁止属性前有空白
    'no-whitespace-before-property': 'warn',
    // 要求在变量声明周围换行
    'one-var-declaration-per-line': ['warn', 'initializations'],
    // 禁止函数圆括号之前有一个空格
    'space-before-function-paren': ['warn', 'never'],
    // 圆括号内不建议加空格
    'space-in-parens': ['warn', 'never'],
    // 要求中缀操作符周围有空格
    'space-infix-ops': ['warn', { int32Hint: false }],
    // 建议箭头函数的箭头之前或之后有空格
    'template-curly-spacing': ['warn', 'never'],

    // -------------------------------- 检查关闭项 -------------------------------------

    // 关闭嵌套声明检查
    'no-inner-declarations': 'off',
    // 允许多个空行来提高可读性
    'no-multiple-empty-lines': 'off',
    // 暂不要求泛用const
    'prefer-const': 'off',
    // 允许变量遮蔽
    'no-shadow': 'off',
    // 允许在 else 前出现 return
    'no-else-return': 'off',
    // 去除对正则字得验证
    'no-control-regex': 'off',
    'no-new': 'off'
  }
};

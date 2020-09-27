import moment from 'moment'
/**
 * 校验路由是url还是本地vue路由
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 格式化日期格式为1990-11-11
 * @export
 * @param {string} date // 有入参转化入参，没有就获取当天日期
 * @returns {string}
 */
export function dateTransform(date: string): string {
  const curdate: Date = date ? new Date(date) : new Date()
  const returnDate: string = curdate.getFullYear() + '-' + (curdate.getMonth() + 1) + '-' + curdate.getDate()
  return returnDate
}

/**
 * 随机生成字符串
 * @export
 * @param {number} length
 * @returns
 */
export function randomString(length: number) {
  let str: string = ''
  for (; str.length < length; str += Math.random().toString(36).substr(2));
  return str.substr(0, length)
}

/**
 * 设置日期选择器默认时间段
 * @export
 * @param { Object[] } dateList
 * @param { number } range
 * @returns
 */
export function dateRange(dateList: object[], range: number) {
  if (dateList) {
    dateList.forEach((item: any) => {
      if (item.type === 'date') {
        item.default = moment().format('YYYY-MM-DD')
      } else if (item.type === 'daterange') {
        item.default = [moment().subtract(range, 'days').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
      }
    })
  }
  return dateList
}

/**
 * 日期参数赋默认值
 * @export
 * @param { Object[] } dateList
 * @param { Object } params
 * @returns { Object } params
 */
export function setDateDefault(dateList: object[], params: object): object {
  dateList.forEach((item: any) => {
    if (item.type === 'daterange') {
      params[item.key + '_starttime'] = item.default[0]
      params[item.key + '_endtime'] = item.default[1]
    } else {
      params[item.key] = item.default
    }
  })
  return params
}

/**
 * 下拉框参数赋默认值
 * @export
 * @param { Object[] } selectList
 * @param { Object } params
 * @returns { Object } params
 */
export function setSelectDefault(selectList: object[], params: object): object {
  selectList.forEach((item: any) => {
    // 多选赋值
    if (item.multiple && item.multiple === true) {
      const value: Array<number | string> = []
      item.options.forEach((el: any) => {
        if (el.flag === 1) {
          value.push(el.key)
        }
      })
      if (value.length) {
        params[item.key] = value
      }
    }
    // 单选赋值
    else {
      item.options.forEach((el: { flag: number; key: any }) => {
        if (el.flag === 1) {
          params[item.key] = el.key
        }
      })
    }
  })
  return params
}

/**
 * 表格列，设置定位
 * @export
 * @param { Object[] } listTitle
 * @returns { Object } listTitle
 */
export function fixedTableTitle(listTitle: any[]) {
  listTitle.forEach((item: { key: any; fixed: string | boolean }) => {
    switch (item.key) {
      case 'uid':
      case 'mobile':
      case 'statisticsTime':
      case 'putTime':
      case 'code':
      case 'date':
      case 'receive_time':
      case 'receive_count':
        item.fixed = 'left'
        break
      case 'operation':
        item.fixed = 'right'
        break
      default:
        item.fixed = false
        break
    }
  })
  return listTitle
}

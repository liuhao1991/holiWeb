/*
  date object to string
  use age
  format(new Date(), 'yyyy-mm-dd HH:MM:SS')
*/
export function format (date, format) {
  const o = {
    'm+': date.getMonth() + 1,
    'd+': date.getDate(),
    'H+': date.getHours(),
    'M+': date.getMinutes(),
    'S+': date.getSeconds(),
    's+': date.getMilliseconds()
  }
  if ((/(y+)/.test(format))) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
}

/*
use age
const dt = DateFromString('2013-01-29 08:13:54', 'yyyy-mm-dd HH:MM:SS')
const dt = DateFromString('130129', 'yymmdd')
const dt = DateFromString('980129', 'yymmdd')
*/
export function dateFromString (datetime, format) {
  const o = {
    'y+': 0,
    'm+': 1,
    'd+': 0,
    'H+': 0,
    'M+': 0,
    'S+': 0
  }
  for (let k in o) {
    let p = new RegExp('(' + k + ')', 'g')
    if (p.test(format)) {
      let v = datetime.substr(p.lastIndex - RegExp.$1.length, RegExp.$1.length)
      while (v.indexOf('0') === 0) {
        v = v.substr(1)
      }
      o[k] = parseInt((v === '' ? '0' : v))
    }
  }
  // Padding year
  if (o['y+'] < 50) {
    o['y+'] = 2000 + o['y+']
  } else if (o['y+'] <= 99) {
    o['y+'] = 1900 + o['y+']
  }
  let dt = new Date()
  dt.setFullYear(o['y+'], o['m+'] - 1, o['d+'])
  dt.setHours(o['H+'], o['M+'], o['S+'])
  return dt
}

export function addHour (date, n) {
  const dt = new Date()
  dt.setTime(date.getTime() + n * 60 * 60 * 1000)
  return dt
}

export function addMinute (date, n) {
  const dt = new Date()
  dt.setTime(date.getTime() + n * 60 * 1000)
  return dt
}

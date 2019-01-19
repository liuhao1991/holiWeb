import Map from 'ol/Map'
import View from 'ol/View'
import ImageLayer from 'ol/layer/Image'
import ImageStatic from  'ol/source/ImageStatic'
import { fromLonLat, transformExtent, getTransform } from 'ol/proj'
import { applyTransform } from 'ol/extent'
import qs from 'qs'
import axios from 'axios'

export const ruler = [
  {
    varName: 'Pr',
    hourspan: '24',
    name: '24H降水',
    daySpan: [0, 1, 2, 3, 4, 5, 6],
    hours: ['08:00', '20:00']
  },
  {
    varName: 'Pr',
    hourspan: '12',
    name: '12H降水',
    daySpan: [0, 1, 2, 3, 4, 5, 6],
    hours: ['08:00', '20:00']
  },
  {
    varName: 'Pr',
    hourspan: '06',
    name: '6H降水',
    daySpan: [0, 1, 2, 3, 4],
    hours: ['02:00', '08:00', '14:00', '20:00']
  },
  {
    varName: 'Pr',
    hourspan: '03',
    name: '3H降水',
    daySpan: [0, 1, 2],
    hours: ['02:00', '05:00', '08:00', '11:00', '14:00', '17:00', '20:00', '23:00']
  },
  {
    varName: 'Pr',
    hourspan: '01',
    name: '1H降水',
    daySpan: [0, 1, 2],
    hours: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
  },
  {
    varName: 'T',
    hourspan: '',
    name: '正点温度',
    daySpan: [0, 1, 2],
    hours: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
  },
  {
    varName: 'TMax',
    hourspan: '24',
    name: '24小时最高温度',
    daySpan: [0, 1, 2, 3, 4, 5, 6],
    hours: ['08:00', '20:00']
  },
  {
    varName: 'TMin',
    hourspan: '24',
    name: '24小时最低温度',
    daySpan: [0, 1, 2, 3, 4, 5, 6],
    hours: ['08:00', '20:00']
  },
  {
    varName: 'WindEx',
    hourspan: '',
    name: '小时极大风',
    daySpan: [0, 1, 2],
    hours: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
  },
  {
    varName: 'Rh',
    hourspan: '',
    name: '相对湿度',
    daySpan: [0, 1, 2],
    hours: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
  },
  {
    varName: 'Cloud',
    hourspan: '',
    name: '云量',
    daySpan: [0, 1, 2],
    hours: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
  },
]

export const areas = [
  {code: '330100', prefecture: '浙江', province: 'ZheJiang', county: 'ZheJiang', center: [120, 29.3]},
  {code: '330100', prefecture: '杭州', province: 'ZheJiang', county: 'HangZhou', center: [119.498, 29.8884]},
  {code: '330200', prefecture: '宁波', province: 'ZheJiang', county: 'NingBo', center: [121.523, 29.7087]},
  {code: '330300', prefecture: '温州', province: 'ZheJiang', county: 'WenZhou', center: [120.442, 27.867]},
  {code: '330400', prefecture: '嘉兴', province: 'ZheJiang', county: 'JiaXing', center: [120.785, 30.6438]},
  {code: '330500', prefecture: '湖州', province: 'ZheJiang', county: 'HuZhou', center: [119.864, 30.7617]},
  {code: '330600', prefecture: '绍兴', province: 'ZheJiang', county: 'ShaoXing', center: [120.596, 29.7472]},
  {code: '330700', prefecture: '金华', province: 'ZheJiang', county: 'JinHua', center: [119.975, 29.111]},
  {code: '330800', prefecture: '衢州', province: 'ZheJiang', county: 'QuZhou', center: [118.679, 28.9025]},
  {code: '330900', prefecture: '舟山', province: 'ZheJiang', county: 'ZhouShan', center: [122.2111, 30.244]},
  {code: '331000', prefecture: '台州', province: 'ZheJiang', county: 'TaiZhou', center: [121.111, 28.7276]},
  {code: '331100', prefecture: '丽水', province: 'ZheJiang', county: 'LiShui', center: [119.538, 28.193]}
]

export const param = {
  index: 0,
  varName: ruler[0].varName,
  hourspan: ruler[0].hourspan,
  area: areas[0].prefecture,
  dtValid: '',
  clip: true,
  showValue: true,
  fillColor: true,
  textColor: 'rgb(0, 0, 0)',
  textFontSize: 12,
  toFixed: 0,
  maxValue: '',
  minValue: '',
  strokeLine: false,
  lineColor: 'rgb(0, 0, 0)',
  lineWidth: 1
}

let map
let vectorLayer = new ImageLayer()
let url = 'http://localhost/holiday/index.php/ruler/map'

export const initMap = (ele) => {
  map = new Map({
    target: ele,
    layers: [
      vectorLayer,
    ],
    view: new View({
      center: fromLonLat(areas[0].center),
      zoom: 13,
      minZoom: 12,
      maxZoom: 16,
      zoomFactor: 1.5
    }),
    controls: [],
  })
  map.on('moveend', () => {
    generateSource()
  })
}

export const generateSource = (params, center) => {
  if (params) {
    Object.assign(param, params)
  }
  const size = map.getSize()
  const view = map.getView()
  const extent = view.calculateExtent(size)
  let fullLatLon = transformExtent(extent, 'EPSG:3857', 'EPSG:4326')
  let fullMapExtent = [fullLatLon[0], fullLatLon[2], fullLatLon[1], fullLatLon[3]]
  const _param = Object.assign(param, {
    width: size[0],
    height: size[1],
    fullMapExtent
  })
  if (center) {
    map.getView().setCenter(fromLonLat(center))
    map.getView().setZoom(param.area === '浙江' ? 13 : 15)
    return
  }
  axios.post(url, qs.stringify(_param))
    .then(res => {
      return res.data
    })
    .then(res => {
      if (res.length < 1000) {
        vm.$emit('alertError', res)
        vectorLayer.setSource(null)
        return
      }
      const source = new ImageStatic({
        url: res,
        imageSize: size,
        projection: map.getView().getProjection(),
        imageExtent: applyTransform(fullLatLon, getTransform('EPSG:4326', 'EPSG:3857'))
      })
      vectorLayer.setSource(source)
    })
}


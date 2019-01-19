let outOfChina = ((lat, lng) => {
  if ((lng < 72.004) || (lng > 137.8347)) {
    return true;
  }
  if ((lat < 0.8293) || (lat > 55.8271)) {
    return true;
  }
  return false;
})

let transformLat = ((x, y) => {
  let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
  ret += (20.0 * Math.sin(6.0 * x * Math.PI) + 20.0 * Math.sin(2.0 * x * Math.PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(y * Math.PI) + 40.0 * Math.sin(y / 3.0 * Math.PI)) * 2.0 / 3.0;
  ret += (160.0 * Math.sin(y / 12.0 * Math.PI) + 320 * Math.sin(y * Math.PI / 30.0)) * 2.0 / 3.0;
  return ret;
})

let transformLon = ((x,y) => {
  let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
  ret += (20.0 * Math.sin(6.0 * x * Math.PI) + 20.0 * Math.sin(2.0 * x * Math.PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(x * Math.PI) + 40.0 * Math.sin(x / 3.0 * Math.PI)) * 2.0 / 3.0;
  ret += (150.0 * Math.sin(x / 12.0 * Math.PI) + 300.0 * Math.sin(x / 30.0 * Math.PI)) * 2.0 / 3.0;
  return ret;
})

let delta = ((lat, lng) => {
  let a = 6378245.0;
  let ee = 0.00669342162296594323;
  let dLat = transformLat(lng - 105.0, lat - 35.0);
  let dLng = transformLon(lng - 105.0, lat - 35.0);
  let radLat = lat / 180.0 * Math.PI;
  let magic = Math.sin(radLat);
  magic = 1 - ee * magic * magic;
  let sqrtMagic = Math.sqrt(magic);
  dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * Math.PI);
  dLng = (dLng * 180.0) / (a / sqrtMagic * Math.cos(radLat) * Math.PI);
  return {
    "lat": dLat,
    "lng": dLng 
  };
})

let wgs2gcj = ((wgsLat, wgsLng) => {
  if (outOfChina(wgsLat, wgsLng)) {
    return {
      "lat": wgsLat,
      "lng": wgsLng
    };
  }
  let d = delta(wgsLat, wgsLng);
  return {
    "lat": wgsLat + d.lat,
    "lng": wgsLng + d.lng
  };
})

let gcj2wgs = ((gcjLat, gcjLng) => {
  if (outOfChina(gcjLat, gcjLng)) {
    return {
      "lat": gcjLat,
      "lng": gcjLng
    };
  }
  let d = delta(gcjLat, gcjLng);
  return {
    "lat": gcjLat - d.lat,
    "lng": gcjLng - d.lng
  };
})

let gcj2wgs_exact = ((gcjLat, gcjLng) => {
  let initDelta = 0.01;
  let threshold = 0.000001;
  let dLat = initDelta,
      dLng = initDelta;
  let mLat = gcjLat - dLat,
      mLng = gcjLng - dLng;
  let pLat = gcjLat + dLat,
      pLng = gcjLng + dLng;
  let wgsLat, wgsLng;
  for (let i = 0; i < 30; i++) {
    wgsLat = (mLat + pLat) / 2;
    wgsLng = (mLng + pLng) / 2;
    let tmp = wgs2gcj(wgsLat, wgsLng)
    dLat = tmp.lat - gcjLat;
    dLng = tmp.lng - gcjLng;
    if ((Math.abs(dLat) < threshold) && (Math.abs(dLng) < threshold)) {
      return {
        "lat": wgsLat,
        "lng": wgsLng
      };
    }
    if (dLat > 0) {
      pLat = wgsLat;
    } else {
      mLat = wgsLat;
    }
    if (dLng > 0) {
      pLng = wgsLng;
    } else {
      mLng = wgsLng;
    }
  }
  return {
    "lat": wgsLat,
    "lng": wgsLng
  };
})

let gcj2bd = ((gcjLat, gcjLng) => {
  if (outOfChina(gcjLat, gcjLng)) {
    return {
      "lat": gcjLat,
      "lng": gcjLng
    };
  }

  let x = gcjLng,
      y = gcjLat;
  let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * Math.PI);
  let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * Math.PI);
  let bdLng = z * Math.cos(theta) + 0.0065;
  let bdLat = z * Math.sin(theta) + 0.006;
  return {
      "lat": bdLat,
      "lng": bdLng
  };
})

let bd2gcj = ((bdLat, bdLng) => {
  if (outOfChina(bdLat, bdLng)) {
    return {
      "lat": bdLat,
      "lng": bdLng
    };
  }

  let x = bdLng - 0.0065,
      y = bdLat - 0.006;
  let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * Math.PI);
  let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * Math.PI);
  let gcjLng = z * Math.cos(theta);
  let gcjLat = z * Math.sin(theta);
  return {
    "lat": gcjLat,
    "lng": gcjLng
  };
})

let wgs2bd = ((wgsLat, wgsLng) => {
  let gcj = wgs2gcj(wgsLat, wgsLng)
  return gcj2bd(gcj.lat, gcj.lng)
})

let bd2wgs = ((bdLat, bdLng) => {
  let gcj = bd2gcj(bdLat, bdLng)
  return gcj2wgs(gcj.lat, gcj.lng)
})
export default {
  wgs2gcj,
  gcj2wgs,
  gcj2wgs_exact,
  gcj2bd,
  bd2gcj,
  wgs2bd,
  bd2wgs
}
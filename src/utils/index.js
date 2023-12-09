/*
 * @Date: 2023-09-14 23:11:39
 * @LastEditors: admin@54xavier.cn
 * @LastEditTime: 2023-09-15 01:14:13
 * @FilePath: /vue-plugin-hiprint/src/utils/index.js
 */
/**
 * @description: 解析版本号信息
 * @param {String} ver 版本号
 * @return {Object} 解析后的版本号信息
 */
export function decodeVer(ver) {
  var matchObj =
    ver.match(
      /(?<range>\^|~)?(?<version>(?<mainver>\d+(\.\d+){0,2})(?<appendver>-\w+)?)?/
    )?.groups || {};
  matchObj = { ...matchObj, ver };
  matchObj.mainVal =
    matchObj.mainver
      ?.split(".")
      ?.map((v, i) => v * Math.pow(10, 6 - i * 3))
      ?.reduce((acc, curr) => acc + curr, 0) || 0;
  matchObj.appendVal = (matchObj.appendver?.match(/[0-9]+/) || 0) * 1;
  matchObj.verVal = `${matchObj.mainVal}.${matchObj.appendVal}` * 1;
  return matchObj;
}

/**
 * 获取DPI
 * @returns {*}
 */
export function js_getDPI() {
  const arrDPI = [];
  if ( window.screen.deviceXDPI != undefined ) {
    arrDPI[0] = window.screen.deviceXDPI;
    arrDPI[1] = window.screen.deviceYDPI;
  } else {
    const tmpNode = document.createElement( "DIV" );
    tmpNode.style.cssText = "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";
    document.body.appendChild( tmpNode );
    arrDPI[0] = parseInt( tmpNode.offsetWidth );
    arrDPI[1] = parseInt( tmpNode.offsetHeight );
    tmpNode.parentNode.removeChild( tmpNode );
  }
  return arrDPI;
}

/**
 * dpi(offsetHeight)
 * @returns {*}
 */
function getDpi() {
  const arr = js_getDPI()
  return arr[1]
}
/**
 * px转pt
 * @param t
 * @returns {number}
 */
export function pxToPt(t) {
  return t * (72 / getDpi());
}

/**
 * px转mm
 * @param t
 * @returns {number}
 */
export function pxToMm(t) {
  return Math.round((t / getDpi() * 25.4) * 100) / 100;
}

/**
 * pt转px
 * @param t
 * @returns {number}
 */
export function ptToPx(t) {
  return t * (getDpi() / 72);
}

/**
 * pt转mm
 * @param t
 * @returns {number}
 */
export function ptToMm(t) {
  return pxToMm(ptToPx(t));
}
/**
 * mm转pt
 * @param t
 * @returns {number}
 */
export function mmToPt(t) {
  return 72 / 25.4 * t;
}

/**
 * mm转px
 * @param t
 * @returns {number}
 */
export function mmToPx(t) {
  return ptToPx(mmToPt(t));
}


// 遍历一个对象
function forEachValue(obj, fn) {
  Object.keys(obj).forEach((val, key) => {
    fn(obj[val], val )
  });
}

export {
  forEachValue
}
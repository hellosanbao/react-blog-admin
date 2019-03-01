/* 格式化倒计时 */
export function formatCountTime(time) {
  if (typeof (time) !== 'number') {
    console.warn('倒计时格式化请输入时间戳');
    return time;
  };
  let s = time / 1000;
  let howHours = s / 3600;
  let formatTime = '';
  if (howHours < 24) {
    let hours = ~~(howHours);
    formatTime = hours + '小时前'
  } else {
    let days = ~~(howHours / 24);
    formatTime = days + '天前'
}
  return formatTime;
}
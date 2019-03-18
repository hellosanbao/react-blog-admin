import $ from 'jquery'

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

//滚动到底部
export function scrollBottom(dir, cb, dom) {
  if (!dom) {
    let aflg = false
    $(window).scroll(function () {
      var scrollTop = $(this).scrollTop()
      var scrollHeight = $(document).height()
      var windowHeight = $(this).height()
      if (scrollTop + windowHeight >= scrollHeight - dir) {
        if (aflg == false) {
          aflg = true
          cb && cb()
        }
      } else {
        aflg = false
      }
    });
  } else {
    let bflg = false
    $(dom).scroll(function () {
      let top = $(this).find('.__MORE').position().top
      let win = $(window).height()
      if ((top - dir) <= win) {
        if (bflg == false) {
          bflg = true
          cb && cb()
        }
      }else{
        bflg = false
      }
    })
  }
}

//方法节流阀
export function debounce(func, delay = 100) {
  var timer = null;
  return function () {
    var _self = this;
    var _arg = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      func.apply(_self, _arg);
    }, delay);
  };
}

//localStorage操作
export function local() {
  let arg = arguments
  if (arg.length == 1) {
    let val = localStorage[arg[0]]
    val = val?JSON.parse(val):val
    return val
  } else {
    let sVal = arg[1]
    sVal = JSON.stringify(sVal)
    localStorage[arg[0]] = sVal
  }
}



//解决滚动穿透

export const ModalHelper = (function(bodyCls) {
  var scrollTop;
  return {
    afterOpen: function() {
      scrollTop = document.scrollingElement.scrollTop;
      document.body.classList.add(bodyCls);
      document.body.style.top = -scrollTop + 'px';
    },
    beforeClose: function() {
      document.body.classList.remove(bodyCls);
      // scrollTop lost after set position:fixed, restore it back.
      document.scrollingElement.scrollTop = scrollTop;
    }
  };
})('modal-open')
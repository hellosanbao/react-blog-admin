import config from '@src/config'

//将数字转化成数组
Number.prototype.toArray = function () {
    let a = []
    for (let i = 0; i < this; i++) {
        a.push(i)
    }
    return a
}

//数字超过一万，以万为单位展示
Number.prototype.format = function () {
    let res = this
    if (this > 10000) {
        res = (this / 10000).toFixed(1)+'万'
    }
    return res
}


//将图片链接处理成可显示的结果
String.prototype.formatImg = function () {
    let url = this.indexOf('statics.zhuishushenqi.com') >= 0 ? this : config.imgBaseUrl + this
    return decodeURIComponent(url)
}
//去掉字符串中的#
String.prototype.trimHash = function () {
    return this.replace(/#/ig,'')
}

Date.prototype.diff = function () {
    let time = Date.now() - new Date(this).getTime()
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
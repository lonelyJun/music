export const openWindow = (url, query) => {
    let h_query = '?'
    let urls = ''
    if(query) {
        Object.keys(query).forEach(g => {
            h_query += (g + '=' + query[g] + '&')
        })
        urls = url + h_query.slice(0, -1)
    } else {
        urls = url
    }
    return window.open(urls)
}
    
Date.prototype.format = function(fmt) {
    var o = {
        'M+': this.getMonth() + 1, //月份 
        'd+': this.getDate(), //日 
        'h+': this.getHours(), //小时 
        'm+': this.getMinutes(), //分 
        's+': this.getSeconds(), //秒 
        'S': this.getMilliseconds() //毫秒 
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
        }
    }
    return fmt
}
export default {
    // 字节转大小
    bytesToSize(bytes) {
        if (bytes === 0) return '0 B';
        let k = 1000, // or 1024
            sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
    },
    // 格式化毫秒
    formatSecond(mss) {
        let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = (mss % (1000 * 60)) / 1000;
        return (hours + "").padStart(2, '0') + ":" + (minutes + "").padStart(2, '0') + ":" + (parseInt(seconds) + "").padStart(2, '0');
    }
}
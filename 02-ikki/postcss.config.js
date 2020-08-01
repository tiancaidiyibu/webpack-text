module.exports = {
    plugins: [
        // postcss 使用autoprefixer 添加前缀的标准
        require('autoprefixer')(
            // 'IE 10'
            {
                // last 2 versions 兼容最近的两个版本 例如ios14和13  谷歌最新版和前一个版
                // >1% 全球浏览器的市场份额大于1%的浏览器
                overrideBrowserslist:['last 2 versions', '>1%'] 
            }
        )
    ]
}
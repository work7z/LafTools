
const { translate } = require('bing-translate-api');

translate('你好，这是一个测试的内容啦，欢迎使用bing', null, 'en_US').then(res => {
    console.log(res.translation);
}).catch(err => {
    console.error(err);
});
const https = require("https");
import config from '../config'

class WxHttp {

    static constructor() { }
    
    static async get(path) {
        return new Promise((resolve, reject) => {
            https.get('https://' + WxHttp.oapiHost + path, response => {
                if (response.statusCode === 200) {
                    var body = '';
                    response.on('data', data => {
                        body += data;
                    }).on('end', () => {
                        var result = JSON.parse(body);
                        if (result) {
                            resolve(result);
                        }
                        else {
                            reject(result);
                        }
                    });
                }
                else {
                    reject(response.statusCode);
                }
            });
        });
    }

    static post(path, data) {
        return new Promise((res, rej) => {
            var opt = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                host: DingHttp.oapiHost,
                path: path,
            };
            var req = https.request(opt, function (response) {
                console.log('res---------', response.statusCode)
                if (response.statusCode === 200) {
                    var body = '';
                    response.on('data', data => {
                        body += data;
                    }).on('end', () => {
                        console.log('body---------', body)
                        var result = JSON.parse(body);
                        if (result && 0 === result.errcode) {
                            res(result);
                        }
                        else {
                            rej(result);
                        }
                    });
                }
                else {
                    rej(response.statusCode);
                }
            });
            req.write(data + '\n');
            req.end();
        });
    }

    static auth(code) {
        let {AppID, AppSecret} = config;
        let path = `/sns/jscode2session?appid=${AppID}&secret=${AppSecret}&js_code=${code}&grant_type=authorization_code`
        return WxHttp.get(path);
    }
    
}

WxHttp.oapiHost = 'api.weixin.qq.com';


module.exports = WxHttp;
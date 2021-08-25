export default () => {
    return async (ctx, next) => {
        try{
            await next();
        }catch (err) {
            // 存进错误日志
            // LogService.errLogger(ctx,err);

            console.log("错误捕捉中间获取的错误",err)
            const statusCode = err.statusCode || err.status || 500
            const errMsg = err.message || "服务器错误"
            ctx.status = statusCode
            if ( statusCode == 401 ) {
                ctx.status = 401
                if (err.message == 'Authentication Error') {
                    err.message = "token验证失败"
                }
                ctx.body = {
                    success: false,
                    msg: err.message
                }
            } else if (statusCode === 500) {
                // 这里把错误放进去日志或者邮箱提醒
                ctx.status = 500
                ctx.body = {
                    success: false,
                    msg: errMsg
                }
            } else {
                ctx.body ={
                    success: false,
                    msg: errMsg
                }
            }
        }
    }
}
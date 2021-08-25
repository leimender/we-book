const UserService = require('../../services/userService')
const Wx = require('../../services/wxHttp')


async function queryUserInfo(ctx) {
    try {
        let user = ctx.params.user;
        let appointmentRes = await UserService.queryUserInfo(user);
        ctx.body = {
            success: true,
            data: appointmentRes
        }
    } catch (error) {
        ctx.throw(500, {
            message: error
        })
    }
}

async function registAdmin(ctx) {
    try {
        let user = ctx.params.user;
        let appointmentRes = await UserService.registAdmin(user);
        ctx.body = {
            success: true,
            data: appointmentRes
        }
    } catch (error) {
        ctx.throw(500, {
            message: error
        })
    }
}

async function login(ctx) {
    let {
        code,
        name
    } = ctx.request.body;
    try {
        let {
            openid,
            session_key
        } = await Wx.auth(code);
        let userRes = await UserService.queryUserByOpenid(openid);
        if (!userRes) {
            let newUser = await UserService.createUserByOpenid(openid, name);
            ctx.body = {
                success: true,
                data: {
                    userid: newUser._id.toString(),
                    name,
                    isAdmin: newUser.isAdmin
                }
            }
        } else {
            ctx.body = {
                success: true,
                data: {
                    userid: userRes._id.toString(),
                    name,
                    isAdmin: userRes.isAdmin
                }
            }
        }

    } catch (error) {
        ctx.throw(500, {
            message: error
        })
    }

}

module.exports = {
    login,
    registAdmin,
    queryUserInfo
}
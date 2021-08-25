const User = require('../model/user');

class UserService {
    queryUserInfo(user) {
        return User.findOne({
            userphone: user
        });
    }

    queryUserByOpenid(openid) {
        return User.findOne({
            openid
        });
    }

    createUserByOpenid(openid, name) {
        return User.create({
            username: name,
            openid
        })
    }

    registerAdmin(username, userphone, usercompany) {
        let admin = {
            username,
            userphone,
            usercompany
        }
        return User.create(admin);
    }
}

module.exports = new UserService();
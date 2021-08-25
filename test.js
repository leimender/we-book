require('babel-polyfill')
require('babel-register')
const User = require('./model/user');
const Appointment = require('./model/appointment');

async function create() {
    let user = {
        username: 'za',
        status: '预约',
        userphone: '18315623215',
        address: '调结构',
        user:"6111e792ebf5880aa402a959"
    }
    await Appointment.create(user)
}

create()
//       "073oYS2w3TPTUW2SnU3w3oT3Ep4oYS2d"

async function update() {
    let query = await User.findOne({
        userphone: '15368'
    })
    query.testz[1] = 3
    query.testy[0].a = 'www'
    query.testy.a = 'www'
    await query.save()
}

// update()

// const Wx = require('./services/wx')

async function test() {
    try {
        let data = await Wx.get('/sns/jscode2session?appid=wx4249241854fcca30&secret=9463356e0191ecd58b34a82d1e544815&js_code=053sLw000GT0dM1LXg400CxLSE0sLw06&grant_type=authorization_code')

        console.log(data)
    } catch (error) {
        console.log(error)
    }

}

// test()

// "3e7a7bb484adadd03085c2d8375394900e185002"

// "ZuYHbywZflwWqaHOQlnvrw=="

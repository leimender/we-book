const {
    Schema
} = require('mongoose');
const ObjectId = Schema.Types.ObjectId;
const { bookDatabase } = require('./db');

const AppointmentSchema = new Schema ({
    username: {
        type: String
    },
    userphone: {
        type: String
    },
    startTime: {
        type: Date
    },
    endTime: {
        type: Date
    },
    status: {
        type: String,
        enum: ["预约", "已过期", "已拒绝", "已通过"]
    },
    checkComment:{
        type: String
    },
    linkman: {
        type: String
    },
    matters: {
        type: String
    },
    identityCard: {
        type: String
    },
    userCompany: {
        type: String
    },
    address: {
        type: String
    },
    user: {
        type: ObjectId,
        ref: 'User'
    }
})

const Appointment = bookDatabase.model('Appointment', AppointmentSchema);
module.exports = Appointment;
const AppointmentService = require('../../services/appointmentService')
const moment = require('moment')

async function getAppointment(ctx) {
    try {
        let user = ctx.query.userid, pageSize = ctx.query.pageSize, anchorId = ctx.query.anchorId, isAdmin = ctx.query.isAdmin;
        let appointmentRes = await AppointmentService.queryAppointment(user, pageSize, anchorId, isAdmin);
        appointmentRes.map((appoint) => {
            appoint._doc.time = appoint._doc.startTime && appoint._doc.endTime ?
            moment(appoint._doc.startTime).format('YYYY-MM-DD HH:mm')+' ~ '+ moment(appoint._doc.endTime).format('YYYY-MM-DD HH:mm')
            : ''
        })
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

async function searchAppointment(ctx) {
    try {
        let {
            user,
            searchWord
        } = ctx.query;
        let appointmentRes = await AppointmentService.queryAppointmentBySearch(user, searchWord);
        appointmentRes.map((appoint) => {
            appoint._doc.time = appoint._doc.startTime && appoint._doc.endTime ?
            moment(appoint._doc.startTime).format('YYYY-MM-DD HH:mm')+' ~ '+ moment(appoint._doc.endTime).format('YYYY-MM-DD HH:mm')
            : ''
        })
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

async function createAppointment(ctx) {
    try {
        let {
            userid,
            username,
            userphone,
            startTime,
            endTime,
            linkman,
            matters,
            identityCard,
            userCompany,
            address
        } = ctx.request.body;
        startTime = new Date(startTime);
        endTime = new Date(endTime)
        let appointmentRes = await AppointmentService.createAppointment(userid, username, userphone, startTime, endTime, linkman, matters, identityCard, userCompany, address);
        ctx.body = {
            success: true,
            data: '预约成功'
        }
    } catch (error) {
        ctx.throw(500, {
            message: error
        })
    }
}

async function passAppointment(ctx) {
    try {
        let {
            appointmentId,
            status
        } = ctx.body;
        let appointmentRes = await AppointmentService.updateAppointment(appointmentId, status);
        ctx.body = {
            success: true,
            data: '预约成功'
        }
    } catch (error) {
        ctx.throw(500, {
            message: error
        })
    }
}

async function rejectAppointment(ctx) {
    try {
        let {
            appointmentId,
            comment
        } = ctx.request.body;
        let appointmentRes = await AppointmentService.updateAppointment(appointmentId, '已拒绝', comment);
        ctx.body = {
            success: true,
            data: '预约成功'
        }
    } catch (error) {
        ctx.throw(500, {
            message: error
        })
    }
}

module.exports = {
    getAppointment,
    searchAppointment,
    createAppointment,
    passAppointment,
    rejectAppointment
}
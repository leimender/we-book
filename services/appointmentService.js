const Appointment = require('../model/appointment');

class AppointmentService {

    async createAdmin() {

    }

    async queryAppointment(userid, pageSize, anchorId, isAdmin) {
        let queryOption = anchorId ? isAdmin ? {
            _id: {
                $lt: anchorId
            }
        } : {
            user: userid,
            _id: {
                $lt: anchorId
            }
        } : {
            user: userid
        }
        let appointments = await Appointment.find(queryOption).limit(pageSize*1).sort('-_id')
        return appointments
    }

    async queryAppointmentBySearch(user, searchWord) {
        try {
            let regexp = new RegExp(searchWord, 'i')
            let appointments = await Appointment.find({
                user,
                $or: [{
                        username: {
                            $regex: regexp
                        }
                    },
                    {
                        linkman: {
                            $regex: regexp
                        }
                    },
                    {
                        userCompany: {
                            $regex: regexp
                        }
                    },
                ]
            })

            return appointments;
        } catch (error) {
            throw (error)
        }
    }

    createAppointment(userid, username, userphone, startTime, endTime, linkman, matters, identityCard, userCompany) {
        let appointment = {
            user: userid,
            username,
            userphone,
            startTime,
            endTime,
            linkman,
            matters,
            identityCard,
            status: '预约',
            userCompany
        }

        return Appointment.create(appointment);

    }

    updateAppointment(appointmentId, status, comment) {
        return Appointment.findByIdAndUpdate(appointmentId, {
            status,
            checkComment: comment
        })
    }

}

module.exports = new AppointmentService()
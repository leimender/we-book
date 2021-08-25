const AppointmentController = require('../controller/appointment')

module.exports = router => {
  router.get('/getAppointment', AppointmentController.getAppointment)
  router.get('/searchAppointment', AppointmentController.searchAppointment)
  router.post('/createAppointment', AppointmentController.createAppointment)
  router.put('/passAppointment', AppointmentController.passAppointment)
  router.put('/rejectAppointment', AppointmentController.rejectAppointment)
}

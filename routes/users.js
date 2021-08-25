const UserController = require('../controller/user')


module.exports = router => {
  router.get('queryUserInfo', UserController.queryUserInfo)
  router.post('/registAdmin', UserController.registAdmin)
  router.post('/login', UserController.login);
}

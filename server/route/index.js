let controller = require('../controller/controller')
let express = require('express')
let authenfication = require('../middleware/authentification')
let router = express.Router()

router.post('/register',controller.register)
router.post('/login',controller.login)
router.use(authenfication)
router.get('/',controller.getComic)
router.get('/:id',controller.findOne)
router.post('/:id',controller.updateComic)

module.exports=router
const express = require('express')
const router = express.Router()

const { checkDuplicateEmail, register } = require('../controllers/registerController')
const login = require('../controllers/loginController')
const showUser = require('../controllers/userController')
const showBus = require('../controllers/busControler')
const { verifyToken, booking, busExist } = require('../controllers/bookingController')


//method register & login
router.post('/register', 
  checkDuplicateEmail,
  register
)

router.post('/login',
  login
)

//method user
router.get('/user', 
  showUser
)

//method bus
router.get('/bus', 
  showBus
)

//method booking
router.post('/booking', verifyToken, busExist, booking)


module.exports = router
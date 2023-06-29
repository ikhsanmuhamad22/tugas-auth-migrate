const User = require('../models').User
const showUser = (req, res) => {
  User.findAll()
  .then((data) => {
    res.send({
      status: 'success',
      data: data
    })
  }).catch((err) => {
    res.status(500).send({
      status: 'fail',
      message: err.message
    })
  });
}

module.exports = showUser
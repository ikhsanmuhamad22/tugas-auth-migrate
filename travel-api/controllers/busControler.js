const Bus = require('../models').Bus

const showBus = (req, res) => {
  Bus.findAll().then(data => {
    res.send({
      status: 'success',
      data: data
    })
  }).catch(err => {
    res.status(500).send({
      status: 'fail',
      message: err.message
    })
  })
}

module.exports = showBus
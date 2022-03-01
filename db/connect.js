const mongoose = require('mongoose');

exports.DBConnection = (url, options) => {
  return mongoose.connect(url, options);
}

// module.exports = DBConnection


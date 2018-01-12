const mongoose = require('./db.js'),
      Schema = mongoose.Schema;

var userSchema = new Schema({
  username: { type: String }, //用户名
  email: { type: String } //邮箱
});

module.exports = mongoose.model('user', userSchema);

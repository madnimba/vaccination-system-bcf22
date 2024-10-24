const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  n_id: { type: String, required: true, unique: true },
});

const User = mongoose.model('User', userSchema);
module.exports = User;

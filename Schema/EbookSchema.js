const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const today = new Date();
const maxDate = new Date(today.getFullYear() - 4, today.getMonth(), today.getDate());

const Ebook = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    nickname: { type: String, default: '' },
    phoneNumber: { type: Number, required: true, unique: true },
    date: { type: Date, default: Date.now },
    address: {  type: String, default: '' },
    company: { type: String, default: '' },
    post: { type: String,  default: '' },
    email: { 
        type: String, 
        unique: [true, "email already exists in database"], 
        validate: {validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: '{VALUE} is not a valid email!'
     }
    },
    dataOfBirth: { type: Schema.Types.Date, min: new Date(1920, 0, 1), max: maxDate,  default: '' },
    note: { type: String,  default: '' },
    userId: { type: Schema.Types.ObjectId, required: true }
})

module.exports = mongoose.model('Ebook', Ebook);
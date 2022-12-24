const mongoose = require("mongoose");

const formSchema = mongoose.Schema({
  name: {
    type: String,
    default:'',
  },
  surname: {
    type: String,
    default:'',
  },
  email: {
    type: String,
    default:'',
  },
  message: {
    type: String,
    default:''
  },
  date:{
    type:String,
    default:new Date().toString()
  }
});

module.exports = mongoose.model("Form", formSchema);
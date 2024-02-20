const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    parent: {
      type: String,
      required: true,
    },
    matakuliah: {
      type: Array,
      required: true,
    }
  });
  
  // Create the Student model
  const Student = mongoose.model('Student', studentSchema);
  
  // Export the model for use in other files
  module.exports = { Student };
const mongoose = require('mongoose');

const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const peopleSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    dob:{
        type:String,
        required: true,
    },
    dod:{
        type:String,
        required: true

    },
    emailId:{
        type:String,
        required: true,
        validate: {
            validator: function(){
                return emailRegex.test(this.emailId)     
            },
            message:'email address is not valid.'
        }
    },
    gender:{
        type:String,
        required: true
    },
    language:{
        type:String,
        required: true,
    }
})

module.exports = mongoose.model('people', peopleSchema);

const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
name:{
    type:String,
    required:[true,"please enter your product name"],
    trim :true
},

discription:{
    type:String,
    required:[true,"please enter your discription"]
},

price:{
    type:Number,
    required:[true,"please enter your product price"],
    maxLength:[8,"price cannot  exceeed 8 character"]
},
rating:{
    type:Number,
    default:0
},
images:[
    {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }
],

category:{
    type:String,
    required:[true,"please enter product category"]
},

stock:{
    type:Number,
    required:[true,"please enter your stock"],
    maxLength:[4,"stock cannot be exceed 4 character"],
    default:1

},
numOfReviews:{
    type:Number,
    default:0
},

reviews:[
    {

        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
          },
        name:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        comments:{
            type:String,
            required:true
        }
    }
],

user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
createAt:{
    type:Date,
    default:Date.now

}



})


module.exports = mongoose.model("productSchema",productSchema)
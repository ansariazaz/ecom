const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter product Name"],
        trim:true
    },
    description :{
        type:String,
        required:[true,"Please enter product description"],
    },
    price :{
        type:Number,
        required:[true,"Please enter product price"],
        maxlength:[8,"price cannot exceeds from 8 characters"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
      {
        public_id:{
            type:String,
            required:true
        },
        url :{
            type:String,
            required:true
        },
      }
    ],
    category:{
         type:String,
         required:[true,"please enter product category"]
    },
     stock:{
         type:Number,
         required:[true,"please enter product stock"],
         maxlength:[4,"stock cannot exceeds from 4 characters"],
         default:1
     },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
      {
          name:{
              type:String,
               required:true,
          },
          rating:{
              type:Number,
               required:true
          },
          comment: {
              type:String, 
              required:true
          },
          user:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:true
         }
      }
    ],
    user:{
       type:mongoose.Schema.ObjectId,
       ref:"User",
       required:true
    },
    created_at:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Product",productSchema)
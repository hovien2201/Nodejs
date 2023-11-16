const mongoose = require('mongoose')
const schema = mongoose.Schema
const TypeProduct =require("../models/TypeProduct")
const Product = new schema({
    name: {
        type: String,
        required: [true,"Tên Không được bỏ trống"],
        validate: {
            validator: function(value) {
              // Custom validate logic
              // Trả về true nếu giá trị hợp lệ, ngược lại trả về false
              // Ví dụ: Giá trị name phải bắt đầu bằng chữ cái viết hoa
              return /^[A-Z]/.test(value);
            },
            message: 'Tên phải bắt đầu bằng chữ cái viết hoa'
          }
      },
      price: {
        type: Number,
        required: [true,"Giá Không được bỏ trống"]
      },
      type: {
        type: schema.Types.ObjectId,
        ref: 'TypeProduct'
      },
      image:{
        type: String,
        required: [true,"Ảnh Không được bỏ trống"]
      }
})
module.exports = mongoose.model('Product',Product)
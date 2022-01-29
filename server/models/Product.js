const { Schema, model } = require('mongoose')


const schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    group: {
      type: String,
      required: true
    },
    price: Number,
    image: {
      type: String,
      required: true
    },
    count: Number
  },
  {
    timestamps: true
  }
)

module.exports = model('Product', schema)

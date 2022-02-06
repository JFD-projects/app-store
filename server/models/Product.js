const { Schema, model } = require('mongoose')


const schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    group: { type: Schema.Types.ObjectId, ref: 'Group' },
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

const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean
    },
    isSuperAdmin: {
      type: Boolean
    },
    basket: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        count: Number
      }
    ]
  },
  {
    timestamps: true
  }
)

module.exports = model('User', schema)

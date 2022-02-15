const Product = require('../models/Product')
// const Group = require('../models/Group')
// const User = require('../models/User')

const productsMock = require('../mock/products.json')
// const groupsMock = require('../mock/groups.json')
// const usersMock = require('../mock/users.json')

module.exports = async () => {
  const products = await Product.find()
  if (products.length !== productsMock.length) {
    await createInitialEntity(Product, productsMock)
  }

  // const groups = await Group.find()
  // if (groups.length !== groupsMock.length) {
  //   await createInitialEntity(Group, groupsMock)
  // }
  
  // const users = await User.find()
  // if (users.length !== usersMock.length) {
  //   await createInitialEntity(User, usersMock)
  // }
}

async function createInitialEntity(Model, data) {
  await Model.collection.drop()

  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id
        const newItem = new Model(item)
        await newItem.save()
        return newItem
      } catch (e) {
        return e
      }
    })
  )
}

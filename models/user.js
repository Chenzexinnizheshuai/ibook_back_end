
const mongoose  = require('../utils/mongoose')

const UsersModel = mongoose.model('admin')

const getUserInfoById = (id) => {
    return UsersModel
    .findById(id)
    .then(results => {
        // console.log(results)
        return results
    })
    .catch(err => {
        return false
    })
}


module.exports = {
    getUserInfoById
}
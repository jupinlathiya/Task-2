const jwt = require('jsonwebtoken')
const User = require('../models/adminModel')

async function authenticateVendor (req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res
      .status(401)
      .json({ status: false, message: 'Unauthorized User.' }) // Unauthorized
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET)
    const user = await User.findOne({ where: { id: decoded.id } })

    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: 'User not found.' }) // User not found
    }

    req.user = user
    next()
  } catch (error) {
    return res.status(500).json({ status: false, message: error })
  }
}

module.exports = authenticateVendor

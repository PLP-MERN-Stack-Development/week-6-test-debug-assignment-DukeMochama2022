function generateToken(user) {
  // For testing, return the user ID as the token
  return user._id.toString();
}

module.exports = { generateToken };

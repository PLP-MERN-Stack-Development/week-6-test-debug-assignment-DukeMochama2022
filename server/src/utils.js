// Utility function to capitalize the first letter of a string
function capitalizeFirstLetter(str) {
  if (typeof str !== "string" || str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = { capitalizeFirstLetter };

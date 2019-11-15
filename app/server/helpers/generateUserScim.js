/**
 * 
 * @param {*} body :
 *    - email
 *    - password
 *    - phoneNumber
 *    - First Name
 *    - Last Name
 */
module.exports = function generateUserScim(email, password, firstName, lastName, phoneNumber) {
  let userScim = {};
  if (password) {
    userScim.password = password;
  }
  userScim.emails = [];
  userScim.emails[0] = {
    value: email,
    primary: true
  };
  if (phoneNumber) {
    userScim.phoneNumbers = [];
    userScim.phoneNumbers[0] = {
      value: phoneNumber
    };
  }
  if (firstName || lastName) {
    userScim.name = {};
    if (firstName) {
      userScim.name.givenName = firstName;
    }
    if (lastName) {
      userScim.name.familyName = lastName;
    }
  }
  userScim.locale = 'en';
  return userScim;
}
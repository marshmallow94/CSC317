const checkUserName = (username) => {
    let isUserNameBeginsWithChar = /^[a-zA-Z][0-9a-zA-Z]+$/.test(username);
    return username.length >= 3 && isUserNameBeginsWithChar;
}

module.exports = checkUserName;
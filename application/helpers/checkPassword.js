const checkPassword = (password) => {
    const passwordRegex = /(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
    return passwordRegex.test(password);
}

module.exports = checkPassword;
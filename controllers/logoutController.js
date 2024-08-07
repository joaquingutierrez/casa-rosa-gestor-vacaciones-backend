const logout = (req, res) => {
    res
    .clearCookie("access_token")
    .json({message: "Logout successful"})
}

module.exports = {
    logout
}
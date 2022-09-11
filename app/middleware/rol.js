const { handleHttpError } = require("../utils/handleError");

const checkRol = (roles) => (req, res, next) => {
    try {
        const {user} = req // Este ya fue inyectado desde el middleware de auth
        const rolesByUser = user.role
        const checkValueRol = roles.some((allowedRoles) => rolesByUser.includes(allowedRoles))
        
        if(!checkValueRol) {
            handleHttpError(res, "USER_WITHOUT_PERMISSIONS")
            return
        }

        next();
    } catch (error) {
        handleHttpError(res, "ERROR_PERMISSIONS", 403)
    }
}

module.exports = checkRol;
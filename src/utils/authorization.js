const { getAuthToken } = require("./authentication");
const config = require("../../knexfile");
const database = require("knex")(config);

const authorizeUserForEndpoint = permissionsRequired => (req, res, next) => {
  const userPermissions = req.user.permissions;
  const userHasAllPermissions = permissionsRequired.reduce(
    (acc, currReqPermission) => {
      if (userPermissions.includes(currReqPermission)) {
        return acc;
      } else {
        return false;
      }
    },
    true
  );
  if (userHasAllPermissions) {
    next();
  } else {
    throw new Error("not authorized");
  }
};

module.exports = { authorizeUserForEndpoint };

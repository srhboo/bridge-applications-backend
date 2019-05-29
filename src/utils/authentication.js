const config = require("../../knexfile");
const database = require("knex")(config);
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const decodeBase64 = base64 => Buffer.from(base64, "base64").toString("ascii");
const getAuthToken = req => {
  const [, encodedToken] = req.headers.authorization.split(" ");
  return decodeBase64(encodedToken);
};

const authenticateUser = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://srhboo.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  // audience: "urn:my-resource-server",
  issuer: "https://srhboo.auth0.com/",
  algorithms: ["RS256"]
});

// async (req, res, next) => {
//   // const token = getAuthToken(req);
//   const [, token] = req.headers.authorization.split(" ");
//   if (!token || token.length < 3) {
//     res.status(403).json({ error: "Unauthenticated" });
//   }
//   // const users = await database("users")
//   //   .select()
//   //   .where("email", token);

//   // if (users.length) {
//   //   next();
//   // } else {
//   //   res.status(401).json({ error: "Unauthorized" });
//   // }
//   next();
// };

module.exports = { authenticateUser, decodeBase64, getAuthToken };

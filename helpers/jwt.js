const expressJwt = require("express-jwt");

function authJwt() {
  const secret = process.env.secret;
  const api = process.env.API_URL;
  return expressJwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      { url: /\/public\/uploads(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/eshop\/api\/products(.*)/, methods: ["GET", "PUT", "OPTIONS"] },
      { url: /\/eshop\/api\/categories(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/eshop\/api\/orders(.*)/, methods: ["GET", "OPTIONS", "POST"] },
      { url: /\/eshop\/api\/products\/email(.*)/, methods: ["OPTIONS", "POST"] },
      `${api}/users/login`,
      `${api}/users/register`,
      // {url: /(.*)/}
    ],
  });
}

async function isRevoked(req, payload, done) {
  if (!payload.isAdmin) {
    done(null, true);
  }

  done();
}

module.exports = authJwt;

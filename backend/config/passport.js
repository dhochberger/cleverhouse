const { Strategy, ExtractJwt } = require('passport-jwt');
const Util = require('../utils/Utils');
const util = new Util();

const passport = require('passport');
const database = require('../database/database')
const secureRandom = require('secure-random');

const variables = {
    api_url: `postgres://${process.env.USERNAME_DB}:${process.env.PWD_DB}@${process.env.OST_DB}:${process.env.PORT_DB}/${process.env.NAME_DB}`,
    secretOrKey: secureRandom(256, { type: 'Buffer' }),
};

if (process.env.NODE_ENV.toLowerCase() == 'development') {
    variables.secretOrKey = process.env.JWT_SECRET;
}

function authorized(req, res, next) {
  passport.authenticate('jwt', { session: false }, async (error, user) => {
      let token = req.header('Authorization');

      if (token === undefined) {
          util.setError(401, 'No token');
          return util.send(res);
      }

      if (error || !user) {
          util.setError(401, 'Token not valid');
          return util.send(res);
      }

      req.user = user;

      next();
  })(req, res, next);
}

passport.use(
    new Strategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: variables.secretOrKey,
        },
        function (jwtPayload, done) {
            return database.User.findOne({ _id: jwtPayload.id }, { password: 0 })
                .then((user) => {
                    return done(null, user);
                })
                .catch((err) => {
                    return done(err);
                });
        }
    )
);

module.exports = {variables, authorized}, passport;
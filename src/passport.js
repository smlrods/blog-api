import passport from "passport";
import passportJwt from "passport-jwt";
import passportLocal from "passport-local";
import bcrypt from "bcryptjs";
import models from "./models";
import 'dotenv/config';

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const User = models.User;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

// Set up the JwtStrategy
passport.use(new JwtStrategy(opts, async (jwtPayload, done) => {
  // This function will be called when a user sends a request with a JWT
  // jwt_payload is the decoded JWT
  // You can use the decoded JWT to find the user in your database
  // If the user is found, call done(null, user)
  // If the user is not found, call done(null, false)
  try {
    // Find the user associated with the JWT
    const user = await User.findById(jwtPayload.id).exec();

    // If the user was not found, return a falsey value
    if (!user) {
      return done(null, false);
    }

    // If the user was found, return the user object
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));

// Set up LocalStrategy
passport.use(
  new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, async (username, password, done) => {
    try {
      // Find the user with the given email address
      const user = await User.findOne({ username });

      // If the user was not found, return a falsey value
      if (!user) {
        return done(null, false);
      }

      // Check if password is correct
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // password match! log user in
          return done(null, user);
        } else {
          // password do not match!
          return done(null, false, { message: "Incorrect username or password"});
        }
      });
    } catch (error) {
      return done(error);
    }
  })
);

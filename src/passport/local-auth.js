const passport = require("passport");
const LocalStrategy = require("passport-local");
const userSchema = require("../models/users.model");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userSchema.findById(id);
  done(null, user);
});
//estrategia para registrar usuario
passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const user = await userSchema.findOne({ email: email });
      if (user) {
        return done(null, false);
      } else {
        const newUser = new userSchema(req.body);
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        await newUser.save();
        done(null, newUser);
      }
    }
  )
);
//estrategia para iniciar sesion
passport.use(
  "local-signin",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
     const user = await userSchema.findOne({email: email});
     if(!user){
       return done(null, false);
     }else if(!user.comparePassword(password)){
      return done(null, false);
     }else{
       done(null, user);
     }
    }
  )
);

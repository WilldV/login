const LocalStrategy = require('passport-local').Strategy;

const User = require('../app/models/user');

module.exports = function(passport) {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, function (err, user) {
            done(err, user);
        })
    })

    //metodo para registrar
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        password: 'password',
        passReqToCallBack: true
    },
        function (req, email, password, done) {
            User.findOne({ 'local.email': email }, function (err, user) {
                if (err) { return done(err); }
                if (user) {
                    return done(null, false, req.flash('singupMessage', 'El correo ya ha sido registrado anteriormente.'))
                } else {
                    newUser = new User();
                    newUser.local.email = email;
                    newUser.local.password = password;
                    newUser.local.password = newUser.generateHash(password);
                    newUser.save(function (err) {
                        if (err) { throw err; }
                        return done(null, newUser);
                    })
                }
            })
        }
    ))
    //login
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        password: 'password',
        passReqToCallBack: true
    },
        function (req, email, password, done) {
            User.findOne({ 'local.email': email }, function (err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, req.flash('loginMessage', 'El usuario no existe...'))
                } 
                if(!user.vaidatePassword(password)){
                    return done(null, false, req.flash('loginMessage', 'Contraseña incorrecta'))
                }
                return done(null, user);
            })
        }
    ))
};
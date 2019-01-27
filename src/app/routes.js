module.exports = (app, passport) => {

    app.get('/', (req,res ) =>{
        res.render('index');
    })
    app.get('/login', (req,res) =>{
        res.render('login',{
            message: req.flash('localMessage')
        });
    })
   app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        //comprobar si puedo mandarle el email del usuario para que no tenga que volver a escribirlo
        failureRedirect: '/login',
        failureFlash: true  
   }))

    app.get('/signup',(req,res)=>{
        res.render('signup', {
            message: req.flash('signupMessage')
        });
    })

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }))

    app.get('/profile',isLogged ,(req,res) =>{
        res.render('profile', {
            user:req.user
        })        
    })

    app.get('/logout',(req,res) =>{
       req.logout();
       res.redirect('/');     
    })

    function isLogged(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }else{
            return res.redirect('/');
        }
    }
};
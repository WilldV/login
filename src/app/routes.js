module.exports = (app, passport) => {
    app.get('/', (req,res ) =>{
        res.render('index');
    })
    app.get('/login', (req,res) =>{
        res.render('login',{
            message: req.flash('localMessage')
        });
    })
    app.post('/login',(req,res) =>{
        
    })

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

    app.get('/profile', (req,res) =>{
        res.render('profile', {
            user:req.user
        })
    })
};
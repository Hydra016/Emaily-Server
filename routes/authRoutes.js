const passport = require('passport');

module.exports = app => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }))

    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['profile', 'email']
    }))
    app.get('/auth/facebook/callback', passport.authenticate('facebook'));
    app.get('/auth/google/callback', passport.authenticate('google'),  (req, res) => {
        if(process.env.NODE_ENV === 'production') { 
            res.redirect(process.env.PROD_DASHBOARD_PATH);
        } else {
            res.redirect(process.env.DEV_DASHBOARD_PATH);
        }
    });
    app.get('/api/logout', (req, res) => {
        req.logout();
        if(process.env.NODE_ENV === 'production') {
            res.redirect(process.env.PROD_ROOT_PATH)
        } else {
            res.redirect(process.env.DEV_ROOT_PATH)
        }
    })
    app.get('/api/current_user', (req, res) => {
    if (req.isAuthenticated()) {
        res.send(req.user);
    } else {
        res.status(401).send("Not authenticated");
    }
});
}

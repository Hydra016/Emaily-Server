require("dotenv/config");
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors');

require('./models/User');
require('./services/passport');
const app = express();

app.use(express.json());

if(process.env.NODE_ENV === 'production') {
    mongoose.connect(process.env.DB_STRING_PROD)
} else {
    mongoose.connect(process.env.DB_STRING_DEV);
}

app.use(cookieSession({
    maxAge: 30*24*60*60*1000,
    keys: [process.env.COOKIE_KEY]
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

require('./routes/authRoutes')(app)
require('./routes/billingRoutes')(app)

// if(process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/build'))

//     const path = require('path');
//     app.get((req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//     })
// }



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`app running on port: ${PORT}`)
})

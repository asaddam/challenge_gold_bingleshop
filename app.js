const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt')
const _ = require('lodash');
const generateToken = require('./helper/jwt');
require('dotenv').config();

const app = express();;

const apiUrl = "/api/v1"

// setting cors
let corsOptions = {
    origin: 'http://localhost:4000',
}
app.use(cors(corsOptions));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// for development
// db.sequelize.sync({ force: true }).then(() => {
//     console.log('Drop and Resync Db');
//     initial();
// });
// function initial() {
//     Role.create({
//         id: 1,
//         name: "user"
//     });

//     Role.create({
//         id: 2,
//         name: "admin"
//     });
// }

const UserRepository = require('./repository/user');

//Auth
const AuthRepository = require('./repository/auth');
const AuthUseCase = require('./usecase/auth');

const authRouter = require('./routers/auth');

const authUC = new AuthUseCase(
    new UserRepository(),
    new AuthRepository(),
    bcrypt,
    generateToken,
    _
)

app.get('/api/v1', (req, res) => {
    res.json({ message: 'welcome' })
});

app.use((req, res, next) => {
    req.authUC = authUC;

    next();
});

app.use(`${apiUrl}/`, authRouter)

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`Server is running on  ${PORT}`);
})
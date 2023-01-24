const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();;
const apiRouter = require('./routers/auth');

// setting cors
let corsOptions = {
    origin: 'http://localhost:4000',
}
app.use(cors(corsOptions));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
const Role = db.role;

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

app.get('/api/v1', (req, res) => {
    res.json({ message: 'welcome' })
});
app.use('/api/v1', apiRouter);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`Server is running on  ${PORT}`);
})
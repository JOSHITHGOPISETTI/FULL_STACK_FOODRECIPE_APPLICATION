const express = require('express');
const app = express();
//const bodyParser = require("body-parser");
const userRouter = require('./routes/userRoutes');
const adminRouter = require("./routes/adminRoutes");
const cors = require('cors');
app.use(express.json());
//app.use(bodyParser.json());
app.use(cors());

app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.listen(3000, () => {
    console.log('listening on port 3000');
})
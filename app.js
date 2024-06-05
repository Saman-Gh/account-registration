const express = require('express');
const app = express();


const authRouter = require('./src/api/auth/auth.router/index');
const homeRouter = require('./src/api/home/home.router/index');
const profileRouter = require('./src/api/profile/profile.router/index');

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use('/', authRouter)
app.use('/', homeRouter)
app.use('/', profileRouter)



app.listen(5000, ()=> {
    console.log("App runing on port 5000");
})


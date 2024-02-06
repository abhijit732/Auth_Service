const express = require('express');
const bodyParser = require('body-parser');

const {PORT}= require('./config/serverConfig');
const apiRoutes = require('./routes/index');

// const UserService= require('./services/user-service');
const db= require('./models/index');

const app = express();

const prepareAndStartServer =()=> {


    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api',apiRoutes);
    app.listen(PORT,async ()=>{
        console.log(`Server Started on Port: ${PORT}`);
        if(process.env.DB_SYNC) {
            db.sequelize.sync({alter:true});
        }
        
        // const service=new UserService();
        // // const newToken = service.createToken({email:'abhijeet@admin.com',id:1});
        // // console.log("new Token is",newToken);
        // const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiaGlqZWV0QGFkbWluLmNvbSIsImlkIjoxLCJpYXQiOjE3MDY4ODIxODcsImV4cCI6MTcwNjg4MjIxN30.a5toSQIEBKbR-ILh9i62S9GBOiJN5GLqPsR7hvdn4Ew';
        // const response=service.verifyToken(token);
        // console.log(response);
    });
}

prepareAndStartServer();
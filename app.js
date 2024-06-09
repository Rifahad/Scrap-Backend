const express = require('express');
const app = express();
const port = process.env.PORT || 7000;
const path = require('path');
const cors = require('cors');
const adminRouter = require('./router/adminRouter');
const userRouter = require('./router/userRouter')
const Dbconnection = require('./config/dataBase');
require('dotenv').config();
Dbconnection();


const corsOptions = {
  origin: 'http://localhost:5173',
  maxAge: 86400, // 1 day
};

app.use(cors(corsOptions));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', adminRouter);
app.use('/',userRouter)

app.use((err,req,res,next)=>{
  console.log(err)
  res.status(500).json({success:false,message:'internal server error'})
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

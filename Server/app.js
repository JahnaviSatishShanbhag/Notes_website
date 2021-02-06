let express=require('express');
let mysql=require('mysql');
let app=express();
let cors=require('cors');
let dotenv=require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
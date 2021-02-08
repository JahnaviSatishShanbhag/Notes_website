let express=require('express');
let mysql=require('mysql');
let app=express();
let cors=require('cors');
let dotenv=require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const connection=mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DATABASE,
    port:process.env.PORTS
});

connection.connect((error)=>
{
    if (error)
    {
        console.log(error.message);
    }
    else
    {
        console.log("database connected");
    }
});

app.get('/getData',(req,res)=>
{
    const sql='SELECT * FROM users;';
    const query=connection.query(sql,(error,results)=>
    {
        if (error)
        {
            throw error;
        }
        else
        {
            res.send(results);
        }
    });
});

app.post('/postData',(req,res)=>
{
    const {name}=req.body;
    const {email}=req.body;
    const {password}=req.body;
    const sql='INSERT INTO users(name,email,password) VALUES(?,?,?);';
    const query=connection.query(sql,[name,email,password],(error,result)=>
    {
        if (error)
        {
            throw error;
        }
        else
        {
            let table_sql="CREATE TABLE "+name+"(id INT AUTO_INCREMENT PRIMARY KEY,title VARCHAR(100) NOT NULL,note VARCHAR(15900) NOT NULL);";
            let table_query=connection.query(table_sql,(error,reslt)=>
            {
                if (error) throw error;
            });
            const postData=
            {
                id:result.insertId,
                name:name,
                email:email,
                password:password
            };
            res.send(postData);
        }
    });
});

app.get('/users/:username',(req,res)=>
{
    let username=req.params.username;
    const sql='SELECT * FROM '+username;
    const query=connection.query(sql,(error,results)=>
    {
        if (error)
        {
            throw error;
        }
        else
        {
            res.send(results);
        }
    });
});

app.post('/users/post/:username',(req,res)=>
{
    let username=req.params.username;
    let {title}=req.body;
    let {note}=req.body;
    const sql=`INSERT INTO ${username}(title,note) VALUES(?,?);`;
    const query=connection.query(sql,[title,note],(error,result)=>
    {
        if (error)
        {
            throw error;
        }
        else
        {
            const postNote=
            {
                id:result.insertId,
                title:title,
                note:note
            };
            res.send(postNote);
        }
    });
});

app.listen(process.env.PORT,console.log("Listening to the port "+process.env.PORT));
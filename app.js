const express = require('express');
const errorHandler = require('./middleware/errorHsndler');
const pgp = require('pg-promise')()
const cn = {
    host: 'dpg-cgpajv0u9tun42shmebg-a.oregon-postgres.render.com',
    port: 5432,
    database: 'ioriweb',
    user: 'seaotter',
    password: 'OC5okdJZpXu3zo8RSmpKyyowcfrawdPh',
    ssl: { rejectUnauthorized: false },
    allowExitOnIdle: true};
const db = pgp(cn); 

const app = express()
const port = 3000

/*set view index and set view engine*/
app.set('views', './views')
app.set('view engine', 'pug');


app.get('/', (req, res, next) => {
    console.log('the response will be sent by the next function ...');
    next();
}, (req, res)=> {
    res.send('Hello from B!');
});

app.get('/test', (req, res, next) => {
    try {
        console.log(a);
    } catch (error) {
        next(error)
    }
})

app.get('/haru', async (req, res, next) => {
    try{
        let datas = await db.any('SELECT * FROM galgameTitle;')
        .then((data)=> {
            // console.log('DATA:', data);
            return data;
        })
        .catch((error)=> {
            console.log('ERROR:', error);
        });
        console.log(datas[0]);
        res.render('index', { data: datas});
    }catch(error){
        next(error);
    }
})

app.use(express.static('public'));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
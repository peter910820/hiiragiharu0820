import express from 'express';
import bodyParser from 'body-parser';
import pgp from 'pg-promise';

import { errorHandler } from './middleware/errorHandler.js';
import { galgameArticleInsert } from './src/databaseHandler.js'
import { cn } from "./src/connect.js";

const db = pgp()(cn);

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }));
/*set view index and set view engine*/
app.set('views', './views')
app.set('view engine', 'pug');

app.get('/', async (req, res, next) => {
    try {
        let datas = await db.any('SELECT * FROM galgameTitle;')
            .then((data) => {
                return data;
            }).catch((error) => {
                console.log('ERROR:', error);
            });
        console.log(datas);
        res.render('index', { data: datas });
    } catch (error) {
        next(error);
    }
});

app.get('/newArticle', async (req, res, next) => {
    try {
        let datas = await db.any('SELECT * FROM tag;')
            .then((data) => {
                return data;
            }).catch((error) => {
                console.log('ERROR:', error);
            })
        console.log(datas);
        res.render('newArticle', { data: datas });
    } catch (error) {
        next(error);
    }
});

app.post('/submit', async (req, res, next) => {
    try {
        if (req.body.information[req.body.information.length - 1] == '0000') {
            req.body.information.pop();
            let articleArray = [];
            req.body.information.forEach(element => {
                articleArray.push(element)
            });
            articleArray[6] = 'https://www.youtube.com/embed/' + articleArray[6].substr(32);
            galgameArticleInsert(articleArray, `${req.body.information[4]},${req.body.information[5]}`);
        } else {
            console.log('ERROR: password error');
        }

        res.render('submit');
    } catch (error) {
        next(error);
    }
});

app.get('/resource', async (req, res, next) => {
    try {
        res.render('resource');
    } catch (error) {
        next(error);
    }
});

app.get('/test', (req, res, next) => {
    try {
        console.log(a);
    } catch (error) {
        next(error)
    }
})

app.get('/haru', async (req, res, next) => {
    try {
        let datas = await db.any('SELECT * FROM galgameTitle;')
            .then((data) => {
                // console.log('DATA:', data);
                return data;
            })
            .catch((error) => {
                console.log('ERROR:', error);
            });
        console.log(datas[0]);
        res.render('index', { data: datas });
    } catch (error) {
        next(error);
    }
})

app.use(express.static('public'));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
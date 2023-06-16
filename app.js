/* eslint-disable no-undef */
import express from "express";
import bodyParser from "body-parser";
import pgp from "pg-promise";

import { errorHandler } from "./middleware/errorHandler.js";
import { galgameArticleInsert, galgameArticleShow } from "./src/databaseHandler.js";
import { cn } from "./src/connect.js";

const db = pgp()(cn);

const app = express();
const port = process.env.PORT || 3000;
// const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
/*set view index and set view engine*/
app.set("views", "./views");
app.set("view engine", "pug");

/* route */
app.get("/", async (req, res, next) => {
  try {
    let datas = await db.any("SELECT author, title, tag, create_time FROM galgame_article ORDER BY create_time DESC;")
      .then((data) => {
        return data;
      }).catch((error) => {
        console.log("ERROR:", error);
      });
    let tags = await db.any("SELECT name FROM tag ORDER BY create_time;")
      .then((data) => {
        return data;
      }).catch((error) => {
        console.log("ERROR:", error);
      });
    console.log(datas);
    res.render("index", { datas: datas, tags: tags });
  } catch (error) {
    next(error);
  }
});

app.get("/galgamearticle/:article", async (req, res, next) => {
  try {
    let tags = await db.any("SELECT name FROM tag ORDER BY create_time;")
      .then((data) => {
        return data;
      }).catch((error) => {
        console.log("ERROR:", error);
      });
    let _datas = await galgameArticleShow(req.params.article);
    let _ = _datas[0].content.replaceAll("\\u0009", "\t").replaceAll("\\u000A", "\n");
    _datas[0].content = _;
    res.render("galgameArticle", {data: _datas[0], tags: tags});
  } catch (error) {
    next(error);
  }
});

app.get("/tags", async (req, res, next) => {
  try {
    let datas = await db.any("SELECT * FROM tag;");
    console.log(datas);
    res.render("tags", {datas: datas, tags: datas});
  } catch (error) {
    next(error);
  }
});

app.get("/tags/:tag", async (req, res, next) => {
  try {
    let tags = await db.any("SELECT name FROM tag ORDER BY create_time;")
      .then((data) => {
        return data;
      }).catch((error) => {
        console.log("ERROR:", error);
      });
    let datas = await db.any("SELECT author, title, tag, create_time FROM galgame_article ORDER BY create_time DESC;")
      .then((data) => {
        const data_tags = [];
        data.forEach((item) => {
          let tags = item.tag.split(",");
          if(tags.includes(req.params.tag)){
            data_tags.push(item);
          }
        });
        return data_tags;
      }).catch((error) => {
        console.log("ERROR:", error);
      });
    console.log(datas);
    res.render("tag", {datas: datas, tags: tags});
  } catch (error) {
    next(error);
  }
});
// app.get("/newGalgameArticle", async (req, res, next) => {
//   try {
//     let datas = await db.any("SELECT * FROM tag;")
//       .then((data) => {
//         return data;
//       }).catch((error) => {
//         console.log("ERROR:", error);
//       });
//     console.log(datas);
//     res.render("newGalgameArticle", { data: datas });
//   } catch (error) {
//     next(error);
//   }
// });

app.get("/newgalgamearticle", async (req, res, next) => {
  try {
    let tags = await db.any("SELECT name FROM tag ORDER BY create_time;")
      .then((data) => {
        return data;
      }).catch((error) => {
        console.log("ERROR:", error);
      });
    res.render("newGalgameArticle", {tags: tags});
  } catch (error) {
    next(error);
  }
});

app.post("/galgamesubmit", async (req, res, next) => {
  try {
    if (req.body.information[req.body.information.length - 1] == "0000") {
      req.body.information.pop();
      let articleArray = [];
      req.body.information.forEach(element => {
        articleArray.push(element);
      });
      articleArray[6] = "https://www.youtube.com/embed/" + articleArray[6].substr(32);
      galgameArticleInsert(articleArray);
    } else {
      console.log("ERROR: password error");
    }
    res.render("submit");
  } catch (error) {
    next(error);
  }
});

app.get("/resource", async (req, res, next) => {
  try {
    let tags = await db.any("SELECT name FROM tag ORDER BY create_time;")
      .then((data) => {
        return data;
      }).catch((error) => {
        console.log("ERROR:", error);
      });
    res.render("resource", {tags: tags});
  } catch (error) {
    next(error);
  }
});

app.get("/aboutme", async (req, res, next) => {
  try {
    let tags = await db.any("SELECT name FROM tag ORDER BY create_time;")
      .then((data) => {
        return data;
      }).catch((error) => {
        console.log("ERROR:", error);
      });
    res.render("aboutme", {tags: tags});
  } catch (error) {
    next(error);
  }
});

app.get("/test", async (req, res, next) => {
  try {
    res.render("resourcea");
  } catch (error) {
    next(error);
  }
});

app.get("/:_", async (req, res) => {
  let tags = await db.any("SELECT name FROM tag ORDER BY create_time;")
    .then((data) => {
      return data;
    }).catch((error) => {
      console.log("ERROR:", error);
    });
  return res.render("errorPage", {error: "找不到網頁", status: 404, statusDescribe: "404 Not Found", tags: tags});
});

/* app.use */
app.use(express.static("public"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
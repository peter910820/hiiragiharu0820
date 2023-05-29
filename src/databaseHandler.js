import { cn } from "./connect.js";
import pgp from "pg-promise";
const db = pgp()(cn);

export const galgameArticleInsert = async (articleArray) => {
  try {
    let now = new Date("2023-05-01 13:27:57.281509");

    const insertQuery = `
          INSERT INTO galgame_article (author, title, company, release_date, official_website, op_url, content, tag, create_time)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          RETURNING *`;

    const data = {
      author: articleArray[0],
      title: articleArray[1],
      company: articleArray[2],
      release_date: articleArray[3],
      official_website: articleArray[5],
      op_url: articleArray[6],
      content: articleArray[7],
      tag: `${articleArray[4]},${articleArray[2]}`,
      create_time: ""
    };
            
    const articleResult = await db.one(insertQuery, [
      data.author, data.title, data.company, data.release_date, 
      data.official_website, data.op_url, data.content, data.tag, now]);
    console.log(articleResult);

  }catch(error){
    console.log(`ERROR: ${error}`);
  }
};

export const galgameArticleShow = async (article) => {
  console.log(article);
  let title = await db.any(`SELECT * FROM galgame_article WHERE title = '${article}';`);
  return title;
};
import { cn } from "./connect.js";
import pgp from "pg-promise";
const db = pgp()(cn);

export const galgameArticleInsert = async (articleArray, titleTag) => {
  try {
    let now = new Date();

    const insertQueryArticle = `
          INSERT INTO galgameArticle (title, company, start_time, end_time, op_url, tag, author, content, create_time)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          RETURNING *`;

    const insertQueryArticleTitle = `
          INSERT INTO galgameTitle (title, tag, create_time)
          VALUES ($1, $2, $3)
          RETURNING *`;

    const data = {
      title: articleArray[0],
      company: articleArray[4],
      start_time: articleArray[1],
      end_time: articleArray[2],
      op_url: articleArray[6],
      tag: `${articleArray[4]},${articleArray[5]}`,
      author: articleArray[3],
      content: articleArray[7],
      create_time: now,
    };
            
    const articleResult = await db.one(insertQueryArticle, [
      data.title, data.company, data.start_time, data.end_time, 
      data.op_url, data.tag, data.author, data.content, data.create_time]);
    const articleTitleResult = await db.one(insertQueryArticleTitle, [data.title, titleTag, data.create_time]);
    console.log(articleResult);
    console.log(articleTitleResult);

  }catch(error){
    console.log(`ERROR: ${error}`);
  }
};

export const galgameArticleShow = async (article) => {
  console.log(article);
  let title = await db.any(`SELECT * FROM galgameArticle WHERE TITLE = '${article}';`);
  console.log(title);
  return title;
};
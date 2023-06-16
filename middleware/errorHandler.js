import pgp from "pg-promise";
import { cn } from "../src/connect.js";

const db = pgp()(cn);

// eslint-disable-next-line no-unused-vars
export const errorHandler =  async (error, req, res, next) =>{
  let tags = await db.any("SELECT name FROM tag ORDER BY create_time;")
    .then((data) => {
      return data;
    }).catch((error) => {
      console.log("ERROR:", error);
    });
  console.log(tags);
  console.log(error);
  return res.render("errorPage", {error: error.message, status: 500, statusDescribe: "Internal Server Error", tags: tags});
  // return res.status(500).send(error.message);
} ;
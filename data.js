import pgp from "pg-promise";
import { cn } from "./connect.js";
const db = pgp()(cn);

db.any(`DELETE  FROM galgameArticle WHERE TITLE = '${article}';`);
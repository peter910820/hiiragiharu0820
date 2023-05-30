export const errorHandler = (error, req, res, next) =>{
  console.log(error);
  return res.render("errorPage", {error: error.message, status: 500, statusDescribe: "Internal Server Error"});
  // return res.status(500).send(error.message);
} ;
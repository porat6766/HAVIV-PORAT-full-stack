import fs from "fs";

const logRequest = (req, res, next) => {
  const log = `
  Activity received at: ${new Date().toLocaleString()}
  Path parameters received: ${JSON.stringify(req.params || {})} 
  Query parameters received: ${JSON.stringify(req.query || {})} 
  Body parameters received: ${JSON.stringify(req.body || {})} 
  Status Code: ${res.statusCode} \n`;

  console.log(log);

  fs.appendFile("./logs.txt", log, (err) => {
    if (err) {
      console.error("There was an error appending the data to logs.txt", err);
    }
  });

  next();
};

export default logRequest;

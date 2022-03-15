const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");
// import library and files
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const swaggerCss = fs.readFileSync((process.cwd()+"/swagger.css"), 'utf8');
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// let express to use this
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {swaggerCss}));
const db = require("./app/models");
(async () => { 
    try {
        await db.mongoose
        .connect(db.url, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
    }
    catch {
        (err) => { 
            console.log(err); process.exit();
        }
    };
})();
require("./app/routes/employee.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
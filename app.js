const express = require('express');
const path = require('path'); // Add this line to import the path module
const app = express();
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;
require('./db/connection');
const router = require('./router/routes');
app.use(express.static('./public'));  // setting the path for static files (Compulsory)
app.set('view engine', 'ejs'); // Set the view engine to use EJS
app.set('views', path.join(__dirname, 'views')); // Specify the views directory
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.use(express.json()); // Parse JSON data and add it to the body section of the request
app.use(router);

app.listen(port, () => {
  console.log(`Server is running at port number ${port}`);
});

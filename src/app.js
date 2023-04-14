const express = require("express");
const path = require("path");
const request = require("request");

const app = express();
const hbs = require("hbs");
const geoCode = require("./utils/geocode.js");
const PORT = process.env.PORT || 3000;

// console.log(__dirname);
// console.log(__filename);
// /Users/tusharvarkhede/Documents/Node/web-server/src
// /Users/tusharvarkhede/Documents/Node/web-server/src/app.js
const publicDirectoryPath = path.join(__dirname, "../public");
// console.log(publicDirectoryPath);
// /Users/tusharvarkhede/Documents/Node/web-server/public

//Setup Handlebars engine and views loaction
app.set("views", path.join(__dirname, "../templates/views"));
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "../templates/partials"));
// Setup static Directory To serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    msg: "This is the help page",
    footerMsg: "This is the footer1",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    msg: "This is the help page",
    footerMsg: "This is the footer",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    msg: "This is the help page",
    footerMsg: "This is the footer From About",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Please Provide the Address" });
  }
  // console.log(req.query.address);
  const address = req.query.address;
  geoCode(address, (error, response) => {
    if (error) {
      //  console.log("Errorrrr", error);
      res.send({ error: true, data: undefined });
    } else {
      // console.log("Respones i got ", response);

      res.send({ error: false, data: response });
    }
  });
});
app.get("/products", (req, res) => {
  console.log(req.query);
  res.send({
    products: ["Laptop"],
  });
});
app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "Help Not Found",
    msg: "Page ot Found 404 Error",
    footerMsg: "Footer",
  });
});
// app.get("*", (req, res) => {
//   res.render("error", {
//     title: "Error Page",
//     msg: "Page Not Found 404 Error",
//     footerMsg: "Footer",
//   });
// });
app.listen(PORT, () => {
  console.log("Server is Up on Port 3000");
});

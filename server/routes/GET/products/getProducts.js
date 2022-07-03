const express = require("express");
const router = express.Router();

const sendError = require("../../../globalFunctions/sendError.js");

const server = require('../../../server.js');

//Get specific products from the database through a identifier param (Ex: discount, capsules, etc)
router.get("/:identifier", (req, res) => {
  const identifier = req.params.identifier;

  //Function to send products according to it identifier
  function sendProducts(category, order, limitNumber) {
    let [selectCategory, orderBy, limit] = ["", "", ""];

    console.log(selectCategory);

    if (category) selectCategory = `and productCategory = '${category}'`;
    if (order) orderBy = `ORDER BY ${order}`;
    if (limitNumber) limit = `LIMIT ${limitNumber}`;

    server.db.query(
      `SELECT * FROM products WHERE productEnabled = 1 ${selectCategory} ${orderBy} ${limit}`,
      (err, result) => {
        if(err) return sendError(res, err.code, err.errno);
        
        res.send(result);
      }
    );
  }

  switch (identifier) {
    case undefined | "":
      sendError("UNDEFINED_IDENTIFIER", "UC", "5");
      return;
    case "otherproducts":
      sendProducts("", "", "100");
      break;
    case "capsules":
      sendProducts("CAPSULAS", "productTotalSales DESC, productGrade DESC", "5");
      break;
    case "mostsolds":
      sendProducts("", "productTotalSales DESC", "5");
      break;
    case "discount":
      sendProducts("", "productDiscount DESC", "5");
      break;
  }
});

module.exports = router;

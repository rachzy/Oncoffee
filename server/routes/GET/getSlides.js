const express = require("express");
const router = express.Router();

const sendError = require("../../globalFunctions/sendError.js");

const server = require("../../server.js");

//Get a specific slides collection by an identifier
router.get("/:identifier", (req, res) => {
  const identifier = req.params.identifier;

  if (!identifier) return sendError(res, "UNDEFINED_IDENTIFIER", "UI");

  switch (identifier) {
    case "ads":
      server.db.query(`SELECT * FROM ads`, (err, result) => {
        if (err) return sendError(res, err.code, err.errno);

        res.send(result);
      });
      break;
    case "featuredpromotions":
      res.writeHead(200, { "Content-Type": "application/json" });

      server.db.query(`SELECT * FROM featuredpromotions`, (err, result) => {
        if (err) return sendError(res, err.code, err.errno);

        res.write("[");

        let amountOfLoadedSlides = 0;
        result.map((row) => {
          server.db.query(
            `SELECT * FROM products WHERE productId = ${row.productId}`,
            (err2, result2) => {
              if (err2) return sendError(res, err2.code, err2.errno);

              let finalReturn = {
                ...result2[0],
                slideTypeClass: row.typeClass,
                slideEndDate: row.endDate,
              };

              let getEndDate = new Date(row.endDate).getTime();
              let getNowDate = new Date().getTime();

              let distance = getEndDate - getNowDate;
              if (distance < 0) return;

              res.write(JSON.stringify(finalReturn, null, 3));

              if (amountOfLoadedSlides === result.length - 1) {
                res.write("]");
                res.end();
                return;
              }
              res.write(", \n");
              amountOfLoadedSlides++;
            }
          );
        });
      });
  }
});

module.exports = router;

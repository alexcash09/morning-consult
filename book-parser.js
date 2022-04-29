const csv = require("csv-parser");
const fs = require("fs");

const n = parseInt(process.argv[2]);
const results = [];
let booksWithCount = [];
let recommededBooks = [];

fs.createReadStream("review_list")
  .pipe(csv({ separator: "\t" }))
  .on("data", (data) => results.push(data))
  .on("end", () => {
    for (i = 0; i < results.length; i++) {
      const id = `${results[i].Title}:${results[i].Author}`;
      const count = results.filter(
        (book) => `${book.Title}:${book.Author}` === id
      ).length;

      booksWithCount.push({
        title: results[i].Title,
        author: results[i].Author,
        count: count,
      });
    }
    recommededBooks = new Set(
      booksWithCount.filter((book) => book.count === n)
    );
    console.log(recommededBooks);
  });

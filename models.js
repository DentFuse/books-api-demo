const mongoose = require("mongoose");

export const connect = async () => {
  return new Promise((resolve, reject) => {
    try {
      mongoose.connect(process.env.DBCONNECT);
      mongoose.connection.on("open", () => {
        resolve();
        console.log("Successfully connected to database!");
      });
    } catch (e) {
      reject(e);
    }
  });
};

const bookSchema = new mongoose.Schema({
  id: Number,
  author: String,
  summary: String,
  title: String,
});

export const Book = mongoose.model("books", bookSchema);

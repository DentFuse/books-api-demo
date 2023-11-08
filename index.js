import express from "express";
import * as models from "./models.js";

const app = express();
const port = process.env.PORT || 19132;
async function main() {
  await models.connect();
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Hello World!");
});

// ADD
app.post("/addbook", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    if (!data?.title || !data?.summary || !data?.id || !data?.author)
      return res.status(400).json({ status: "error", message: "invalid data" });
    let bookDoc = await models.Book.findOne({ id: data.id });
    if (bookDoc) {
      return res
        .status(400)
        .json({ status: "error", message: "book with same id already exists" });
    }
    bookDoc = await new models.Book({ ...data }).save();
    console.log(bookDoc);
    res.status(200).json({ status: "ok", message: "saved" });
  } catch (e) {
    console.log("error: " + e);
    return res
      .status(500)
      .json({ status: "error", message: "an error occured" });
  }
});

// LIST ALL
app.get("/getallbooks", async (req, res) => {
  try {
    let bookDoc = (await models.Book.find({})).map((x) => {
      return { id: x.id, summary: x.summary, author: x.author, title: x.title };
    });
    console.log(bookDoc);
    res.status(200).json({ status: "ok", message: "found", data: bookDoc });
  } catch (e) {
    console.log("error: " + e);
    return res
      .status(500)
      .json({ status: "error", message: "an error occured" });
  }
});

// GET BY ID
app.get("/getbook", async (req, res) => {
  try {
    const id = req.query.id;
    console.log("get", id);
    if (!id)
      return res.status(400).json({ status: "error", message: "invalid id" });
    let bookDoc = await models.Book.findOne({ id: id });
    if (!bookDoc) {
      return res
        .status(400)
        .json({ status: "error", message: "book doesn't exist" });
    }
    res.status(200).json({
      status: "ok",
      message: "found",
      data: {
        id: bookDoc.id,
        summary: bookDoc.summary,
        author: bookDoc.author,
        title: bookDoc.title,
      },
    });
  } catch (e) {
    console.log("error: " + e);
    return res
      .status(500)
      .json({ status: "error", message: "an error occured" });
  }
});
// UPDATE

app.post("/updatebook", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    if (!data?.id)
      return res.status(400).json({ status: "error", message: "invalid id" });
    if (!data?.title && !data?.summary && !data?.author)
      return res.status(400).json({ status: "error", message: "invalid data" });
    let bookDoc = await models.Book.findOneAndUpdate(
      { id: data.id },
      { ...data }
    );
    if (!bookDoc) {
      return res
        .status(400)
        .json({ status: "error", message: "couldn't find book" });
    }
    console.log(bookDoc);
    res.status(200).json({ status: "ok", message: "updated" });
  } catch (e) {
    console.log("error: " + e);
    return res
      .status(500)
      .json({ status: "error", message: "an error occured" });
  }
});

// DELETE
app.get("/deletebook", async (req, res) => {
  try {
    const id = req.query.id;
    console.log("delete", id);
    if (!id)
      return res.status(400).json({ status: "error", message: "invalid id" });
    let bookDoc = await models.Book.deleteOne({ id: id });
    if (bookDoc.deletedCount == 0) {
      return res
        .status(400)
        .json({ status: "error", message: "book doesn't exist" });
    }
    res.status(200).json({ status: "ok", message: "deleted" });
  } catch (e) {
    console.log("error: " + e);
    return res
      .status(500)
      .json({ status: "error", message: "an error occured" });
  }
});

main();

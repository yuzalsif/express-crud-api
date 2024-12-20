const express = require("express");
const mongoose = require("mongoose");

const Products = require("./models/product.model.ts");

const app = express();
app.use(express.json());

// routes

const port = process.env.PORT || 3000;
app.get("/", (req, res) =>
  res.send("This is a response coming from the  Node API")
);

mongoose
  .connect(
    "mongodb+srv://yuseifabdillah:ZhD8DD8oo0CdclzG@experimental.32yht.mongodb.net/?retryWrites=true&w=majority&appName=Experimental"
  )
  .then(() => {
    console.log("Connected!");
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
  })
  .catch((err) => console.log("Connection to the database failed", err));

app.post("/api/products", async (req, res) => {
  try {
    const product = await new Products(req.body);
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Products.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.put("/api/products/:id", async (req, res) => {
  try {
    const product = await Products.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    const product = await Products.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

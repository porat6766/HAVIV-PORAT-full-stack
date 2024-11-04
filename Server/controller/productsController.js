import Product from "../models/productModel.js";

const homePage = (req, res) => {
  res.send("page-products");
};

const getAllProducts = async (req, res) => {
  try {
    const allProduct = await Product.find();
    res.status(200).send(allProduct);
  } catch (error) {
    console.error("Error fetching all product:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getRandonProduct = async (req, res) => {
  try {
    const randomProduct = await Product.aggregate([{ $sample: { size: 1 } }]);
    res.status(200).send(randomProduct[0]);
  } catch (error) {
    console.error("Error fetching random product:", error);
    res.status(500).send("Internal Server Error");
  }
};

const createProduct = async (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    inStock: req.body.inStock,
    description: req.body.description,
  });

  try {
    await newProduct.save();
    res.status(201).send({
      message: "Product created successfully!",
      id: newProduct._id,
    });
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getProductByID = async (req, res) => {
  const { id } = req.params;
  try {
    const foundProduct = await Product.findById(id);

    if (!foundProduct) {
      return res.status(404).send({
        message: `No product found with id ${id}`,
      });
    }

    res.status(200).send(foundProduct);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const updateAPartProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, category, inStock, description } = req.body;

  const fieldsToUpdate = {};

  if (description) {
    fieldsToUpdate.description = description;
  }

  if (name) {
    fieldsToUpdate.name = name;
  }

  if (typeof price === "number") {
    fieldsToUpdate.price = price;
  } else {
    res.status(400).send("please provide number");
  }

  if (category) {
    fieldsToUpdate.category = category;
  }

  if (inStock !== undefined) {
    fieldsToUpdate.inStock = inStock;
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, fieldsToUpdate, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

const updateAllProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (updatedProduct) {
      res.status(200).send(updatedProduct);
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred", error: error.message });
  }
};

const deleteProductByID = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (deletedProduct) {
      res.status(200).send("Product deleted successfully");
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred", error: error.message });
  }
};

export const controllerProduct = {
  getAllProducts,
  getRandonProduct,
  homePage,
  createProduct,
  getProductByID,
  updateAPartProduct,
  updateAllProduct,
  deleteProductByID,
};

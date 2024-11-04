import express from "express";
import { controllerProduct } from "../controller/productsController.js";

const router = express.Router();

router.get("/", controllerProduct.homePage);

router.get("/all", controllerProduct.getAllProducts);

router.get("/random", controllerProduct.getRandonProduct);

router.post("/create", controllerProduct.createProduct);

router.get("/:id", controllerProduct.getProductByID);

router.patch("/update/part/:id", controllerProduct.updateAPartProduct);

router.put("/update/:id", controllerProduct.updateAllProduct);

router.delete("/delete/:id", controllerProduct.deleteProductByID);

export default router;

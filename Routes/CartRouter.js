import express from "express";
import { protect } from "../middleware/auth.js";
import { addCart, getAllProductsFromCart, getAmountProductsFromCart, deleteProduct } from "../Controllers/CartsController.js";

const router = express.Router()

router.post("/", protect, addCart)
router.get("/", protect, getAllProductsFromCart)
router.get("/amount", protect, getAmountProductsFromCart)
router.delete("/:cartId", protect, deleteProduct)




export default router
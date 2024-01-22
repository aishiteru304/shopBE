import express from "express";
import { upload } from '../config/multer.js'
import { addProduct, deleteProduct, getAllCategories, getAllProducts, getProductsByCategory, getProductsBySearch, getNewProducts, getProductBySearchId, getProductsRelated } from "../Controllers/ProductsController.js";
import { admin, protect } from "../middleware/auth.js";

const router = express.Router()

router.post("/", protect, admin, upload.single('file'), addProduct)
router.get("/", getAllProducts)
router.get("/newproducts", getNewProducts)
router.get("/categories", getAllCategories)
router.get("/category/:category", getProductsByCategory)
router.get("/search/:searchTerm", getProductsBySearch)
router.delete("/:productId", protect, admin, deleteProduct)
router.get("/:productId", getProductBySearchId)
router.get("/related/:productId", getProductsRelated)


export default router
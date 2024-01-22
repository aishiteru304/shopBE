import express from "express";
import { admin, protect } from "../middleware/auth.js";
import { addInvoice, getAllInvoices } from "../Controllers/InvoicesController.js";

const router = express.Router()

router.get("/", protect, admin, getAllInvoices)
router.post("/", protect, addInvoice)



export default router
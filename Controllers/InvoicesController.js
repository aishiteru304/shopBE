import expressAsyncHandler from "express-async-handler";
import Invoice from "../Models/Invoices.js";
// import { sequelize } from "../config/db.js";

export const getAllInvoices = expressAsyncHandler(async (req, res) => {
    const invoices = await Invoice.findAll();

    res.json(invoices);
});

export const addInvoice = expressAsyncHandler(async (req, res) => {
    const userId = req.user.id
    try {
        const invoice = await Invoice.create({ userId: userId, phone: req.body.phone, address: req.body.address, products: req.body.products })
        res.status(201).json(invoice);
    } catch (error) {
        res.status(400)
        throw new Error("Invoice created failed")
    }
})


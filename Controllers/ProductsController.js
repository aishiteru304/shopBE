import expressAsyncHandler from "express-async-handler";
import { handleUploadImagetoFirebase } from "../config/firebase.js";
import Product from "../Models/Product.js";


export const addProduct = expressAsyncHandler(async (req, res) => {

    const urlImage = await handleUploadImagetoFirebase(req.file)
    try {
        const product = await Product.create({ name: req.body.name, description: req.body.description, image: urlImage, price: req.body.price, category: req.body.category })
        res.status(201).json(product);
    } catch (error) {
        res.status(400)
        throw new Error("Product created failed")
    }
})

export const getAllProducts = expressAsyncHandler(async (req, res) => {
    const products = await Product.findAll();
    res.json(products);
});

export const getNewProducts = expressAsyncHandler(async (req, res) => {
    const products = await Product.findAll();
    res.json(products.slice(-4));
});

export const getAllCategories = expressAsyncHandler(async (req, res) => {
    try {
        const products = await Product.findAll();

        const uniqueCategories = Array.from(new Set(products.map(product => product.category)));

        res.json(uniqueCategories);
    } catch (error) {
        res.status(400)
        throw new Error("Lỗi khi lấy danh sách categories");
    }
});

export const getProductsByCategory = expressAsyncHandler(async (req, res) => {
    const category = req.params.category;
    try {
        const products = await Product.findAll({
            where: {
                category: category,
            },
        });
        res.json(products);
    } catch (error) {
        res.status(500)
        throw new Error('Internal Server Error')
    }
});

export const getProductsBySearch = expressAsyncHandler(async (req, res) => {
    const searchTerm = req.params.searchTerm;
    try {
        const products = await Product.findAll();
        const productsBySearch = products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
        res.json(productsBySearch);
    } catch (error) {
        res.status(500)
        throw new Error('Internal Server Error')
    }
});

export const getProductBySearchId = expressAsyncHandler(async (req, res) => {
    const productId = req.params.productId;
    try {
        const product = await Product.findByPk(productId);
        res.json(product);
    } catch (error) {
        res.status(500)
        throw new Error('Internal Server Error')
    }
});

export const getProductsRelated = expressAsyncHandler(async (req, res) => {
    const productId = req.params.productId;
    try {
        const product = await Product.findByPk(productId);
        const products = await Product.findAll({
            where: {
                category: product.category,
            },
        });
        res.json(products);
    } catch (error) {
        res.status(500)
        throw new Error('Internal Server Error')
    }
});

export const deleteProduct = expressAsyncHandler(async (req, res) => {
    const { productId } = req.params
    const deletedRows = await Product.destroy({
        where: { id: productId },
    });

    if (deletedRows > 0) {
        const products = await Product.findAll();
        res.json(products);
    }
    else {
        res.status(401)
        throw new Error("ProductId not found")
    }
})
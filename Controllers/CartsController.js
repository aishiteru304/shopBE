import expressAsyncHandler from "express-async-handler";
import Cart from "../Models/Cart.js";
import { sequelize } from "../config/db.js";


export const addCart = expressAsyncHandler(async (req, res) => {
    const userId = req.user.id
    const productId = req.body.productId
    const cartExits = await Cart.findOne({
        where: {
            userId: userId,
            productId: productId
        }
    })
    if (cartExits) {
        res.status(400)
        throw new Error("This product already exists in your cart")
    }
    try {
        const cart = await Cart.create({ userId, productId })
        res.status(201).json(cart);
    } catch (error) {
        res.status(400)
        throw new Error("Cart created failed")
    }

})

export const getAllProductsFromCart = expressAsyncHandler(async (req, res) => {
    const userId = req.user.id
    const products = await sequelize.query(
        'SELECT * FROM "Products" AS p ' +
        'LEFT JOIN "Carts" AS c ON c."productId" = p."id" ' +
        'WHERE c."userId" = :userId',
        {
            replacements: { userId },
            type: sequelize.QueryTypes.SELECT,
        }
    )
    res.json(products);

});

export const getAmountProductsFromCart = expressAsyncHandler(async (req, res) => {
    const userId = req.user.id
    const products = await Cart.findAll({
        where: {
            userId: userId,
        },
    });
    res.json({ amount: products.length });

});

export const deleteProduct = expressAsyncHandler(async (req, res) => {
    const { cartId } = req.params
    const deletedRows = await Cart.destroy({
        where: { id: cartId },
    });

    if (deletedRows > 0) {
        const products = await Cart.findAll();
        res.json(products);
    }
    else {
        res.status(401)
        throw new Error("ProductId not found")
    }
})



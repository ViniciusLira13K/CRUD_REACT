const express = require('express');
const { PrismaClient } = require('@prisma/client');

const productRoutes = express.Router();
const prisma = new PrismaClient();

//C
productRoutes.post('/product', async (req, res) => {
    const { name, code, price, quantityCurrent, quantityMinimum } = req.body;
    const product = await prisma.product.create({
        data: {
            name,
            code,
            price,
            quantityCurrent,
            quantityMinimum,
        },
    });
    return res.status(201).json(product);
});

//R
productRoutes.get('/product', async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        console.log(' ok = ', products);
        return res.status(200).json(products);
    } catch (error) {
        console.log(' erro = ', error);
    }
});
//U
productRoutes.put('/product', async (req, res) => {
    const {
        id,
        code,
        name,
        price,
        quantityCurrent,
        quantityMinimum,
        dateTimeUpdate,
    } = req.body;

    if (!id) {
        return res.status(400).json('The field Id is mandatory');
    }

    const productAlreadyExist = await prisma.product.findUnique({
        where: { id },
    });

    if (!productAlreadyExist) {
        return res.status(400).json('Product not found');
    }

    const product = await prisma.product.update({
        where: {
            id,
        },
        data: {
            name,
            code,
            price,
            quantityCurrent,
            quantityMinimum,
            dateTimeUpdate,
        },
    });
    return res.status(200).json(product);
});

//D
productRoutes.delete('/product/:id', async (req, res) => {
    const { id: idString } = req.params;

    const id = parseInt(idString);

    if (!id) {
        return res.status(400).json('Id is mandatory');
    }

    const productAlreadyExist = await prisma.product.findUnique({ where: { id } });

    if (!productAlreadyExist) {
        return res.status(400).json('product not found');
    }

    const result = await prisma.product.delete({ where: { id } });

    return res.status(200).send(result);
});

module.exports = productRoutes;

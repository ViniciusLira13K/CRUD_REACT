const express = require('express');
const { PrismaClient } = require('@prisma/client');

const saleRoutes = express.Router();
const prisma = new PrismaClient();

//C
saleRoutes.post('/sale', async (req, res) => {
    const { productList, paymentList, value } = req.body;
    const sale = await prisma.sale.create({
        data: {
            productList,
            paymentList,
            value,
        },
    });
    return res.status(201).json(sale);
});

//R
saleRoutes.get('/sale', async (req, res) => {
    try {
        const sales = await prisma.sale.findMany();
        console.log(' ok = ', sales);
        return res.status(200).json(sales);
    } catch (error) {
        console.log(' erro = ', error);
    }
});
//U
saleRoutes.put('/sale', async (req, res) => {
    const { id, productList, paymentList, value } = req.body;

    if (!id) {
        return res.status(400).json('The field Id is mandatory');
    }

    const saleAlreadyExist = await prisma.sale.findUnique({
        where: { id },
    });

    if (!saleAlreadyExist) {
        return res.status(400).json('sale not found');
    }

    const sale = await prisma.sale.update({
        where: {
            id,
        },
        data: {
            productList,
            paymentList,
            value,
        },
    });
    return res.status(200).json(sale);
});

//D
saleRoutes.delete('/sale/:id', async (req, res) => {
    const { id: idString } = req.params;

    const id = parseInt(idString);

    if (!id) {
        return res.status(400).json('Id is mandatory');
    }

    const saleAlreadyExist = await prisma.sale.findUnique({ where: { id } });

    if (!saleAlreadyExist) {
        return res.status(400).json('sale not found');
    }

    const result = await prisma.sale.delete({ where: { id } });

    return res.status(200).send(result);
});

module.exports = saleRoutes;

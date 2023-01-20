const express = require('express');
const { PrismaClient } = require('@prisma/client');

const userRoutes = express.Router();
const prisma = new PrismaClient();

//C
userRoutes.post('/user', async (req, res) => {
    const { name, type, active } = req.body;
    const user = await prisma.user.create({
        data: {
            name,
            type,
            active,
        },
    });
    return res.status(201).json(user);
});

//R
userRoutes.get('/user', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        console.log(' ok = ', users);
        return res.status(200).json(users);
    } catch (error) {
        console.log(' erro = ', error);
    }
});
//U
userRoutes.put('/user', async (req, res) => {
    const {
        id,
        name,
        type,
        active,
    } = req.body;

    if (!id) {
        return res.status(400).json('The field Id is mandatory');
    }

    const userAlreadyExist = await prisma.user.findUnique({
        where: { id },
    });

    if (!userAlreadyExist) {
        return res.status(400).json('user not found');
    }

    const user = await prisma.user.update({
        where: {
            id,
        },
        data: {
            name,
            type,
            active,
        },
    });
    return res.status(200).json(user);
});

//D
userRoutes.delete('/user/:id', async (req, res) => {
    const { id: idString } = req.params;

    const id = parseInt(idString);

    if (!id) {
        return res.status(400).json('Id is mandatory');
    }

    const userAlreadyExist = await prisma.user.findUnique({ where: { id } });

    if (!userAlreadyExist) {
        return res.status(400).json('user not found');
    }

    const result = await prisma.user.delete({ where: { id } });

    return res.status(200).send(result);
});

module.exports = userRoutes;

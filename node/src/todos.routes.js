const { response } = require('express');
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const allTodos = [{ name: 'first', status: false }];
const todosRoutes = express.Router();
const prisma = new PrismaClient();

//C
todosRoutes.post('/todos', async (req, res) => {
    const { name } = req.body;
    const todo = await prisma.todo.create({
        data: {
            name,
        },
    });
    return res.status(201).json(todo);
});

//R
todosRoutes.get('/todos', async (req, res) => {
    try {
        const todos = await prisma.todo.findMany();
        console.log(' ok = ', todos)
        return res.status(200).json(todos);
        
    } catch (error) {
        console.log(' erro = ', error)
    }
});
//U
todosRoutes.put('/todos', async (req, res) => {
    const { id, name, status } = req.body;

    if (!id) {
        return res.status(400).json('Id is mandatory');
    }

    const todoAlreadyExist = await prisma.todo.findUnique({ where: { id } });

    if (!todoAlreadyExist) {
        return res.status(400).json('Todo not found');
    }

    const todo = await prisma.todo.update({
        where: {
            id,
        },
        data: {
            name,
            status,
        },
    });
    return res.status(200).json(todo);
});

//D
todosRoutes.delete('/todos/:id', async (req, res) => {
    const { id: idString } = req.params;

    const id = parseInt(idString);

    if (!id) {
        return res.status(400).json('Id is mandatory');
    }

    const todoAlreadyExist = await prisma.todo.findUnique({ where: { id } });

    if (!todoAlreadyExist) {
        return res.status(400).json('Todo not found');
    }

    const result = await prisma.todo.delete({ where: { id } });

    return res.status(200).send();
});

module.exports = todosRoutes;

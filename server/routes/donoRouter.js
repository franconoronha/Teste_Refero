import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const donoRouter = express.Router();

donoRouter.get('/donos', async (req, res) => {
    try {
        let donos = await prisma.dono.findMany({ orderBy: { id: "asc" }});
        res.json(donos);
    } catch(error) {
        res.status(500).send(error);
    }
});

donoRouter.post('/dono', async (req, res) => {
    let { nome, email, endereco, telefone } = req.body;

    try {
        const dono = await prisma.dono.create({
            data: {
                nome,
                email,
                endereco,
                telefone
            }
        });
        res.status(201).send(dono);
    } catch(error) {
        console.log(error);
        res.status(500).send(error);
    }
});

donoRouter.delete('/dono/:id', async (req, res) => {
    let id_delete = parseInt(req.params.id);
    try {
        const dono = await prisma.dono.delete({
            where: {
                id: id_delete
            }
        });
        res.status(204).send(dono);
    } catch(error) {
        console.log(error);
        res.status(500).send(error);
    }
});

donoRouter.put('/dono/:id', async (req, res) => {
    let id_update = parseInt(req.params.id);
    let { nome, email, telefone, endereco } = req.body;

    try {
        const dono = await prisma.dono.update({
            where: {
                id: id_update
            },
            data: {
                nome, 
                email,
                telefone,
                endereco
            }
        });
        res.status(200).send(dono);
    } catch(error) {
        res.status(500).send(error);
    }
});

export default donoRouter;
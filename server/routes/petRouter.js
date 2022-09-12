import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const petRouter = express.Router();

petRouter.get('/pets', async (req, res) => {
    try {
        let pet = await prisma.pet.findMany({
            orderBy: {
                id: 'asc'
            },
            include: {
                dono: {
                    select: {
                        nome: true
                    }
                }
            }
        });
        res.send(pet);
    } catch(error) {
        res.status(500).send(error);
    }
});

petRouter.post('/pet', async(req, res) => {
    let { donoId, nome, raca, tipo, idade } = req.body;
    tipo = parseInt(tipo);

    try {
        const pet = await prisma.pet.create({
            data: {
                nome,
                raca, 
                tipo,
                idade, 
                dono: {
                    connect: {
                        id: donoId
                    }
                }
            }
        });
        res.status(201).send(pet);
    } catch(error) {
        res.status(500).send(error);
    }
});

petRouter.delete('/pet/:id', async(req, res) => {
    let id_delete = parseInt(req.params.id);
    try {
        const pet = await prisma.pet.delete({
            where: {
                id: id_delete
            }
        });
        res.status(204).send(pet);
    } catch(error) {
        res.status(500).send(error);
    }
});

petRouter.put('/pet/:id', async (req, res) => {
    let id_update = parseInt(req.params.id);
    let { nome, raca, idade, tipo, donoId } = req.body;
    tipo = parseInt(tipo);

    try {
        const pet = await prisma.pet.update({
            where: {
                id: id_update
            },
            data: {
                nome, 
                tipo,
                donoId,
                raca,
                idade
            }
        });
        res.status(200).send(pet);
    } catch(error) {
        res.status(500).send(error);
    }
});

export default petRouter;
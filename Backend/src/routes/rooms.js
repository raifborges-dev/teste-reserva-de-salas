import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();



router.post('/new', async (req, res) => {

    const room = req.body;
    try{
        
        await prisma.rooms.create({
            data:{
                name: room.name
            }
        })
        res.status(201).json(room);
    }catch (err) {
        res.status(500).json({message:'Erro no servidor, tente novamente mais tarde!'});
    }
})

router.get('/list', async (req, res) => {

    try{
        const rooms = await prisma.rooms.findMany()
        res.status(200).json(rooms);
    }catch (err) {
        res.status(500).json({message:'Erro no servidor, tente novamente mais tarde!'});
    }

})

export default router
import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/new', async (req, res) => {

    const schedule = req.body;
    try{    
        await prisma.schedule.create({
            data:{
                meetBegin: schedule.meetBegin,
                meetEnd : schedule.meetEnd,
                description : schedule.description,
                room : schedule.room,
                roomId : schedule.roomId,
                owner : schedule.owner,
                ownerId : schedule.ownerId
            }
        })
        res.status(201).json(schedule);
    }catch (err) {
        res.status(500).json({message:'Erro no servidor, tente novamente mais tarde! \n'+err});
    }

})

router.get('/listbyroom', async (req, res) => {

    const room = req.headers.room
    const date = Date.now()

    try{
        console.log(room)
        const schedule = await prisma.schedule.findMany({
            where:{
                roomId: room,
                meetBegin: {
                    gt: date
                }
            }
        })
        res.status(200).json(schedule);
    }catch (err) {
        res.status(500).json({message:'Erro no servidor, tente novamente mais tarde!'});
    }

})

router.get('/listbyowner', async (req, res) => {

    const date = Date.now()
    const owner = req.headers.owner

    try{
        const schedule = await prisma.schedule.findMany({
            where:{
                ownerId: owner,
                meetBegin: {
                    gt: date
                }

            }
        })
        res.status(200).json(schedule);

    }catch (err) {
        res.status(500).json({message:'Erro no servidor, tente novamente mais tarde!\n' + err});
    }

})

router.get('/listall', async (req, res) => {
    const date = Date.now()

    try{
        const schedule = await prisma.schedule.findMany({
            where:{
                meetBegin: {
                    gt: date
                }
            }
        })
        res.status(200).json(schedule);

    }catch (err) {
        res.status(500).json({message:'Erro no servidor, tente novamente mais tarde!\n' + err});
    }

})

router.put('/deletemeet', async (req, res) => {
    const meet = req.body.scheduleId;

    try{
        const schedule = await prisma.schedule.delete({
            where:{
                id: meet,
            },
        })
        res.status(200).json(schedule);
    }catch (err) {
        res.status(500).json({message:'Erro no servidor, tente novamente mais tarde!\n' + err});
    }

})

export default router;
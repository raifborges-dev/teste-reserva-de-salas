import express from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken'


const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET;


const router = express.Router();

router.post('/signin', async (req, res) =>{
    const user = req.body;
    try{
        await prisma.user.create({
            data:{
                user: user.user,
                password: user.password
            }
        })
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({message:'Erro no servidor, tente novamente mais tarde!'});
    }
    
})

router.post('/login', async (req, res) =>{

    try{
        const userInfo = req.body;

        const user = await prisma.user.findUnique({ where: {user:userInfo.user}})

        if(!user){
            return res.status(404).json({message:'Usuário não encontrado'});
        }
        if(userInfo.password === user.password){

            const token = jwt.sign({id: user.id, user: user.user}, JWT_SECRET, {expiresIn: '1d'})
            const response = {
                token: token,
                username: user.user,
                userid:user.id
            }
            res.status(200).json(response);

        } 
        else{
            res.status(400).json({message:'Senha inválida'});
        }

    }catch (err) {
        res.status(500).json({message:'Erro no servidor, tente novamente mais tarde!'+ err});
    }

})

export default router
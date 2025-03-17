import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET;



const auth = (req, res, next) =>{

    const token = req.headers.token;

    if(!token){
        return res.status(401).json({ message: "Acesso Negado!"})
    }

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        next();
    }catch(err){
        return res.status(401).json({ message: "Token Inválido"})
    }
    
}

export default auth;
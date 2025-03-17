import express from 'express';
import login from './routes/login.js';
import rooms from './routes/rooms.js';
import schedules from './routes/schedules.js'
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import auth from './middlewares/auth.js';

var cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/users', login);
app.use('/rooms', auth, rooms)
app.use('/schedules', auth, schedules)

app.listen(3000, () => console.log("Servidor iniciado!"));

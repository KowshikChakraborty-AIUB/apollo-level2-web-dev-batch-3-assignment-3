import express, { Request, Response} from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './Routes';
const app = express()

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Meeting Room Booking System')
})

export default app;
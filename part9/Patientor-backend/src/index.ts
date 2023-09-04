import express from 'express';
import cors, {CorsOptions} from 'cors';
import diagnosesRouter from './routes/diagnosesRouter';
import patientsRouter from './routes/patientsRouter';

const app = express();
//setup cors
const corsOptions: CorsOptions = {
  origin: 'http://localhost:3001', //frontend url
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: false,
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions));
app.use(express.json());
const PORT = 3000;

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import customersRoutes from './routes/client.routes';

const app = express();

app.set('port', process.env.PORT || 3000);

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use(customersRoutes);

export default app;

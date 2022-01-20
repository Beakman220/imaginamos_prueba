import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import clientsRoutes from './routes/clients.routes';
import technicalRoutes from './routes/technical.routes';
import workServiceRoutes from './routes/workService.routes';
import ticketRoutes from './routes/ticket.routes';

const app = express();

app.set('port', process.env.PORT || 3000);

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/api', clientsRoutes);
app.use('/api', technicalRoutes);
app.use('/api', workServiceRoutes);
app.use('/api', ticketRoutes);
app.get('/', (req, res) => res.send('Hola Mundo!'))


export default app;

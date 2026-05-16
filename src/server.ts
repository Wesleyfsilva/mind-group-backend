import express from 'express';
import cors from 'cors';
import router from './routes';

const app = express();

app.use(cors());
// Permite receber payloads maiores por conta da conversão das imagens em string
app.use(express.json({ limit: '10mb' })); 
app.use(router);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
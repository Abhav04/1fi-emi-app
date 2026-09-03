const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const productsRouter = require('./routes/products');

const app = express();

const allowedOrigin = process.env.FRONTEND_URL || process.env.ALLOWED_ORIGIN;

app.use(
  cors({
    origin: allowedOrigin
      ? allowedOrigin.includes(',')
        ? allowedOrigin.split(',').map((o) => o.trim())
        : allowedOrigin
      : '*',
  })
);

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/products', productsRouter);

const PORT = process.env.PORT || 5001;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT} (binding 0.0.0.0)`);
});

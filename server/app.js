require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.SERVER_PORT || 3000
const url = process.env.CLIENT_ORIGIN || 'http://localhost:8000'
const usersRouter = require('./src/users/route');

app.use(express.json());

app.use(cors({
  origin : url
}));

app.use('/users',  usersRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

app.listen(port, () => {
  console.log('Server is running on port ' + port);
}); 
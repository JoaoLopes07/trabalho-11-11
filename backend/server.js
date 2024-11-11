const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./auth.routes');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

mongoose.connect('mongodb+srv://ifsjoao1234:jv070404@cluster.f8e9q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

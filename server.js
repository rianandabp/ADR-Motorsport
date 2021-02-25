const express = require('express');

const connectDB = require('./config/db');

const app = express();

//Connect Database
connectDB();

app.use(express.json());

app.get('/', (req, res) => res.send('API Running'));

app.use('/api/items', require('./routes/api/item'));
app.use('/api/employees', require('./routes/api/employee'));
app.use('/api/projects', require('./routes/api/project'));

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
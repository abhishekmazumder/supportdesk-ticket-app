const express = require('express');
const colors = require("colors")
const dotenv = require('dotenv').config();

const connectDB = require("./config/db")
const { errorHandler } = require('./middlewares/errorMiddleware');
const userRoutes = require('./routes/userRoutes');
const ticketRoutes = require("./routes/ticketRoutes")

// connect to database
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.status(200).send({ message: 'Welcome to Support Desk API' });
});

// Routes
app.use(errorHandler);
app.use('/api/users', userRoutes);
app.use('/api/tickets', ticketRoutes);


app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`);
});

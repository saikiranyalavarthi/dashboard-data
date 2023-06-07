const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

// Create a schema for the employees collection
const employeeSchema = new mongoose.Schema({
    end_year :Number,
    intensity :Number,
    sector:String,
    topic :String,
    insight :String,
    url :String,
    region :String,
    start_year :Number,
    impact :Number,
    country:String,
    relevance:Number,
    pestle:String,
    source :String,
    title :String,
    likelihood :Number


});

// Create a model for the employees collection
const Employee = mongoose.model('Employee', employeeSchema);

// Define API routes
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    console.error('Error retrieving employees', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

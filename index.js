const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize Express
const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB using Mongoose
const uri = "mongodb+srv://divineuloko3:uloko123X@appointmentbooking.evhzw.mongodb.net/appointmentDB?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Define a schema for appointments
const appointmentSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: String,
  ponytailstyles: String,
  bunsstyles: String,
  updostyles: String
});

// Create a model for appointments
const Appointment = mongoose.model('Appointment', appointmentSchema);

// Handle form submission
app.post('/BookAppointment', (req, res) => {
  const newAppointment = new Appointment({
    name: req.body.name,
    email: req.body.email,
    date: req.body.date,
    ponytailstyles: req.body.ponytailstyles,
    bunsstyles: req.body.bunsstyles,
    updostyles: req.body.updostyles
  });

  // Save the appointment to the database
  newAppointment.save((err) => {
    if (err) {
      res.status(500).send('Failed to save appointment.');
    } else {
      res.send('Appointment booked successfully!');
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

const express = require('express');
const app = express();
const port = 4000; // You can use any port you prefer

// Custom middleware to check if it's within working hours
const workingHoursMiddleware = (req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const hour = now.getHours();

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour <= 17) {
    next(); // Continue to the next middleware or route handler
  } else {
    res.send('Sorry, the web application is only available during working hours (Monday to Friday, from 9 to 17).');
  }
};

// Apply the working hours middleware to all routes
app.use(workingHoursMiddleware);

// Set Pug as the template engine
app.set('view engine', 'pug');

// Serve static files (CSS, images, etc.)
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/our-services', (req, res) => {
  res.render('our_services');
});

app.get('/contact-us', (req, res) => {
  res.render('contact_us');
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

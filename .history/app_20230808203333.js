// app.js

const express = require('express');
const { markForJIT, jitMiddleware } = require('./nodeboost');

const app = express();

// Sample function to be marked for JIT compilation
function expensiveCalculation(input) {
  let result = 0;
  for (let i = 1; i <= input; i++) {
    result += i;
  }
  return result;
}

// Mark the function for JIT compilation
markForJIT(expensiveCalculation);

// Use the JIT middleware
app.use(jitMiddleware);

// Route that uses the JIT-compiled function
app.get('/', (req, res) => {
  const result = expensiveCalculation(1000000);
  res.send(`Result: ${result}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

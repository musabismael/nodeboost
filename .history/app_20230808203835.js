// app.js

const express = require('express');
const { markForJIT, jitMiddleware, profileFunctionExecution, getProfileData } = require('./src/nodeboost');

const app = express();

function expensiveCalculation(input) {
  let result = 0;
  for (let i = 1; i <= input; i++) {
    result += i;
  }
  return result;
}

markForJIT(expensiveCalculation);

app.use(jitMiddleware);

app.get('/', (req, res) => {
  const startTime = Date.now();
  const result = expensiveCalculation(1000000);
  const executionTime = Date.now() - startTime;
  profileFunctionExecution(expensiveCalculation, [1000000], result, executionTime);
  res.send(`Result: ${result} (Execution Time: ${executionTime}ms)`);
});

app.get('/profile', (req, res) => {
  const profileData = getProfileData();
  res.json(profileData);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

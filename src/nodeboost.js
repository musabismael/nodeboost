// nodeboost.js

const jitFunctions = new Map();
const profilingData = new Map();
let debugMode = false; // Flag to toggle debug mode

function markForJIT(func, options = {}) {
  jitFunctions.set(func, {
    compiled: false,
    original: func,
    options,
  });
}

function compileFunction(func) {
  console.log(`Compiling function: ${func.name}`);
  // Simulate JIT compilation, could be replaced with real compilation logic
  return func;
}

function jitMiddleware(req, res, next) {
  for (const [func, info] of jitFunctions) {
    if (!info.compiled) {
      const compiledFunc = compileFunction(func);
      jitFunctions.set(func, { compiled: true, compiledFunc, options: info.options });
    }
  }
  next();
}

function profileFunctionExecution(func, args, result, executionTime) {
  if (!profilingData.has(func)) {
    profilingData.set(func, {
      count: 0,
      totalExecutionTime: 0,
    });
  }
  const funcProfile = profilingData.get(func);
  funcProfile.count++;
  funcProfile.totalExecutionTime += executionTime;
}

function getProfileData() {
  return Array.from(profilingData.entries()).map(([func, profile]) => ({
    funcName: func.name,
    count: profile.count,
    avgExecutionTime: profile.totalExecutionTime / profile.count,
  }));
}

function setDebugMode(value) {
  debugMode = value;
}

function isDebugMode() {
  return debugMode;
}

module.exports = {
  markForJIT,
  jitMiddleware,
  profileFunctionExecution,
  getProfileData,
  setDebugMode,
  isDebugMode,
};

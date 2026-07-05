class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}
function divide(a, b) {
  if (b === 0) {
    throw new AppError("Cannot divide by zero", 400);
  }
  return a / b;
}

try {
  divide(10, 0);
} catch (err) {
  console.log(err.message);
  console.group(err.statusCode);
  console.log(err.isOperational);
  console.log(err instanceof AppError);
}

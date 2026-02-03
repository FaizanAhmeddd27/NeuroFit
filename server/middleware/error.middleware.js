export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  // Log to console for dev
  console.error(err);

  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = { message, statusCode: 404 };
  }

  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = { message, statusCode: 400 };
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = { message, statusCode: 400 };
  }

  // Gemini AI Quota Error
  if (err.message === 'AI_QUOTA_EXCEEDED' || (err.errorDetails && err.status === 429)) {
    error.message = 'AI_QUOTA_EXCEEDED';
    error.statusCode = 429;
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
    message: error.message || 'Server Error', // Provide both for frontend compatibility
  });
};


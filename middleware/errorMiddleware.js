const errorMiddleware = (err, req, res, next) => {
    // Log the error stack to the console
    console.error(err.stack);
  
    // Check if the error is a client error (e.g., validation error)
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      return res.status(400).json({ error: 'Invalid JSON format' });
    }
  
    // Handle other errors as server errors
    res.status(500).json({ error: 'Something went wrong!' });
  };
  
  module.exports = errorMiddleware;
  
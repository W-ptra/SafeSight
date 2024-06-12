const express = require('express');
const path = require('path');
const app = express();

// Define the port to run the server on
const PORT = 80;

// Serve static content from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

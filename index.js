const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Handle form submission
app.post('/submit', (req, res) => {
    const formData = req.body;
    const filePath = path.join(__dirname, 'responses.json');

    // Read existing data
    fs.readFile(filePath, 'utf8', (err, data) => {
        let responses = [];
        if (!err && data) {
            responses = JSON.parse(data);
        }

        // Add new response
        responses.push(formData);

        // Save updated data
        fs.writeFile(filePath, JSON.stringify(responses, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error saving data' });
            }
            res.json({ message: 'Your name was entered! Thank you!' });
        });
    });
});

// Serve the form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

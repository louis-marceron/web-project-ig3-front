const express = require('express') 
const path = require('path');
const compression = require('compression');

const PORT = process.env.PORT || 5000;
const app = express();
const publicPath = path.join(__dirname, '/'); // serves from the root folder

app.use(compression());
app.use(express.static(publicPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

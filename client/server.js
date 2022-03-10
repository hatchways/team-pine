/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const path = require('path');
app = express();
app.use(express.static('build'));
app.get('*', (req, res) => res.sendFile(path.resolve('build', 'index.html')));
const port = process.env.PORT || 80;
app.listen(port);

const express = require('express');

const app = express();
const port = 3344;

app.get('/', (request, response) => {
    return response.send("bora começar");
})

app.listen(port);
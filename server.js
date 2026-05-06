const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.')); 

// Guarda los datos en el archivo JSON
app.post('/update-results', (req, res) => {
    fs.writeFileSync('resultados.json', JSON.stringify(req.body, null, 2));
    res.send({ status: 'ok' });
});

// Lee los datos para el público
app.get('/data', (req, res) => {
    if (fs.existsSync('resultados.json')) {
        const data = fs.readFileSync('resultados.json');
        res.json(JSON.parse(data));
    } else {
        res.json({ names: [], values: [], colors: [] });
    }
});

app.listen(3000, () => console.log('Servidor activo en http://localhost:3000'));
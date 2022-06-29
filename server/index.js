const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;
const app = express()
let tasks = [
    {
        id: '1',
        name: 'Сходить в магазин'
    },
    {
        id: '2',
        name: 'Почистить зубы'
    },
    {
        id: '3',
        name: 'Провести лекцию'
    }
];

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send(tasks);
})

app.post('/', (req, res) => {
    const task = req.body;
    task.id = Math.random().toString(36).slice(2);
    tasks.push(task);

    res.send(task);
});

app.delete('/:id', (req, res) => {
    const { id } = req.params;

    tasks = tasks.filter(task => task.id !== id);

    res.send(req.params);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
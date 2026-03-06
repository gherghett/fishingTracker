const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// In-memory store
let fishes = [
  { id: 1, name: 'Pike' },
  { id: 2, name: 'Perch' },
];

let places = [
  { id: 1, name: 'Lake Vänern' },
  { id: 2, name: 'River Dalälven' },
];

let nextFishId = 3;
let nextPlaceId = 3;

// --- Fish routes ---

app.get('/api/fishes', (req, res) => {
  res.json(fishes);
});

app.post('/api/fishes', (req, res) => {
  const { name } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Name is required' });
  }
  const fish = { id: nextFishId++, name: name.trim() };
  fishes.push(fish);
  res.status(201).json(fish);
});

app.delete('/api/fishes/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = fishes.findIndex((f) => f.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Fish not found' });
  }
  fishes.splice(index, 1);
  res.status(204).end();
});

// --- Place routes ---

app.get('/api/places', (req, res) => {
  res.json(places);
});

app.post('/api/places', (req, res) => {
  const { name } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Name is required' });
  }
  const place = { id: nextPlaceId++, name: name.trim() };
  places.push(place);
  res.status(201).json(place);
});

app.delete('/api/places/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = places.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Place not found' });
  }
  places.splice(index, 1);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`ToFish backend running on http://localhost:${PORT}`);
});

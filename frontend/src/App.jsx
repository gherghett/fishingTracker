import { useState, useEffect } from 'react';
import ItemList from './components/ItemList.jsx';
import './App.css';

function App() {
  const [fishes, setFishes] = useState([]);
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);

  function showError(msg) {
    setError(msg);
    setTimeout(() => setError(null), 4000);
  }

  useEffect(() => {
    Promise.all([
      fetch('/api/fishes').then((r) => r.json()),
      fetch('/api/places').then((r) => r.json()),
    ])
      .then(([fishData, placeData]) => {
        setFishes(fishData);
        setPlaces(placeData);
      })
      .catch(() => showError('Could not load data from the server.'));
  }, []);

  async function addFish(name) {
    try {
      const res = await fetch('/api/fishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error();
      const fish = await res.json();
      setFishes((prev) => [...prev, fish]);
    } catch {
      showError('Failed to add fish. Please try again.');
    }
  }

  async function deleteFish(id) {
    try {
      const res = await fetch(`/api/fishes/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setFishes((prev) => prev.filter((f) => f.id !== id));
    } catch {
      showError('Failed to remove fish. Please try again.');
    }
  }

  async function addPlace(name) {
    try {
      const res = await fetch('/api/places', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error();
      const place = await res.json();
      setPlaces((prev) => [...prev, place]);
    } catch {
      showError('Failed to add place. Please try again.');
    }
  }

  async function deletePlace(id) {
    try {
      const res = await fetch(`/api/places/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setPlaces((prev) => prev.filter((p) => p.id !== id));
    } catch {
      showError('Failed to remove place. Please try again.');
    }
  }

  return (
    <div className="app">
      {error && <div className="error-banner" role="alert">{error}</div>}
      <header className="app-header">
        <h1>🎣 ToFish</h1>
        <p>Track the fish you want to catch and the places you want to fish.</p>
      </header>
      <main className="app-main">
        <ItemList
          title="Fish to catch"
          emoji="🐟"
          items={fishes}
          onAdd={addFish}
          onDelete={deleteFish}
          placeholder="e.g. Pike, Salmon, Trout…"
        />
        <ItemList
          title="Places to fish"
          emoji="📍"
          items={places}
          onAdd={addPlace}
          onDelete={deletePlace}
          placeholder="e.g. Lake Vänern, River Dalälven…"
        />
      </main>
    </div>
  );
}

export default App;

import { useState } from 'react';

function ItemList({ title, emoji, items, onAdd, onDelete, placeholder }) {
  const [inputValue, setInputValue] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setInputValue('');
  }

  return (
    <section className="list-card">
      <h2>
        {emoji} {title}
      </h2>
      <form className="add-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          aria-label={`Add to ${title}`}
        />
        <button type="submit">Add</button>
      </form>
      {items.length === 0 ? (
        <p className="empty-hint">Nothing here yet — add one above!</p>
      ) : (
        <ul className="item-list">
          {items.map((item) => (
            <li key={item.id} className="item-row">
              <span>{item.name}</span>
              <button
                className="delete-btn"
                onClick={() => onDelete(item.id)}
                aria-label={`Remove ${item.name}`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ItemList;

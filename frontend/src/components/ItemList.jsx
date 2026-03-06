import { useState, useRef } from 'react';

function ItemList({ title, emoji, items, onAdd, onDelete, placeholder }) {
  const [inputValue, setInputValue] = useState('');
  const [removingId, setRemovingId] = useState(null);
  const [justAddedId, setJustAddedId] = useState(null);
  const buttonRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setInputValue('');

    // Flash the button with a ripple
    if (buttonRef.current) {
      buttonRef.current.style.animation = 'ripple 0.5s ease-out';
      setTimeout(() => {
        if (buttonRef.current) buttonRef.current.style.animation = '';
      }, 500);
    }
  }

  function handleDelete(id) {
    setRemovingId(id);
    setTimeout(() => {
      onDelete(id);
      setRemovingId(null);
    }, 350);
  }

  // Track the most recently added item for a special animation
  const prevCountRef = useRef(items.length);
  if (items.length > prevCountRef.current) {
    const newest = items[items.length - 1];
    if (newest && newest.id !== justAddedId) {
      setJustAddedId(newest.id);
      setTimeout(() => setJustAddedId(null), 500);
    }
  }
  prevCountRef.current = items.length;

  return (
    <section className="list-card">
      <h2>
        <span className="card-emoji">{emoji}</span> {title}
      </h2>
      <form className="add-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          aria-label={`Add to ${title}`}
        />
        <button type="submit" ref={buttonRef}>Add</button>
      </form>
      {items.length === 0 ? (
        <p className="empty-hint">Nothing here yet — add one above!</p>
      ) : (
        <ul className="item-list">
          {items.map((item) => (
            <li
              key={item.id}
              className={
                'item-row' +
                (removingId === item.id ? ' removing' : '') +
                (justAddedId === item.id ? ' just-added' : '')
              }
            >
              <span>{item.name}</span>
              <button
                className="delete-btn"
                onClick={() => handleDelete(item.id)}
                aria-label={`Remove ${item.name}`}
                disabled={removingId === item.id}
              >
                {'\u2715'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ItemList;

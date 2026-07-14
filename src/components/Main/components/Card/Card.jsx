function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card);
  }

  return (
    <li className="places__card" onClick={handleClick}>
      <img className="places__card-image" src={card.link} alt={card.name} />
      <div className="places__card-info">
        <h2 className="places__card-title">{card.name}</h2>
        <button className="places__card-like-button" type="button"></button>
      </div>
    </li>
  );
}

export default Card;

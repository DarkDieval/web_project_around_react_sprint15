function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const isLiked = card.isLiked || false;

  const handleLikeClick = (e) => {
    e.stopPropagation();
    onCardLike(card);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onCardDelete(card);
  };

  return (
    <li className="places__card">
      <img
        className="places__card-image"
        src={card.link}
        alt={card.name}
        onClick={() => onCardClick(card)}
      />
      <div className="places__card-info">
        <h2 className="places__card-title">{card.name}</h2>
        <button
          className={`places__card-like-button ${
            isLiked ? "places__card-like-button_active" : ""
          }`}
          type="button"
          onClick={handleLikeClick}
        ></button>
      </div>
      <button
        className="places__card-delete-button"
        type="button"
        onClick={handleDeleteClick}
      ></button>
    </li>
  );
}

export default Card;

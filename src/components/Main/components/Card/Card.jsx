import { useContext } from "react";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = (card.likes || []).some(
    (like) => like._id === currentUser?._id,
  );

  // Depuración: log para ver si isLiked se actualiza
  console.log("❤️ isLiked:", isLiked, "cardId:", card._id);

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
          onClick={(e) => {
            e.stopPropagation();
            onCardLike(card);
          }}
        ></button>
      </div>
      <button
        className="places__card-delete-button"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onCardDelete(card);
        }}
      ></button>
    </li>
  );
}

export default Card;

import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Card from "./components/Card/Card";
import Popup from "./components/Popup/Popup";
import NewCard from "./components/Popup/forms/NewCard";
import EditProfile from "./components/Popup/forms/EditProfile";
import EditAvatar from "./components/Popup/forms/EditAvatar";
import api from "../../utils/api";

export default function Main() {
  const [cards, setCards] = useState([]);

  const { currentUser } = useContext(CurrentUserContext);

  const [popup, setPopup] = useState(null);

  const newCardPopup = { title: "Nuevo lugar", children: <NewCard /> };
  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile onClose={handleClosePopup} />,
  };
  const editAvatarPopup = {
    title: "Cambiar foto de perfil",
    children: <EditAvatar onClose={handleClosePopup} />,
  };

  function handleOpenPopup(popupConfig) {
    setPopup(popupConfig);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  function handleCardClick(card) {
    const imagePopup = {
      title: "",
      children: (
        <div className="popup__container_image">
          <img className="popup__image" src={card.link} alt={card.name} />
          <h2 className="popup__image-title">{card.name}</h2>
        </div>
      ),
    };
    handleOpenPopup(imagePopup);
  }

  useEffect(() => {
    api
      .getCardList()
      .then((cardData) => setCards(cardData))
      .catch((error) => console.error("Error al cargar tarjetas:", error));
  }, []);

  return (
    <main className="main">
      <div className="profile">
        <div className="profile__image-container">
          <img
            className="profile__image"
            src={currentUser?.avatar}
            alt="Foto de perfil"
          />
          <div className="profile__image-overlay">
            <button
              className="profile__image-edit-button"
              type="button"
              onClick={() => handleOpenPopup(editAvatarPopup)}
            >
              <span className="profile__image-edit-icon">&#9998;</span>
            </button>
          </div>
        </div>

        <div className="profile__info-container">
          <p className="profile__name">{currentUser?.name}</p>{" "}
          <p className="profile__job">{currentUser?.about}</p>{" "}
          <button
            className="profile__button profile__button-edit"
            type="button"
            onClick={() => handleOpenPopup(editProfilePopup)}
          >
            🖋
          </button>
        </div>

        <button
          className="profile__button profile__button-add"
          type="button"
          onClick={() => handleOpenPopup(newCardPopup)}
        >
          +
        </button>
      </div>

      <section className="places">
        <ul className="places__grid">
          {cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={handleCardClick} />
          ))}
        </ul>
      </section>

      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}

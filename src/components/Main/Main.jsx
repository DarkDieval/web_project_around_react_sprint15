import { useState } from "react";
import Popup from "./components/Popup/Popup";
import NewCard from "./components/Popup/forms/NewCard";
import EditProfile from "./components/Popup/forms/EditProfile";
import EditAvatar from "./components/Popup/forms/EditAvatar";
import Card from "./components/Card/Card";

const initialCards = [
  {
    _id: 1,
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    _id: 2,
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    _id: 3,
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    _id: 4,
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    _id: 5,
    name: "Vanois National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanois.jpg",
  },
  {
    _id: 6,
    name: "Lake Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-braies.jpg",
  },
];

export default function Main() {
  const [cards, setCards] = useState(initialCards);
  const [userData, setUserData] = useState({
    name: "Jacques Cousteau",
    about: "Explorer",
    avatar: "./images/JacquesCousteau.jpg",
  });
  const [popup, setPopup] = useState(null);

  // Definir popups
  const newCardPopup = { title: "Nuevo lugar", children: <NewCard /> };
  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };
  const editAvatarPopup = {
    title: "Cambiar foto de perfil",
    children: <EditAvatar />,
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

  return (
    <main className="main">
      <div className="profile">
        <div className="profile__image-container">
          <img
            className="profile__image"
            src={userData.avatar}
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
          <p className="profile__name">{userData.name}</p>
          <p className="profile__job">{userData.about}</p>
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

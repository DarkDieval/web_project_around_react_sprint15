import { useState, useEffect } from "react";
import { CurrentUserContext } from "./contexts/CurrentUserContext";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import api from "./utils/api";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCardList()])
      .then(([userData, cardData]) => {
        setCurrentUser(userData);
        setCards(cardData);
      })
      .catch((error) =>
        console.error("Error al cargar datos iniciales:", error),
      );
  }, []);

  const handleUpdateUser = (data) => {
    api
      .setUserInfo(data)
      .then((newUserData) => setCurrentUser(newUserData))
      .catch((error) => console.error("Error:", error));
  };

  const handleUpdateAvatar = (data) => {
    api
      .setUserAvatar(data)
      .then((newUserData) => setCurrentUser(newUserData))
      .catch((error) => console.error("Error al actualizar avatar:", error));
  };

  const handleCardLike = (card) => {
    const isLiked = (card.likes || []).some(
      (like) => like._id === currentUser?._id,
    );
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((prevCards) =>
          prevCards.map((c) => (c._id === card._id ? newCard : c)),
        );
      })
      .catch((err) => console.error("Error al dar/quitar like:", err));
  };

  const handleCardDelete = (card) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta tarjeta?")) {
      api
        .deleteCard(card._id)
        .then(() => {
          setCards((prevCards) => prevCards.filter((c) => c._id !== card._id));
        })
        .catch((err) => console.error("Error al eliminar tarjeta:", err));
    }
  };

  const handleAddCard = (newCardData) => {
    api
      .addCard(newCardData)
      .then((newCard) => {
        setCards((prevCards) => [newCard, ...prevCards]);
      })
      .catch((err) => console.error("Error al añadir tarjeta:", err));
  };

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
    >
      <div className="page">
        <Header />
        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onAddCard={handleAddCard}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

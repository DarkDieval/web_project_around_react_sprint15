import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import api from "../utils/api";

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

  useEffect(() => {
    console.log("🔄 Main - cards actualizadas:", cards);
  }, [cards]);

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
    const isLiked = card.isLiked || false;

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((prevCards) =>
          prevCards.map((c) => {
            if (c._id === card._id) {
              const updatedLikes = newCard.isLiked
                ? [...(c.likes || []), currentUser]
                : (c.likes || []).filter(
                    (like) => like._id !== currentUser._id,
                  );
              return { ...c, likes: updatedLikes, isLiked: newCard.isLiked };
            }
            return c;
          }),
        );
      })
      .catch((err) => console.error("Error al dar/quitar like:", err));
  };

  const handleAddCard = (newCardData) => {
    api
      .addCard(newCardData)
      .then((newCard) => {
        setCards((prevCards) => [newCard, ...prevCards]);
      })
      .catch((err) => console.error("Error al añadir tarjeta:", err));
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((prevCards) => prevCards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.error("Error al eliminar tarjeta:", err));
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

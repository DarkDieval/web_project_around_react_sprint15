import { useState, useEffect } from "react";
import { CurrentUserContext } from "./contexts/CurrentUserContext";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import api from "./utils/api";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => setCurrentUser(userData))
      .catch((error) => console.error("Error:", error));
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

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
    >
      <div className="page">
        <Header />
        <Main />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

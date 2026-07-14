import Popup from "../Popup";

function RemoveCard({ card, onConfirm, onClose }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(card); // Ejecuta la eliminación
    // onClose(); // Se cierra después de confirmar
  };

  return (
    <Popup onClose={onClose} title="¿Estás seguro?">
      <form className="popup__content" onSubmit={handleSubmit}>
        <p>¿Estás seguro de que quieres eliminar esta tarjeta?</p>
        <p style={{ fontSize: "14px", color: "#999", marginBottom: "20px" }}>
          Esta acción no se puede deshacer.
        </p>
        <button className="popup__button popup__button_save" type="submit">
          Sí, eliminar
        </button>
        <button
          type="button"
          onClick={onClose}
          style={{
            background: "transparent",
            border: "none",
            color: "#999",
            cursor: "pointer",
            marginTop: "10px",
            textDecoration: "underline",
          }}
        >
          Cancelar
        </button>
      </form>
    </Popup>
  );
}

export default RemoveCard;

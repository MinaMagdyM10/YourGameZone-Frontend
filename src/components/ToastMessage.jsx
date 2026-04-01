function ToastMessage({ message, type = "success" }) {
  return (
    <div
      className={`toast-message ${type}`}
      style={{
        position: "fixed",
        top: "90px",
        right: "20px",
        zIndex: 9999,
        padding: "12px 18px",
        borderRadius: "12px",
        color: "#fff",
        fontWeight: "600",
        boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        backgroundColor: type === "success" ? "#22c55e" : "#ef4444",
      }}
    >
      {message}
    </div>
  );
}

export default ToastMessage;
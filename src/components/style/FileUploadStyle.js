export let baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "50px 20px",
  borderWidth: "1px",
  borderStyle: "dashed",
  borderColor: "#eee",
  borderRadius: "10px",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out, background .24s ease-in-out",
  cursor: "pointer",
};
export let focusedStyle = {
  borderColor: "#2196f3",
};
export let dragActiveStyle = {
  borderColor: "var(--primary)",
};
export let acceptStyle = {
  borderColor: "var(--bs-success)",
  color: "var(--bs-success)",
};
export let rejectStyle = {
  borderColor: "var(--bs-danger)",
  color: "var(--bs-danger)",
};

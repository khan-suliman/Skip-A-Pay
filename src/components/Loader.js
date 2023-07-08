import Spinner from "react-bootstrap/Spinner";

// ==============================|| Loader ||============================== //

const Loader = () => (
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      background: "rgba(255,255,255,0.3)",
      height: "100%",
      width: "100%",
      display: "grid",
      placeItems: "center",
    }}
  >
    <Spinner animation="border" />
  </div>
);

export default Loader;

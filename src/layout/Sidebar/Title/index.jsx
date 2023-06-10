import config from "../../../config/config";
const Title = () => {
  return (
    <div className="title">
      <h2>{config.siteName}</h2>
    </div>
  );
};

export default Title;

import { Stack } from "react-bootstrap";
import config from "config/config";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

const Title = () => {
  return (
    <Stack direction="horizontal" className="title align-items-start">
      <span className="logo">
        <Cog6ToothIcon />
      </span>
      <span className="site-name">
        <h2>{config.siteName}</h2>
      </span>
    </Stack>
  );
};

export default Title;

import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
const NavItem = ({ item }) => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);
  const Icon = item.icon;
  const navigate = useNavigate();

  useEffect(() => {
    let currentUrl = location.pathname;
    // remove the last slash
    if (currentUrl.endsWith("/") && currentUrl.length > 1) {
      const newPath = currentUrl.slice(0, -1);
      currentUrl = newPath;
      navigate(newPath, { replace: true });
    }
    setIsActive(currentUrl === item.url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  return (
    <Link to={item.url}>
      <Stack
        direction="horizontal"
        gap={2}
        className={`sidebar-item ${isActive && "active"}`}
      >
        <span className="sidebar-icon">{<Icon />}</span>
        <span className="sidebar-title">{item.title}</span>
      </Stack>
    </Link>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
};

export default NavItem;

import menuItems from "../../../menu-items";
import NavItem from "./NavItem";

const Navigation = () => {
  let navItems = menuItems.map((item) => {
    return <NavItem item={item} key={item.id} />;
  });
  return navItems;
};
export default Navigation;

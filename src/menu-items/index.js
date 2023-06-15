import {
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
const menuItems = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: Squares2X2Icon,
    url: "/",
  },
  {
    id: "submitted-form",
    title: "Submitted Form",
    icon: DocumentDuplicateIcon,
    url: "/submitted-form",
  },
  {
    id: "settings",
    title: "Settings",
    icon: Cog6ToothIcon,
    url: "/settings",
  },
];
export default menuItems;

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "antd";
import SubMenu from "antd/es/menu/SubMenu";
import PropTypes from 'prop-types';
import "./sidebarMenu.css";

const SidebarMenu = ({ items }) => {
  const navigate = useNavigate();

  const currentPath = window.location.pathname;
  const initialSelectedKeys = [currentPath];
  const allKeys = items.reduce((keys, item) => {
    keys.push(item.key);
    if (item.children) {
      keys.push(...item.children.map((child) => child.key));
    }
    return keys;
  }, []);
  const initialOpenKeys = allKeys.filter((key) => currentPath.startsWith(key));

  const [selectedKeys, setSelectedKeys] = useState(initialSelectedKeys);
  const [openSubMenuKeys, setOpenSubMenuKeys] = useState(initialOpenKeys);

  useEffect(() => {
    const parentKeys = items.map((item) => item.key);
    setOpenSubMenuKeys([...initialOpenKeys, ...parentKeys]);
  }, []);

  const handleMenuClick = ({ key }) => {
    setSelectedKeys([key]);
    navigate(key);
  };

  const handleSubMenuOpenChange = (keys) => {
    setOpenSubMenuKeys(keys);
  };

  return (
    <Menu
      className="Menu custom-sidebar-menu"
      style={{ fontWeight: "500" }}
      onClick={handleMenuClick}
      selectedKeys={selectedKeys}
      openKeys={openSubMenuKeys}
      onOpenChange={handleSubMenuOpenChange}
      mode="inline"
    >
      {items.map((item) =>
        item.children ? (
          <SubMenu key={item.key} icon={item.icon} title={item.label}>
            {item.children.map((child) => (
              <Menu.Item key={child.key}>
                <Link to={child.key}>{child.label}</Link>
              </Menu.Item>
            ))}
          </SubMenu>
        ) : (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>{item.label}</Link>
          </Menu.Item>
        )
      )}
    </Menu>
  );
};

SidebarMenu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      children: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
};

export default SidebarMenu;

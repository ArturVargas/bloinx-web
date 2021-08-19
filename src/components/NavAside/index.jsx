/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Menu, Layout, Drawer } from "antd";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import {
  // DesktopOutlined,
  HomeFilled,
  // FileOutlined,
} from "@ant-design/icons";

import styles from "./styles.module.scss";
import logo from "../../assets/logo.svg";
import icon from "../../assets/icon.png";

const { Sider } = Layout;

export default function NavAside({ width, toggleDrawer, visible }) {
  const [sliderStatus, setSliderStatus] = useState(false);
  const isTablet = width <= 800;
  const isMobile = width <= 768;

  useEffect(() => {
    if (isTablet && !sliderStatus) {
      setSliderStatus(true);
    }
    if (!isMobile) {
      toggleDrawer();
    }
  }, [width]);

  const selected = 1;

  const MenuOptions = () => (
    <Menu
      className={styles.MenuOptions}
      defaultSelectedKeys={["1"]}
      mode="inline"
    >
      {!isMobile && (
        <div className={classnames(styles.logo, sliderStatus && styles.icon)}>
          <img src={sliderStatus ? icon : logo} alt="bloinx-logo" />
        </div>
      )}
      <Menu.Item
        className={classnames(
          styles.MenuItem,
          selected === 1 && styles.MenuItemSelected
        )}
        key={1}
        icon={<HomeFilled />}
        onClick={toggleDrawer}
      >
        <Link to="/dashboard">
          <span>
            <FormattedMessage id="navAside.dashboard" />
          </span>
        </Link>
      </Menu.Item>
      {/* <Menu.Item
        className={classnames(
          styles.MenuItem,
          selected === 2 && styles.MenuItemSelected,
        )}
        key={2}
        icon={<DesktopOutlined />}
        onClick={toggleDrawer}
      >
        <Link to="/CreateBatch">
          <span>
            <FormattedMessage id="navAside.createbatch" />
          </span>
        </Link>
      </Menu.Item> */}
      {/* <Menu.Item
        className={classnames(
          styles.MenuItem,
          selected === 3 && styles.MenuItemSelected,
        )}
        key={3}
        icon={<FileOutlined />}
        onClick={toggleDrawer}
      >
        <Link to="/degisterPay">
          <span>
            <FormattedMessage id="navAside.registerpay" />
          </span>
        </Link>
      </Menu.Item> */}
      {/* <Menu.Item
        className={classnames(
          styles.MenuItem,
          selected === 4 && styles.MenuItemSelected,
        )}
        key={4}
        icon={<FileOutlined />}
        onClick={toggleDrawer}
      >
        <Link to="/BatchDetails">
          <span>
            <FormattedMessage id="navAside.batchDetails" />
          </span>
        </Link>
      </Menu.Item> */}
    </Menu>
  );

  return (
    <>
      {!isMobile && (
        <Sider
          collapsible={!isTablet}
          collapsed={sliderStatus}
          onCollapse={setSliderStatus}
          className={styles.NavAside}
        >
          <MenuOptions />
        </Sider>
      )}
      {isMobile && (
        <Drawer
          title={
            <div className={styles.logoMobile}>
              <img src={logo} alt="bloinx-logo" />
            </div>
          }
          placement="left"
          closable
          onClose={toggleDrawer}
          visible={visible}
          bodyStyle={{
            padding: 0,
          }}
          drawerStyle={{
            backgroundColor: "#2B2D33",
          }}
          headerStyle={{
            backgroundColor: "#2B2D33",
            borderBottom: "0px",
            color: "white",
            padding: "0px",
          }}
        >
          <MenuOptions />
        </Drawer>
      )}
    </>
  );
}

NavAside.propTypes = {
  visible: PropTypes.bool,
  width: PropTypes.number.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};

NavAside.defaultProps = {
  visible: false,
};
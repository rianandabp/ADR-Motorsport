import { AppBar, Toolbar, Typography, makeStyles, Button } from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";



const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "#000000",
    paddingRight: "79px",
    paddingLeft: "10px",
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 700,
    color: "#FFFEFE",
    textAlign: "left",
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
 },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const headersData = [
  {
    label: "Project",
    href: "/project",
  },
  {
    label: "Item",
    href: "/item",
  },
  {
    label: "Employee",
    href: "/employee",
  },
];

export default function Header() {

  const {header, logo, menuButton} = useStyles();

  const displayDesktop = () => {
    return (
      <Toolbar className={window.toolbar}>
        {adrMotorsportLogo}
        <div> {getMenuButtons()} </div>
      </Toolbar>
    );
  };

  const adrMotorsportLogo = (
    <Typography variant="h6" component="h1" className={logo}>
      ADR Motorsport
    </Typography>
  );
  
  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
            className: menuButton
          }}
        >
          {label}
        </Button>
      );
    });
  };
  

  return (
    <header>
      <AppBar className={header}>{displayDesktop()}</AppBar>
    </header>
  );
}
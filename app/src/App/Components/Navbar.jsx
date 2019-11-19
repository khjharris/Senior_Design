import React, { useState, useEffect } from 'react';
import {compose} from 'recompose'
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Badge from '@material-ui/core/Badge'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {Menu as MenuIcon, AccountCircleOutlined} from '@material-ui/icons';
import {Home} from '@material-ui/icons'
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import {Drawer, List, Divider, ListItem, ListItemIcon, ListItemText} from '@material-ui/core' // left Drawer
import {withRouter} from 'react-router-dom';
import {useUser} from '../Authentication/user-context'
import {useAuth} from '../Authentication/auth-context'

import '../stylesheets/Navbar.css'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffffff"
      // main: "#2ead76"
    }
  }
})

const useStyles = makeStyles(theme => ({
  // App Menu & Drawer
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer'
  },
  menuWidth: {
    width: '100%'
  },
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  },
  logo: {
    maxWidth: 160
  }
}));

function Navbar(props) {
  const classes = useStyles();

  // Used to logout and authenticate a user
  const {logout, authenticate} = useAuth()
  const userObj = useUser().user;
  console.log("user obj", userObj);

  const [drawerState, setDrawerState] = useState(false); // menu: open or closed

  console.log("props", props);
  return (
    // Navbar id MUST BE navbarTop so it can be hidden throughout the application (if needed)
    <div className={classes.root} id="navbarTop">
      <ThemeProvider theme={theme}>
      <Drawer open={drawerState} onClose={() => setDrawerState(false)}>{renderDrawerItems()}</Drawer>
      <AppBar color="primary" position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" onClick={() => setDrawerState(!drawerState)} aria-label="menu">
            <MenuIcon />
          </IconButton>

          <Typography onClick={() => {props.history.push("/")}} variant="h6" className={classes.title}>
            {/* Swim Logo */}
            <img style={{maxHeight: 80}} src={process.env.PUBLIC_URL + '/images/logo-blue-2.png'} alt="Swim Logo" className={classes.logo} />
          </Typography>


          {renderRightIcons()}

        </Toolbar>
      </AppBar>
      </ThemeProvider>

    </div>
  )

  // Icons rendered on the right side of the navbar
  function renderRightIcons() {

    if (userObj.isAuth) {
      // if user is authenticated render authenticated icons
      return (
        <div>
          {/* Profile Icon */}
          <IconButton
            color="inherit"
            onClick={() => {props.history.push('/profile')}}
          >
            <AccountCircleOutlined />
          </IconButton>

          {/* Logout Button */}
          <Button onClick={logout} color="inherit">LOGOUT</Button>
        </div>
      )
    }
    else {
      // render NON authenticated icons
      return (
        <div>
          {/* LOGIN or SIGNUP */}
          <Button onClick={() => authenticate(props.history.location.pathname)} color="inherit">LOGIN/SIGNUP</Button>
        </div>
      )
    }
  }


  function renderDrawerItems() {
    let topList;
    let bottomList;
    if (userObj.isAuth) {
      topList = authDrawerList().topItems;
      bottomList = authDrawerList().bottomItems;
    }
    else {
      topList = nonAuthDrawerList().topItems;
      bottomList = nonAuthDrawerList().bottomItems;
    }

    console.log("top list", topList);
    console.log("bottom list", bottomList);

    return (
      <div
      className={classes.list}
      role="presentation"
    >
      <List>
        {topList.map((item, index) => (
          <ListItem button key={item.title} onClick={() => {props.history.push(item.link); setDrawerState(false)} }>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
          // <ListItem button key={item.title}>
          //   <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
          //   <ListItemText onClick={() => {window.location.href = item.link}} primary={item.title} />
          // </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {bottomList.map((item, index) => (
          <ListItem onClick={() => item.onClick()} button key={item.title}>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
    </div>
    )
  }

  // List of items for the Drawer Menu - AUTHENTICATED USERS
  function authDrawerList() {
    // Must be Fab Buttons with the onclick function set up
    let topItems = [
      {
        title: "Home",
        link: "/",
        icon: <Home />,
      },
      {
        title: "Profile",
        link: "/profile",
        icon: <AccountCircle />,
      },
    ]

    // Must be clickable buttons
    let bottomItems = [
      {
        title: "Logout",
        onClick: function() {
          logout()
        },
        button: <Button color="inherit">LOGOUT</Button>

      }
    ]

    return {
      topItems,
      bottomItems
    }
  }

  // list of items for the Drawer Menu - NON Authenticated users
  function nonAuthDrawerList() {
    // Must be links with icons, may change to being only buttons with links
    // Must be Fab Buttons with the onclick function set up
    let topItems = [
      {
        title: "Home",
        link: "/",
        icon: <Home />,
      },
    ]

    // Must be clickable buttons
    let bottomItems = [
      {
        title: "Login",
        onClick: function() {
          authenticate(props.history.location.pathname)
        },
        button: <Button color="inherit">LOGIN</Button>

      }
    ]

    return {
      topItems,
      bottomItems
    }
  }
}

export default withRouter(Navbar);
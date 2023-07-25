import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { useNavigate } from "react-router-dom";

const pages = [
  { title: "Home", link: "/" },
  { title: "Registration", link: "/registration" },
  { title: "Validation", link: "/validation" },
  // { title: "Missing", link: "/missing" },
];
const settings = ["Profile", "Account", "Logout"];
const LOGO = "Pangea";

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    navigate(page.link, { replace: true });
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="100vw" sx={{ backgroundColor: "#285c7e" }}>
        <Toolbar
          disableGutters
          sx={{
            zIndex: 1,
          }}
        >
          <PersonSearchIcon
            sx={{
              display: { xs: "none", md: "flex", cursor: "pointer" },
              mr: 1,
            }}
            onClick={() => {
              navigate("/", { replace: true });
            }}
          />
          {/* <Box
            component="img"
            sx={{
              display: { xs: "none", md: "block" },
              mr: 1,
              width: 64,
              height: 42,
              cursor: "pointer",
            }}
            alt="logo"
            src={process.env.PUBLIC_URL + "./logo192.png"}
            onClick={() => {
              navigate("/", { replace: true });
            }}
          /> */}
          {/* <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {LOGO}
          </Typography> */}

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.title}
                  onClick={() => handleCloseNavMenu(page)}
                >
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <PersonSearchIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          /> */}
          {/* <div
            style={{
              width: "-webkit-fill-available",
              textAlign: "-webkit-center",
            }}
          >
            <Box
              component="img"
              sx={{
                display: { xs: "flex", md: "none" },
                mr: 1,
                width: 64,
                height: 42,
              }}
              alt="logo"
              src={process.env.PUBLIC_URL + "./logo192.png"}
            />
          </div> */}
          {/* <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {LOGO}
          </Typography> */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                onClick={() => handleCloseNavMenu(page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* <Avatar
                  alt="Simon Polishuk"
                  src="/static/images/avatar/2.jpg"
                /> */}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

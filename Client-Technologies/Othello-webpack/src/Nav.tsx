import { AppBar, Avatar, Box, Button, ButtonGroup, Divider, FormControlLabel, IconButton, ListItemText, Menu, MenuItem, Switch, Toolbar, Tooltip, Typography, useTheme } from "@mui/material";
import React, { FC, useState } from "react";
import Brightness1OutlinedIcon from '@mui/icons-material/Brightness1Outlined';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import Login from "./Login";

interface NavProps { 
  auth: boolean,
  onPlay: () => void, 
  onHome: () => void,
  onLogin: () => void,
  onLogout: () => void
}

const Nav: FC<NavProps> = ({ auth, onPlay, onHome, onLogin, onLogout }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  }

  return (
    <AppBar>
      <Toolbar sx={{ minHeight: '56px !important' }}>
        { auth && (
          <div
            style={{
              height: '100%',
              overflow: 'hidden'
            }}
          >
            <Button 
              variant="contained" 
              component="a"
              disableElevation 
              sx={{
                mr: 1.5,
                my: -1.5,
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                fontFamily: 'monospace',
                fontWeight: 700,
                fontSize: 22,
              }}
              onClick={onPlay}
            >
              Play
            </Button>
          </div>
        ) }
        <Button
          variant="contained"
          component="a"
          disableElevation
          onClick={onHome}
        >
          <Brightness1OutlinedIcon sx={{ display: { xs: 'none', md: 'flex' } }} />
          <Brightness2Icon sx={{ display: { xs: 'none', md: 'flex' }, ml: -1.5 }} />
          <Typography
            variant="h5"
            noWrap
            sx={{
              ml: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            OTHELLO
          </Typography>
          <Typography
            component={'sup'}
          >
            WORLD
          </Typography>
        </Button>

        <div style={{ flexGrow: 1, display: 'flex' }}>
          {/* {pages.map((page) => (
            <Button
              key={page}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {page}
            </Button>
          ))} */}
        </div>
        <div style={{ flexGrow: 0 }}>
          { auth ? (
            <>
              <Tooltip title="Open settings">
                <IconButton 
                  onClick={handleOpenUserMenu} 
                  sx={{ p: 0 }}
                >
                  <Avatar alt="Remy Sharp" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem>
                  <ListItemText
                  >
                    <FormControlLabel 
                      control={<Switch defaultChecked={theme.palette.mode === 'dark'} />} 
                      label="Dark Mode" />
                  </ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText
                  >
                    My Profile
                  </ListItemText>
                </MenuItem>
                <Divider/>
                <MenuItem>
                  <ListItemText
                    onClick={onLogout}
                  >
                    Logout
                  </ListItemText>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <ButtonGroup 
              variant="contained" 
              aria-label="medium secondary button group"
              disableElevation
            >
              <Login onLogin={onLogin}/>
              <Button
                component='a'
              >
                Register
              </Button>
            </ButtonGroup>
          ) }
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Nav;
import { Button, List, ListItem, Menu, MenuItem, Popover, TextField, useTheme } from '@mui/material';
import { pink } from '@mui/material/colors';
import { FC, useState } from 'react';

const Login: FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenLoginMenu = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleCloseLogoutMenu = () => {
    setAnchorEl(null);
  }

  return (
    <>
      <Button
        component='a'
        onClick={handleOpenLoginMenu}
      >
        Login
      </Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseLogoutMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <List
          // sx={{
          //   backgroundColor: pink[400]
          // }}        
        >
          <ListItem
            sx={{
              pb: 0
            }}
          >
            <TextField 
              variant='filled'
              size='small'
              label='username or e-mail'
              InputProps={{
                sx: {
                  '::before, :hover:not(.Mui-disabled)::before': {
                    borderBottom: 'none',
                  },
                  '::after': {
                    bottom: -2,
                    zIndex: 999
                  }
                }
              }}/>
          </ListItem>
          <ListItem
            sx={{
              pt: 0
            }}
          >
            <TextField
              variant='filled'
              size='small'
              InputProps={{
                sx: {
                  borderRadius: '0 0 4px 4px',
                  '::before': {
                    top: 0,
                    borderTop: '1px solid #ffffffb3',
                    borderBottom: 'none'
                  },
                  '::after': {
                    top: 0,
                    borderTop: `2px solid ${pink[400]}`,
                    borderBottom: 'none'
                  },
                  ':hover:not(.Mui-disabled)::before': {
                    top: 0,
                    borderBottom: 'none',
                    borderTop: '1px solid #ffffffb3'
                  }
                }
              }}
              label='password'/>
          </ListItem>
          <ListItem>
            <Button
              size='small'
              onClick={onLogin}>
              Log in
            </Button>
          </ListItem>
        </List>
      </Popover>
    </>
  );
}

export default Login;
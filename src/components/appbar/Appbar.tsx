import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Badge, MenuItem } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import useCartStore from '../../store/cart-store.ts';

export default function Appbar() {

  const items  = useCartStore(state => state.items)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <MenuItem>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={items.length} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
          </MenuItem>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
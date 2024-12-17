import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Badge, Button, MenuItem } from '@mui/material';
import useCartStore from '../../store/cart-store.ts';
import { Link } from 'react-router';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Appbar() {

  const items = useCartStore(state => state.items)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" >
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Link to={"/"}>
              <Button
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Productos
              </Button>
              </Link>
          </Box>
          <MenuItem>
            <Link to={"/cart"}>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={items.length} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Link>
          </MenuItem>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
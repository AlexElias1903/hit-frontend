import type { FC } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Box, Toolbar } from '@material-ui/core';
import { experimentalStyled } from '@material-ui/core/styles';
import type { AppBarProps } from '@material-ui/core';
import ContaPopup from './ContaPopup';

interface NavbarProps extends AppBarProps {
  onSidebarMobileOpen?: () => void;
}

const NavbarRoot = experimentalStyled(AppBar)(
  ({ theme }) => (
    {
      ...(
        theme.palette.mode === 'light' && {
          backgroundColor: theme.palette.primary.main,
          boxShadow: 'none',
          color: theme.palette.primary.contrastText
        }
      ),
      ...(
        theme.palette.mode === 'dark' && {
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.divider}`,
          boxShadow: 'none'
        }
      ),
      zIndex: theme.zIndex.drawer + 100
    }
  )
);

const Navbar: FC<NavbarProps> = (props) => {
  const { onSidebarMobileOpen, ...other } = props;

  return (
    <NavbarRoot {...other}>
      <Toolbar sx={{ minHeight: 64 }}>
        <Box
          sx={{
            flexGrow: 1,
            ml: 2
          }}
        />
        <Box sx={{ ml: 2 }}>
          <ContaPopup />
        </Box>
      </Toolbar>
    </NavbarRoot>
  );
};

Navbar.propTypes = {
  onSidebarMobileOpen: PropTypes.func
};

export default Navbar;

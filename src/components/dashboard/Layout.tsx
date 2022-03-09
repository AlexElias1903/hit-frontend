import type { FC, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { experimentalStyled } from '@material-ui/core/styles';
import Navbar from './Navbar';

interface DashboardLayoutProps {
  children?: ReactNode;
}

const DashboardLayoutRoot = experimentalStyled('div')(
  ({ theme }) => (
    {
      backgroundColor: theme.palette.background.default,
      display: 'flex',
      height: '100%',
      overflow: 'hidden',
      width: '100%'
    }
  )
);

const DashboardLayoutContainer = experimentalStyled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
});

const DashboardLayoutContent = experimentalStyled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto',
  position: 'relative',
  WebkitOverflowScrolling: 'touch'
});

const Layout: FC<DashboardLayoutProps> = () => {

  return (
    <DashboardLayoutRoot>
      <Navbar/>
      <>
        <DashboardLayoutContainer>
          <DashboardLayoutContent>
            <Outlet />
          </DashboardLayoutContent>
        </DashboardLayoutContainer>
      </>
    </DashboardLayoutRoot>
  );
};

export default Layout;

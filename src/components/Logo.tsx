import type { FC } from 'react';
import type { Theme } from '@material-ui/core';
import type { SxProps } from '@material-ui/system';

interface LogoProps {
  sx?: SxProps<Theme>;
}

const Logo: FC<LogoProps> = (props) => (
  <img
    alt="Logo"
    src={`${process.env.PUBLIC_URL}/static/logo.svg`}
    {...props}
  />
);

export default Logo;

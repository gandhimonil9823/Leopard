// @flow
import React from 'react';
import Styled from 'styled-components';
import BrandingLogo from '../../images/logo.svg';

const LogoWrapper = Styled.div`
  text-align: left;
  // border: 1px black solid;
  flex-basis: 25%;
`;

const Logo = () => (
  <LogoWrapper>
    <a href="/" className="logo">
      <BrandingLogo />
    </a>
  </LogoWrapper>
);

export default Logo;

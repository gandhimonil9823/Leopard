// @flow
import React from 'react';
import Styled from 'styled-components';

const FooterWrapper = Styled.div`
   .footer {
     margin-top: 50px;
   }
`;

const Footer = () => (
  <FooterWrapper>
    <footer className="footer text-center">
      <div className="container">
        <span className="text-muted tertiaryBgColor text-bottom">
          © 2018 Xenio Systems
        </span>
      </div>
    </footer>
  </FooterWrapper>
);

export default Footer;

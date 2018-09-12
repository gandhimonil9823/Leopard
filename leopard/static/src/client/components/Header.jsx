// @flow
import React, { Component } from 'react';
import Styled from 'styled-components';

import Logo from '../components/common/Logo';
import Name from '../components/common/Name';
import Logout from '../components/common/Logout';

// custom header css.
const HeaderWrapper = Styled.div`
    height: 65px;
    margin: 0px;

    .navbar {
        display: flex;
        align-items: center;
        background-color: #fff;
        height: inherit;
        padding-left: 50px;
        padding-right: 50px;
        // border: 1px green solid;
        border-bottom: 1px solid #e7e7e7;

        > div {				
            // flex-basis: 100%;
        }
    }
`;

class Header extends Component {
  render() {
    return (
      <HeaderWrapper>
        <div className="navbar navbar-default navbar-fixed-top">
          <Logo />
          <Name />
          <Logout />
        </div>
      </HeaderWrapper>
    );
  }
}

export default Header;

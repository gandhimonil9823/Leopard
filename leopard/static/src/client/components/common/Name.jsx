// @flow
import React, { Component } from 'react';
import Styled from 'styled-components';

const NameWrapper = Styled.div`
  text-align: center;
  flex-basis: 50%;
`;

const AppName = Styled.h2`
    margin: 0;
    margin-top: 2px;
  font-size: 22px;
`;

class Name extends Component {
  render() {
    return (
      <NameWrapper>
        <AppName>Data Visualization</AppName>
      </NameWrapper>
    );
  }
}

export default Name;

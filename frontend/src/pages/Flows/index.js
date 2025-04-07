import React from 'react';
import MainContainer from '../../components/MainContainer';
import MainHeader from '../../components/MainHeader';
import Title from '../../components/Title';
import { i18n } from '../../translate/i18n';
import FlowBuilder from '../../components/FlowBuilder';

const Flows = () => {
  return (
    <MainContainer>
      <MainHeader>
        <Title>Flow Builder</Title>
      </MainHeader>
      <FlowBuilder />
    </MainContainer>
  );
};

export default Flows;
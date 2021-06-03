import React from 'react'
import styled from "styled-components/native";

const MainView = styled.View`
  align-items: center;
`

const ChistLogo = styled.Image`
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
`

const StyledSubheading = styled.Text`
  font-size: 32px;
  margin-top: 16px;
  
`

interface CompanyHeaderProps {
  subheading?: string;
}

const CompanyHeader = ({ subheading }: CompanyHeaderProps) => {
  return (
    <MainView>
      <ChistLogo source={{ uri: 'https://i.imgur.com/FeuUYsF.png' }} />
      { subheading ? <StyledSubheading>{subheading}</StyledSubheading> : null }
    </MainView>
  )
}

CompanyHeader.defaultProps = {
  subheading: '',
}

export default CompanyHeader

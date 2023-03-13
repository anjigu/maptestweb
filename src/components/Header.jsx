import React from 'react';
import styled from "styled-components";
const Header = props => {
  return (
    <Layout>

      <img src={require("../assets/logo.png")} width={50} height={50} />
      <TitleText>Shinstarr Simulation Map</TitleText>
    </Layout>
  );
};


export default Header;

const Layout = styled.div`
  width:100%;
  height:50px;
  background:rgba(223,32,45);
  display:flex;
`

const TitleText = styled.div`
font-size:16px;
font-weight:bold;
display:flex;
align-items:center;
margin-left:10px;
color: white;
`
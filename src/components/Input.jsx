import React from 'react';
import styled from 'styled-components';
const Input = (props) => {
  return (
    <Layout>
      <InputEl placeholder={props?.placeHolder} />
    </Layout>
  );
};

export default Input;

const Layout = styled.div`

width:100%;
  max-width:200px;
  border:1px solid black;
  border-radius:5px;
  background-color:white;
  position:relative;
  overflow:hidden;
  margin-left:10px;
  margin-right:10px;
`

const InputEl = styled.input`
  width:100%;
  height:100%;
  border:none;
  outline:none;
  padding-left:6px;
  padding-right:6px;
`
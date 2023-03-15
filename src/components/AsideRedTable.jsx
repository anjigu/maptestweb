import React, { useState } from 'react';
import styled from 'styled-components';
import Main from '../pages/Main';
import Aside from './Aside';


const AsideRedTable = (props) => {
    const {redTableOrders} = props;

    const tables = [...Array(15).keys()].map((el,idx) => (
        <TableBody key={idx}>
          <Row>
            <Cell>{idx + 1}</Cell>
            <Cell>{redTableOrders ? redTableOrders[idx]?.ordered_time : null}</Cell> 
            <Cell>{redTableOrders ? redTableOrders[idx]?.pickup_time : null}</Cell>
            <Cell>{redTableOrders ? redTableOrders[idx]?.delivery_time : null}</Cell>
            <Cell>{redTableOrders ? redTableOrders[idx]?.waiting_time : null}</Cell>
          </Row>
        </TableBody>
    ));
    return <div>{tables}</div>;
  }
  

export default AsideRedTable;


const Row = styled.div`
  display:flex;
`
const TableBody = styled.div`
  background-color:white;
  .BlueTruck {
  background: rgb(0,142,228);
  color: white;
}
.OrangeTruck {
  background: rgb(252,111,27);
  color: white;
}
.RedTruck {
  background: rgb(218,60,44);
  color: white;
}
`

const Cell = styled.div`
  width:100%;
  height:auto;
  display:flex;
  justify-content:Center;
  align-items:Center;
  border-right:1px solid rgb(128,128,128,0.2);
  border-left:1px solid rgb(128,128,128,0.2);
  border-bottom:1px solid rgb(128,128,128,0.2);
  padding: 5px;
`
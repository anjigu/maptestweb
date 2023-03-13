import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import DropDown from './DropDown';


const Aside = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [detailResultItem, setDetailResultItem] = useState(1)
  const [disabled, setDisabled] = useState(false);

  

  useEffect(() => {
    console.log('props가 뭔데',props)
    console.log('props.List가 뭔데',props.List)
    console.log(props.data, "data")
  }, [props])

  return (
    <Layout> 
      <Nav>
          <DropDown
          q={props?.q}
          icon={true}
          menuType="set"
          menuData2={props?.List?.setList}
          setQ={props?.setQ}
         >
         {props?.data?.map((x)=>x.set_num)}
      </DropDown>
  
      
        <Button
          width={350}
          disabled={isLoading}
          onClick={props.submit}
        >
          {isLoading ? '세부결과 확인중 ...' : '세부결과 확인'}
          {/* {'세부결과 확인'} */}
        </Button>
      </Nav>

      {props?.data?.map((item) => {
        return (
          <Table>
            <TableHeader>
              <Cell>Set Data.</Cell>
              <Cell>{item?.set_num}</Cell>
            </TableHeader>
            {/*표2 데이터 값*/}
            <TableBody>
              <Row>
                <Cell>배달 시작 시간</Cell>
                <Cell>{item?.set_start_time}</Cell>
              </Row>

              <Row>
                <Cell>배달 종료 시간</Cell>
                <Cell>{item?.set_end_time}</Cell>

              </Row>

              <Row>
                <Cell>총 배달 주문량</Cell>
                <Cell>{item?.delivery_total_count}건</Cell>

              </Row>

              <Row>
                <Cell>총 배달 소요 시간</Cell>
                <Cell>{item?.delivery_total_time}분</Cell>

              </Row>
            </TableBody>
          </Table>
        )
      })}
    </Layout>
  );
};

Aside.propTypes = {

};

export default Aside;

const Layout = styled.div`
  width:100%;
  min-width:400px;
  max-width:400px;
  height:100%;
  background-color: whitesmoke;
  border-left: 1px solid gray;
  padding:10px;
`

const Nav = styled.div`
  display:flex;
  height:40px;
`


const Table = styled.div`
width:100%;
height:auto;
border:1px solid rgb(128,128,128,0.4);
margin-top: 30px;
margin-bottom: 50px;
`

const TableHeader = styled.div`
font-weight: bold;
width:100%;
height:30px;
background: rgb(128,128,128,0.2);
display:flex;
  border-top:1px solid rgb(128,128,128,0.2);
  border-bottom:1px solid rgb(128,128,128,0.2);
`

const TableBody = styled.div`
  background-color:white;
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

const Row = styled.div`
  display:flex;
  
  
`


import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import DropDown from './DropDown';
import AsideBlueTable from './AsideBlueTable';
import AsideOrangeTable from './AsideOrangeTable';
import AsideRedTable from './AsideRedTable';



const Aside = props => {
  const {locations, pertruck} = props;
  const [detailResultItem, setDetailResultItem] = useState(1)
  const [idx, setIdx] = useState(0);
  const blueTableOrders = locations?.filter(el => {return el.truck_num === 1234}) ;
  const orangeTableOrders = locations?.filter(el => {return el.truck_num === 2345});
  const redTableOrders = locations?.filter(el => {return el.truck_num === 3456})
  const blueTruckData = pertruck?.[0]
  const orangeTruckData = pertruck?.[1]
  const redTruckData = pertruck?.[2]
  

  useEffect(() => {
    console.log('props가 뭔데',props)
    console.log('props.List가 뭔데',props.List)
    console.log(props.data, "data")
  }, [props])
  console.log("props.submit 확인",props.submit)

  return (
    <Layout> 
      <div style={{ height: '1580px', overflowY: 'scroll', overflowX: 'hidden' }}>
      <Nav>
        <DropDown
          q={props?.q}
          icon={true}
          menuType="set"
          menuData2={props?.List}
          setQ={props?.setQ}
          setIdx={setIdx}
         >
         {props?.List?.[idx]}
         {/* <span style={{ color: setIdx === setIdx ? "red" : "black" }}>{props?.List?.[idx]}</span> */}
       </DropDown>
  
    
        <Button
          width={350}
          disabled={props.isLoading}
          onClick={props.submit}
          type="submit"
        >

          {props.isLoading ? '세부결과 확인중 ...' : '세부결과 확인'}
          {/* {'세부결과 확인'} */}
        </Button>
      </Nav>
      {props?.data?.map((item) => {
        return (
          //set data
          <>
          <Table className='Total'>
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
          </>
        )
      })}
        <>
          <Table className='BlueTruck'>
          <TableHeader >
          <Cell className='BlueTruck'>TRUCK 1 - AVERAGE DATA.</Cell>
          </TableHeader>
          <TableBody>
          <Row>
                <Cell>배달 갯수</Cell>
                <Cell>{blueTruckData?.order_count}건</Cell>
              </Row>
              <Row>
                <Cell>배달 소요 시간</Cell>
                <Cell>{blueTruckData?.sum_delivery_time}분</Cell>
              </Row>
              <Row>
                <Cell>주문 소요 시간 평균</Cell>
                <Cell>{blueTruckData?.avg_delivery_time}분</Cell>
              </Row>
              <Row>
                <Cell>가장 긴 대기 시간</Cell>
                <Cell>{blueTruckData?.max_waiting_time}분</Cell>
              </Row>
              <Row>
                <Cell>가장 긴 배달 시간</Cell>
                <Cell>{blueTruckData?.max_delivery_time}분</Cell>
              </Row>
              <Row>
                <Cell>가장 짧은 배달 시간</Cell>
                <Cell>{blueTruckData?.min_delivery_time}</Cell>
              </Row>
          </TableBody>
          </Table>
          <Table className='OrangeTruck'>
          <TableHeader >
          <Cell className='OrangeTruck'>TRUCK 2 - AVERAGE DATA.</Cell>
          </TableHeader>
          <TableBody>
          <Row>
                <Cell>배달 갯수</Cell>
                <Cell>{orangeTruckData?.order_count}건</Cell>
              </Row>
              <Row>
                <Cell>배달 소요 시간</Cell>
                <Cell>{orangeTruckData?.sum_delivery_time}분</Cell>
              </Row>
              <Row>
                <Cell>주문 소요 시간 평균</Cell>
                <Cell>{orangeTruckData?.avg_delivery_time}분</Cell>
              </Row>
              <Row>
                <Cell>가장 긴 대기 시간</Cell>
                <Cell>{orangeTruckData?.max_waiting_time}분</Cell>
              </Row>
              <Row>
                <Cell>가장 긴 배달 시간</Cell>
                <Cell>{orangeTruckData?.max_delivery_time}분</Cell>
              </Row>
              <Row>
                <Cell>가장 짧은 배달 시간</Cell>
                <Cell>{orangeTruckData?.min_delivery_time}분</Cell>
              </Row>
          </TableBody>
          </Table>
          <Table className='RedTruck'>
          <TableHeader >
          <Cell className='RedTruck'>TRUCK 3 - AVERAGE DATA.</Cell>
          </TableHeader>
          <TableBody>
          <Row>
                <Cell>배달 갯수</Cell>
                <Cell>{redTruckData?.order_count}건</Cell>
              </Row>
              <Row>
                <Cell>배달 소요 시간</Cell>
                <Cell>{redTruckData?.sum_delivery_time}분</Cell>
              </Row>
              <Row>
                <Cell>주문 소요 시간 평균</Cell>
                <Cell>{redTruckData?.avg_delivery_time}분</Cell>
              </Row>
              <Row>
                <Cell>가장 긴 대기 시간</Cell>
                <Cell>{redTruckData?.max_waiting_time}분</Cell>
              </Row>
              <Row>
                <Cell>가장 긴 배달 시간</Cell>
                <Cell>{redTruckData?.max_delivery_time}분</Cell>
              </Row>
              <Row>
                <Cell>가장 짧은 배달 시간</Cell>
                <Cell>{redTruckData?.min_delivery_time}분</Cell>
              </Row>
          </TableBody>
          </Table>
        </>
            <>
            <Table className='BlueTruck'>
            <TableHeader >
            <Cell className='BlueTruck'>TRUCK 1 - DATA.</Cell>
            </TableHeader>
            <TableBody>
            <Row>
              <Cell className='BlueTruck'>No.</Cell>
              <Cell className='BlueTruck'>주문 시간</Cell>
              <Cell className='BlueTruck'>배달 완료 시간</Cell>
              <Cell className='BlueTruck'>배달 소요 시간</Cell>
              <Cell className='BlueTruck'>총 대기 시간</Cell>
            </Row>

            <AsideBlueTable
            blueTableOrders={blueTableOrders}
            /> 
            </TableBody>

            </Table>
            <Table className='OrangeTruck'>
            <TableHeader>
            <Cell className='OrangeTruck'>TRUCK 2 - DATA.</Cell>
            </TableHeader>
            <TableBody>
            <Row>
              <Cell className='OrangeTruck'>No.</Cell>
              <Cell className='OrangeTruck'>주문 시간</Cell>
              <Cell className='OrangeTruck'>배달 완료 시간</Cell>
              <Cell className='OrangeTruck'>배달 소요 시간</Cell>
              <Cell className='OrangeTruck'>총 대기 시간</Cell>
            </Row>
            <AsideOrangeTable
            orangeTableOrders={orangeTableOrders}
            /> 
            </TableBody>
            </Table>

            <Table className='RedTruck'>
            <TableHeader>
            <Cell className='RedTruck'>TRUCK 3 - DATA.</Cell>
            </TableHeader>
            <TableBody>
            <Row>
              <Cell className='RedTruck'>No.</Cell>
              <Cell className='RedTruck'>주문 시간</Cell>
              <Cell className='RedTruck'>배달 완료 시간</Cell>
              <Cell className='RedTruck'>배달 소요 시간</Cell>
              <Cell className='RedTruck'>총 대기 시간 </Cell>
            </Row>
            <AsideRedTable
            redTableOrders={redTableOrders}
            /> 
            </TableBody>
            </Table>
            </>
            </div>
    </Layout>
  );
};

Aside.propTypes = {

};

export default Aside;

const Layout = styled.div`
  width:100%;
  min-width:520px;
  max-width:520px;
  height:100%;
  /* min-height:2560px;
  max-height:2560px; */
  min-height: 1440px;
  max-height: 1440px;
  background-color: whitesmoke;
  border-left: 1px solid gray;
  padding:30px;
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
margin-bottom: 20px;
`

const TableHeader = styled.div`
font-weight: bold;
width:100%;
height:30px;
background: rgb(128,128,128,0.2);
display:flex;
  border-top:1px solid rgb(128,128,128,0.2);
  border-bottom:1px solid rgb(128,128,128,0.2);
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

const Row = styled.div`
  display:flex;
  
  
`


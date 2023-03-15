import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../apis/api';
import Aside from '../components/Aside';
import Header from '../components/Header';
import Map from '../components/Map';

const Main = (props) => {
  const [orders, setOrders] = useState()
  const [data, setData] = useState()
  const [locations, setLocations] = useState()
  const [pertruck, setPerTruck] = useState()
  const [List, setList] = useState()
  const [q, setQ] = useState()
  const [targetGeo, setTargetGeo] = useState(0)
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  console.log("locations ??", locations)

  const submit = (data) =>{
    //aside에서 요청
    api.getOrder(q).then((data) => {
      
      // console.log("set Data 들어있니", data.data.setData[0])
      // console.log('data.data.setData[0] 뭔데',data.data.setData[0])
      // console.log('data.data 뭔데', data.data)
      // console.log('data.data.setOrders 확인', data.data.setOrders)
    //마커를 지워주고
    setLocations(null)
    //세로운 마커를 찍어주기
    setData(data?.data?.setData)
    setOrders(data?.data?.setOrders)
    setPerTruck(data?.data?.setPerTruck)
    })
    setIsLoading(false);
    setDisabled(false);
  }

  // useEffect(()=> {

  //   console.log('@@@@@@111@@@@@@@@',data)

  // },[q])

  
  return (
    <Layout>
      <Col>
        <Header>
        </Header>
        <Row>
          <Map 
          locations={locations} 
          targetGeo={targetGeo} 
          setTargetGeo={setTargetGeo} 
          setList={setList}
          setData={setData} 
          setLocations={setLocations}
          setOrders={orders}
          setPerTruck={setPerTruck}
          />
          <Aside 
         pertruck={pertruck}
          locations={locations} 
          submit={submit}
          setQ={setQ}
          q={q}
          List={List}
          orders={orders} 
          data={data} 
          // idx={}
          // handleDetailResultOnClick={handleDetailResultOnClick} 
          />
        </Row>
      </Col>
    </Layout>
  );
};



export default Main;

const Layout = styled.div`
        display:flex;
        width:100%;
        height:100%;
        position:relative;
        /* background-color:red; */
        `

const Row = styled.div`
        display:flex;
        width:100%;
        height:100%;
        `
const Col = styled.div`
        display:flex;
        flex-direction: column;
        width:100%;
        height:100%;
        `


import GoogleMapReact from 'google-map-react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Nav from './Nav';
import MarkerBlue from './MarkerBlue';
import MarkerOrange from './MarkerOrange';
import MarkerRed from './MarkerRed';
import AsideTable from './AsideBlueTable';
// import Lottie from 'react-lottie';
// import animationData from '../assets/animation.json';


// const lottieOptions = {
//   loop: true,
//   autoplay: true,
//   animationData: animationData,
//   rendererSettings: {
//     preserveAspectRatio: 'xMidYMid slice'
//   }
// };
const Map = (props) => {
  const cordinates = { lat: 37.50736766932199, lng: -122.26005668254102 };
  const forster= {lat: 37.55946715838405,lng : -122.27002867456997}
  const [test,setTest] = useState(null)
  const [center, setCenter] = useState(forster);
  const [zoom, setZoom] = useState(12);
  //로딩 애니메이션
  // const [showLottie, setShowLottie] = useState(false);

   // 지역 타입 메뉴 데이터    
   const [geoMenuData, setGeoMenuData] = useState([])
   
  //객체에서 꺼내서 사용***
  const blueTruckLocations = props.locations?.filter(location => location.truck_num === 1234).map((x,i)=>({...x, icon: MarkerBlue[i].image}))
  const orangeTruckLocations = props.locations?.filter(location => location.truck_num === 2345).map((x,i)=>({...x, icon: MarkerOrange[i].image}))
  const redTruckLocations = props.locations?.filter(location => location.truck_num === 3456).map((x,i)=>({...x, icon: MarkerRed[i].image}))
  
  // const [blueTruckLocations,orangeTruckLocations,redTruckLocations] = Promise.all([props.locations?.filter(location => location.truck_num === 1234).map((x,i)=>({...x, icon: MarkerBlue[i].image})),props.locations?.filter(location => location.truck_num === 2345).map((x,i)=>({...x, icon: MarkerOrange[i].image})),props.locations?.filter(location => location.truck_num === 3456).map((x,i)=>({...x, icon: MarkerRed[i].image}))]) 

console.log('props.locations, props.orders 확인!',props.locations, props.setOrders)
console.log('blueTruckLocations 1',blueTruckLocations)
console.log('orangeTruckLocations 1',orangeTruckLocations)
console.log('redTruckLocations 1',redTruckLocations)



useEffect(()=>{
  console.log(test)
  props.setLocations(props.setOrders)
  renderZoom(geoMenuData)
},[test, props.setOrders])


// useEffect(() => {
//   setShowLottie(props.isLoading);
// }, [props.isLoading]);


const renderZoom = (findGeoList)=> {
if (test === 0) {
  setCenter(forster)
  setZoom(14)
} else if (test === 1) {
  setCenter(cordinates)
  setZoom(12)  
}
}




console.log('blueTruckLocations 2',blueTruckLocations)
console.log('orangeTruckLocations 2',orangeTruckLocations)
console.log('redTruckLocations 2',redTruckLocations)
  return (
    <Layout>
      <Nav 
      setList={props.setList}
      setOrderList={props.setList}
      setLocations={props.setLocations} 
      setData={props.setData} 
      setTest={setTest}
      setOrders={props.setOrders}
      test={test}
      setPerTruck={props.setPerTruck}
      />
      {/* {showLottie && <Lottie />} */}
      <GoogleMapReact
        bootstrapURLKeys={{
          // key: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
          key: "AIzaSyB9_RyYZ1HLRQTql2vz8LiLC9SeH_ga6Do",
        }}
        defaultCenter={center}
        center={center}
        zoom={zoom}
        margin={[50, 50, 50, 50]}
        options={''}
      >
        
        {blueTruckLocations?.map((location) => (
          <Marker 
            key={location.truck_num}
            location={location}
            lat={location.order_lat}
            lng={location.order_lng}
            icon={location.icon}
            zIndex={1}
            style={{ width: '3px', height: '3px' }}
          /> 
        ))}
    
        {orangeTruckLocations?.map((location) => (
          <Marker
            key={location.truck_num}
            location={location}
            lat={location.order_lat}
            lng={location.order_lng}
            icon={location.icon}
            ZIndex={10}
            size={{ width: '3px', height: '3px' }}
          />
        ))}

        {redTruckLocations?.map((location) => (
          <Marker
            key={location.truck_num}
            location={location}
            lat={location.order_lat}
            lng={location.order_lng}
            icon={location.icon}
            ZIndex={10}
            style={{ width: '3px', height: '3px' }}
          />
        ))}
        
      </GoogleMapReact>
    </Layout>
    
  );
};

const Marker = ({  data, location, isSelected, handleMarkerClick, icon, selectedLocation }) => {

  const [test, setTest] = useState(false);
  const click = () => {
    setTest((prev)=>!prev)

  } 


//onClick={()=>click()} , 화살표 함수와 {} 차이점 ***
  return (
    <div style={{ position: 'absolute', left: '-25px', top: '-50px' }}>
      <img src={icon} onClick={()=>click()}/> 

      {test && (
        
        <div 
        style={{ 
          backgroundColor: 'white', 
          borderRadius: '5px', 
          boxShadow: '1px 1px 1px 1px grey', 
          padding: 20, 
          width: '120px', 
          textAlign: 'center', 
          fontWeight: 400, 
          fontSize: '13px',
          zIndex : 9999999
        }}>
          {/* <div>트럭넘버:{location?.truck_num}</div> */}
          <div>주문시간 : {location?.ordered_time}</div>
          <div>배달 완료 시간 : {location?.pickup_time}</div>
          <div>총 대기 시간 : {location?.waiting_time}분</div>
        </div>
      )}
    </div>
  );
};




export default Map;

const Layout = styled.div`
  width: 100%;
  min-width: 1440px;
  height: 100%;
  /* min-height: 2600px; */
  position: relative;
  background-color: whitesmoke;
  display: flex;
  justify-content: center;
  align-items: center;
`;



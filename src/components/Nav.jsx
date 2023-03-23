import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../apis/api';
import Button from './Button';
import Clock from './Clock';
import DropDown from './DropDown';
import Lottie from 'react-lottie';
import animationData from '../assets/animation.json';


const lottieOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};


const Nav = (props) => {
  const [value, setValue] = useState(null);
  const [quantity, setQuantity] = useState(null);
  console.log(props) 
 
  

  // 지역 타입 메뉴 데이터    
  const [geoMenuData, setGeoMenuData] = useState([])
  
  //비개발용, 기존데이터 선택시 주문 수량 없애기
  const [data, setData] = useState(true);
 

  //알고리즘 선택시 시작시간, 종료시간 없애기 
  const [isAlgorithm, setIsAlgorithm] = useState(true);
  const handleDataAlgorithmClick = (e, isAlgorithm) => {

    if (!devMode && !isAlgorithm) {
      setData(false)
      setIsAlgorithm(false);
    } else if (isAlgorithm) {
      setIsAlgorithm(true);
    } else {
      setData(true)
      setIsAlgorithm(false);
    } 



  };

  //비개발 선택시 횟수 1로 고정하기
  const [devMode, setDevMode] = useState(true);
  const handleDevModeChange = (event, devMode) => {
    setDevMode(devMode);

    if (devMode) {
      setData(true)
      setValue('')
    } else {
      setData(false)
      //이 부분이 없었음
      // setValue()
    }
  };



  // const handleChange = (e) => {
  //   const inputValue = e.target.value;

//  async function setValueFunc(){
//   setValue(setValueFunc)
//  }
  const handleChange = (event) => {

    //입력 횟수 99 이하로 제한
    if (Number(event.target.value) > 99) {
      setValue(99)
      window.alert('99 보다 크게 설정 할 수 없습니다.')
      return;
    } else {
      setValue(event.target.value);
      // setValueFunc(setValue)
    }
  }

  //주문 수량 30회 이하로 제한 
  const handleChanged = (event) => {


    if (Number(event.target.value) > 30) {
      setQuantity(30)
      window.alert('30 보다 크게 설정 할 수 없습니다.')
      return;
    } else {
      setQuantity(event.target.value);
    }
  }

  const handleCheckBtnOnClick = () => {
    if (value === undefined) {
      setValue(value)
      return;
    }
    setValue(value)
  }

  const [startTime, setStartTime] = useState(["", "", ""])
  const [endTime, setEndTime] = useState(["", "", ""])
  
  
  //pending 상태일 때, '결과 확인' 버튼 '로딩 중'으로 변경
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  
  const [zoom, setZoom] = useState(20);

  

  
  const handleResultOnClick = async () => {
    setIsLoading(true); 
    setDisabled(true); 
  if (devMode && isAlgorithm) {
    // 개발용 - 알고리즘
    api.postOrder({
      setLimit: value, 
      orderLimit: quantity, 
      geoId: geoMenuData?.[props.test]?.geo_area_id
    }).then((data) => {
      console.log('data가 뭔데',data)
      props.setList(data?.data.setList) 
      props.setData(data?.data?.firstSetData)
      props.setLocations(data?.data?.firstSetOrders)
      props.setPerTruck(data?.data?.firstSetPerTruck)
      setIsLoading(false); 
      setDisabled(false); 
    })
    .catch(() => {
      setIsLoading(false); 
      setDisabled(false); 
    });

    // 개발용 - 알고리즘
    console.log();

  } else if (devMode && !isAlgorithm) {
    // 개발용 - 기존데이터
    api.getSet.fetch(props.test, startTime, endTime)
    .then((data,response) => {
      console.log('data가 뭔데', data)
      props.setList(data?.data) 
      props.setData(data?.data?.firstSetData) 
      //트럭별 평균 데이터 
      props.setPerTruck(data?.data?.firstSetPerTruck)
      //첫번째 오더값과 좌표
      props.setLocations(data?.data?.firstSetOrders) 
      props.setOrderList(data?.data?.setList)

      console.log("test 작동 여부1", props.test)
        if(response.status === 200 && response.data.code === 204) {
          window.alert("해당 데이터는 존재하지 않습니다.");
      } 
        setIsLoading(false);
        setDisabled(false);
        console.log("test 작동 여부2", props.test)
    })
    .catch(() => {
        setIsLoading(false);
        setDisabled(false);
    });


    //비개발용 - 알고리즘
  } else if (!devMode && isAlgorithm) {
    api.postOrder({
      setLimit: 1, orderLimit: quantity, geoId: geoMenuData?.[props.test]?.geo_area_id
    }).then((data) => {
      console.log(data)
      props.setList(data?.data) 
      props.setData(data?.data?.firstSetData)
      props.setLocations(data?.data?.firstSetOrders)
      props.setPerTruck(data?.data?.firstSetPerTruck)
      setIsLoading(false);
      setDisabled(false);
    })
    .catch(() => {
      setIsLoading(false);
      setDisabled(false);
    });
    //비개발용 - 기존데이터
  } else if (!devMode && !isAlgorithm) {
    api.getSet.fetch(props.test, startTime, endTime)
    .then((data) => {
      props.setList(data?.data) 
      props.setData(data?.data?.firstSetData) 
      //트럭 평균 데이터
      props.setPertruck(data?.data?.firstSetPerTruck)
      props.setLocations(data?.data?.firstSetOrders)
      props.setOrderList(data?.data?.setList)
      setIsLoading(false);
      setDisabled(false);
    })
    .catch(() => {
      setIsLoading(false);
      setDisabled(false);
    });
  }
}


  useEffect(() => {
    const getGeoData = () => {
      api.getGeo().then((data) => {
        setGeoMenuData(data.data.findGeoList);
        if (data.data.findGeoList.length > 0 
          && data.data.findGeoList[1].lat 
          && data.data.findGeoList[1].lng) 
        {
          setZoom(20);
        }
      });
    };
    getGeoData();
  }, []);
  ;

  const handleReloadClick = () => {
    window.location.reload();
  };



  return (
    <Layout>
      <Clock />
      <NavContent>
        <RadioBox>
          <InputLabelBox>
            <Label htmlFor="dev_true">개발용</Label>
            <input
              type="radio"
              name="dev"
              id="dev_true"
              checked={devMode}
              onChange={(e) => handleDevModeChange(e, true)}
            />
          </InputLabelBox>
          <InputLabelBox>
            {/*비개발 클릭 시, 횟수 비활성화 및 1회 고정*/}
            <Label htmlFor="dev_false">비개발용</Label>
            <input
              type="radio"
              name="dev"
              id="dev_false"
              onChange={(e) => handleDevModeChange(e, false)}
            />
          </InputLabelBox>
        </RadioBox>
        <RadioBox>

          <InputLabelBox>
            <Label htmlFor="data_algorithm">알고리즘</Label>
            <input
              type="radio"
              name="data"
              id="data_algorithm"
              checked={isAlgorithm}
              onChange={(e) => handleDataAlgorithmClick(e, true)}
            />
          </InputLabelBox>
          <InputLabelBox>
            <Label htmlFor="data_normal">기존데이터</Label>
            <input
              type="radio"
              name="data"
              id="data_normal"
              onChange={(e) => handleDataAlgorithmClick(e, false)} 
             
              />
          </InputLabelBox>
        </RadioBox>

        <DropDown 
        icon={true} 
        menuType="location" 
        menuData={geoMenuData.map((item) => item.geo_area_name)} 
        onClick={(e)=>props.setTest(e)}
        >
        지역타입
        </DropDown>
        {!isAlgorithm && <DropDown menuType="time" setStartTime={setStartTime}>시작시간</DropDown>}
        {!isAlgorithm && <DropDown menuType="time" setEndTime={setEndTime}>종료시간</DropDown>}

        <InputBox>
          <InputButtonBox>
            {/* <InputButtonCheck 
            onClick={handleCheckBtnOnClick}
            >∨</InputButtonCheck> */}
          </InputButtonBox>
          {isAlgorithm &&
            < Input
              type="number"
              value={!devMode ? 1 : value}
              placeholder={"횟수(100회 미만 가능)"}
              onChange={devMode ? handleChange : null}
              disable={true}
            />
          }

        </InputBox>
        <InputBox>
          <InputButtonBox>
            {/* <InputButtonCheck 
            onClick={handleCheckBtnOnClick}></InputButtonCheck> */}
          </InputButtonBox>
          {isAlgorithm && <Input
            type="number"
            value={quantity}
            placeholder={"주문 수량(30개 이하 가능)"}
            onChange={handleChanged}
            disable={true}
          />}
        </InputBox>
        <Button 
        bgColor="blue" 
        width={100} 
        type="submit" 
        onClick={handleResultOnClick} 
        disabled={isLoading}
        >


      {isLoading ?  '결과 확인중 ...' : disabled ? '처리 중...' : '결과 확인'}
      
    
        </Button>
        <hr />
        <Button
        width={100} 
        type="submit" 
        onClick={handleReloadClick}
        padding-left={10}
        bgColor="grey"
        >
         초기화
        </Button>
      </NavContent>
      <Text1>
        ※ 알고리즘 선택 시, 현재 시각 기준 알고리즘 계산한 값을 조회합니다.
        <br />
        ※ 기존데이터 조회 시, 시간값을 바꿀 경우 초기화를 하고 다시 진행하는 것을 권장합니다.
      </Text1>
  
    </Layout>
  );
};

export default Nav;



const Text1 = styled.div`
  font-size: 10px;
  font-weight: 400;
  margin-top: 10px;
  margin-left: 390px;
  background-color: white;
  width: 350px;
  /* text-align: center; */
  padding: 2px;
`

const Layout = styled.div`
  display:flex;
  flex-direction: column;
  position:absolute;
  width:calc(100% - 50px) ;
  top:10px;
  left:0px;
  margin-left: 30px;
  box-sizing: border-box;
  height:auto;
  padding:10px;
  font-size:14px;
  z-index: 1;
  color:black;
  font-weight: bold;
`

const RadioBox = styled.div`
  display:flex;
  flex-direction:column;
  margin-right:10px;
`

const InputLabelBox = styled.div`
  display:flex;
`

const Label = styled.label`
  width:100%;
  max-width:100px;
  text-align:center;
`

const InputBox = styled.div`
  width:fit-content;
  height:38px;
  position:relative;
  background-color:white;
  border-radius: 3px;
  /* border:1px solid rgb(125,125,125,0.5); */
  display:flex;
  justify-content:center;
  align-items:center;
  margin-right:8px;
`

const Input = styled.input`
display:${(props) => props.disable === true ? "flex" : "none"};
width: 160px;
border:none;
background:none;
outline: none;
padding-left:10px;
padding-right:12px;
&::-webkit-outer-spin-button,
&::-webkit-inner-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
}
&::placeholder{
  color:black;
  font-weight:bold;
}
`

const InputButtonBox = styled.div`
  position:absolute;
  right:0;
  /* overflow: hidden; */
`
const InputButtonPlus = styled.button`
border:none;
display:flex;
justify-content:center;
align-items:center;
  width:20px;
  height:19px;
  height:calc(auto - 1px);
  background-color:rgb(128,128,128,0.1);
  border-left:1px solid rgb(128,128,128,0.4);
  font-size:17px;
  &:hover{
    cursor: pointer;
  }
`

// const InputButtonMinus = styled(InputButtonPlus)`
// border-left:1px solid rgb(128,128,128,0.4);
// border-top:1px solid rgb(128,128,128,0.4);
// display:flex;
// &:hover{
//     cursor: pointer;
//   }
// `

const NavContent = styled.div`
    display:flex;
    width:100%;
  /* background-color:rgb(255,255,255,0.5); */
`

// const InputButtonCheck = styled.button`
//   height: 38px;
//   border: none;
//   color: rgb(113,113,113);
//   &:hover{
//     cursor: pointer;
//     background-color: rgb(222,222,222);
//     color: white;
//   }
// `


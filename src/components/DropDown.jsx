import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

const DropDown = (props) => {
  const { children, menuData, menuData2, menuType, icon,q } = props
  const [view, setView] = useState(false)

  const [defaultValue, setDefaultValue] = useState()
  const dropRef = useRef(null)


  const [isAmOrPm, setIsAmOrPm] = useState(undefined)
  const [selectedHour, setSelectedHour] = useState(undefined)
  const [selectedMinuite, setSelectedMinuite] = useState(undefined)

  const [isTimeClick, setIsTimeClick] = useState(false)
  const handleDropDown = () => {
    if (menuType === "time") {
      setIsTimeClick(true)
    }
    setView(!view)
  }

  const handleDropItemClick = (target) => {
    setIsTimeClick(true)
    setDefaultValue(target)
    setView(false)
  }

  useEffect(() => {
    console.log('menuData2가 뭔데',menuData2)
    console.log('menuData가 뭔데',menuData)
    if (!view) {

      if (menuType === 'time') {
        if (!selectedHour && !selectedMinuite && !isAmOrPm) {
          setIsTimeClick(false)
          return
        }
      }
    }

    const onCheckClickOutside = (e) => {
      if (view === true && dropRef.current && !dropRef.current.contains(e.target)) {
        setView(false);
      }
    };


    document.addEventListener('mousedown', onCheckClickOutside);
    return () => {
      document.removeEventListener('mousedown', onCheckClickOutside);
    };
  }, [view, menuType])

  const handleHourOnClick = (item) => {
    setSelectedHour(item)
    setIsTimeClick(true)
  }

  const handleMinuiteOnClick = (item) => {
    setSelectedMinuite(item)
    setIsTimeClick(true)
  }

  const handleIsAmOrPmClick = (item) => {
    setIsAmOrPm(item)
    setIsTimeClick(true)
  }




  return (
    <Layout>
      <SelectedBox onClick={handleDropDown}>
        {defaultValue ? defaultValue : isTimeClick 
        ? `${isAmOrPm !== undefined ? isAmOrPm === "am" ? "am" : "pm" : '--'}  
        ${selectedHour !== undefined ? selectedHour < 10 ? `0${selectedHour}` : selectedHour : '--'}
        : ${selectedMinuite !== undefined ? selectedMinuite < 10 ? `0${selectedMinuite}` : selectedMinuite : '--'}` 
        : children}
        {icon && <IconBox>
          <IoMdArrowDropup />
          <IoMdArrowDropdown />
        </IconBox>}
      </SelectedBox>
      <DropWrapper menuType={menuType} view={view} ref={dropRef}>
        <DropInner>
          {menuType === "time" && <TimeSelectorBox>
            <TimeSelectorList>
              <TimeSelectorItem onClick={() => {
                if (props.setStartTime) {
                  props?.setStartTime((prev) => prev.map((item, idx) => {
                    if (idx === 0) {
                      return "am"
                    } else {
                      return item
                    }
                  }))
                }
                else {
                  props?.setEndTime((prev) => prev.map((item, idx) => {
                    if (idx === 0) {
                      return "am"
                    } else {
                      return item
                    }
                  }))
                }
                handleIsAmOrPmClick("am")
              }

              } baseTarget={isAmOrPm} target={"am"}>am</TimeSelectorItem>
              <TimeSelectorItem onClick={() => {

                if (props.setStartTime) {
                  props?.setStartTime((prev) => prev.map((item, idx) => {
                    if (idx === 0) {
                      return "pm"
                    } else {
                      return item
                    }
                  }))
                }
                else {
                  props?.setEndTime((prev) => prev.map((item, idx) => {
                    if (idx === 0) {
                      return "pm"
                    } else {
                      return item
                    }
                  }))
                }

                handleIsAmOrPmClick("pm")
              }} baseTarget={isAmOrPm} target={"pm"}>pm</TimeSelectorItem>
            </TimeSelectorList>
            <TimeSelectorList>
              {new Array(12).fill(0).map((item, idx) => {
                return <TimeSelectorItem onClick={() => {

                  if (props.setStartTime) {
                    props?.setStartTime((prev) => prev.map((item, prevIdx) => {
                      if (prevIdx === 1) {
                        if (idx + 1 <= 9) {
                          return `0${idx + 1}`
                        } else {
                          return `${idx + 1}`
                        }
                      } else {
                        return item
                      }
                    }))
                  }
                  else {
                    props?.setEndTime((prev) => prev.map((item, prevIdx) => {
                      if (prevIdx === 1) {
                        if (idx + 1 <= 9) {
                          return `0${idx + 1}`
                        } else {
                          return `${idx + 1}`
                        }
                      } else {
                        return item
                      }
                    }))
                  }
                  handleHourOnClick(idx + 1)
                }} baseTarget={selectedHour} target={idx + 1}>{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</TimeSelectorItem>
              })}
            </TimeSelectorList>
            <TimeSelectorList>
              {new Array(60).fill(0).map((item, idx) => {
                return <TimeSelectorItem onClick={() => {
                  if (props.setStartTime) {
                    props?.setStartTime((prev) => prev.map((item, prevIdx) => {
                      if (prevIdx === 2) {
                        if (idx + 1 <= 9) {
                          return `0${idx}`
                        } else {
                          return `${idx}`
                        }
                      } else {
                        return item
                      }
                    }))
                  } else {
                    props?.setEndTime((prev) => prev.map((item, prevIdx) => {
                      if (prevIdx === 2) {
                        if (idx + 1 <= 9) {
                          return `0${idx}`
                        } else {
                          return `${idx}`
                        }
                      } else {
                        return item
                      }
                    }))
                  }
                  handleMinuiteOnClick(idx)
                }} baseTarget={selectedMinuite} target={idx}>{idx <= 9 ? `0${idx}` : idx}</TimeSelectorItem>
              })}
            </TimeSelectorList>
          </TimeSelectorBox>}


          {menuType === "location" && menuData?.map((item, idx) => {
            return <DropItem onClick={() => {
              handleDropItemClick(item)
              props.onClick(idx)
            }
            }>{item}</DropItem>
          })}



           {menuType === "set" && menuData2?.map((item, idx) => {
            return <DropItem style={{color: item === q ? "red" : "black"}}
            onClick={() => props.setQ(item)}>{item}</DropItem>
          })}  
        
          {menuData?.length <= 0 && <div>로딩중..</div>}




        </DropInner>
      </DropWrapper>
    </Layout >
  );
};

export default DropDown;

const Layout = styled.div`
  width:100%;
  max-width:200px;
  border:1px solid rgb(125,125,125,0.5);
  border-radius:3px;
  background-color:white;
  position:relative;
  display:flex;
  justify-content:flex-start;
  align-items:center;
  margin-left:5px;
  margin-right:5px;

  &:hover{
    cursor: pointer;
  }
`

const SelectedBox = styled.div`
  padding-left:10px;
  width:100%;
`

const DropWrapper = styled.div`
  visibility:${props => props.view ? "visible" : "hidden"};
  position:absolute;
  top:46px;
  width:100%;
  height: ${props => props.menuType === "time" ? "300px" : "100px"};
  background-color: white;
  border-radius: 3px;
  box-shadow: 1px 4px 6px 0px rgb(0,0,0,0.4);
  padding:4px;
`

const DropInner = styled.div`
  display:flex;
  flex-direction: column;
  height:100%;
  box-sizing: border-box;
    overflow-y:auto;
  overflow-x: hidden;
`

const DropItem = styled.div`
  margin-bottom:2px;
  margin-bottom:2px;
  &:hover{
    cursor: pointer;
  }
  
`

const IconBox = styled.div`
  display:flex;
  justify-content:space-around;
  height:100%;
  flex-direction: column;
  position:absolute;
  top:0;
  right:0;
`

const TimeSelectorBox = styled.div`
  display:flex;
  height:inherit;
  margin-bottom:4px;
`

const TimeSelectorList = styled.div`
  padding:0;
  margin:4px;
  width:100%;
  height:inherit;
  overflow-y: scroll;
  padding-right:4px;
`
const TimeSelectorItem = styled.div`
 padding:0;
  margin:0;
  box-sizing: border-box;
  display:flex;
  width:100%;
  height:30px;
  display:flex;
  justify-content:Center;
  align-items:center;
  background-color:${props => props.baseTarget === props.target ? "rgb(227,32,49)" : "whitesmoke"};
  border-radius: 4px;
  margin-bottom:3px;
`



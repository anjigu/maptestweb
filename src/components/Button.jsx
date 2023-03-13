import React from 'react';
import styled from 'styled-components';
const Button = props => {

  return (
    <Layout onClick={props.onClick} width={props.width} height={props.height} bgColor={props.bgColor}>
      {props.children}
    </Layout>

  )
};



export default Button;

const Layout = styled.div`
  width:${props => props.width + "px"};
  height:${props => props.height + "px"};
  background:${props => props.bgColor};
  display:flex;
  justify-content:center;
  align-items:center;
  background-color:rgba(223,32,45);
  border-radius: 6px;
  color:white;
  font-size:14px;

  &:hover{
    cursor: pointer;
    background-color:rgba(178,31,40);
  }

`

//타입스크립트 리팩토링 
// import React, { FC, ReactNode, MouseEventHandler } from 'react';
// import styled from 'styled-components';

// interface ButtonProps {
//   onClick?: MouseEventHandler<HTMLDivElement>;
//   width: number;
//   height: number;
//   bgColor: string;
//   children: ReactNode;
// }

// const Button: FC<ButtonProps> = ({ onClick, width, height, bgColor, children }) => {
//   return (
//     <Layout onClick={onClick} width={width} height={height} bgColor={bgColor}>
//       {children}
//     </Layout>
//   );
// };

// export default Button;

// interface LayoutProps {
//   width: number;
//   height: number;
//   bgColor: string;
// }

// const Layout = styled.div<LayoutProps>`
//   width: ${props => props.width + "px"};
//   height: ${props => props.height + "px"};
//   background: ${props => props.bgColor};
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: rgba(223, 32, 45);
//   border-radius: 6px;
//   color: white;
//   font-size: 14px;

//   &:hover {
//     cursor: pointer;
//     background-color: rgba(178, 31, 40);
//   }
// `

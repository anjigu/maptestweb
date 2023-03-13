import styled from 'styled-components';
import './App.css';
import Main from './pages/Main';
function App() {
  return (
    <Layout>
      <Main />
    </Layout>
  );
}

export default App;

const Layout = styled.div`
  width:100%;
  height:100%;
`

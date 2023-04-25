import './App.css';

import {
	BrowserRouter as Router,
	Routes,
	Route
	// Link
} from 'react-router-dom';
import Create from './components/Create';
import { createTheme,ThemeProvider} from '@mui/material';
import Notes from './components/Notes';
import Layout from './components/Layout';
const theme=createTheme({
  palette:{
    primary:{
      main:'#fefefe'
    }
  }
})
function App() {
  return (
    <>
    <ThemeProvider theme={theme}>

    <Router>
      {/* <Navbar/> */}
      <Layout>
      <Routes>
        <Route/>
        <Route exact path="/" element={<Notes/>}/>
        <Route exact path="/create" element={<Create/>}/>

      </Routes>
      </Layout>
    </Router>
    </ThemeProvider>
    
    </>
  );
}

export default App;

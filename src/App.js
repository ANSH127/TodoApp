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
import Login from './components/Login';
import SignUp from './components/SignUp';
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
        <Route exact path="/" element={<Notes/>}/>
        <Route exact path="/create" element={<Create/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/signup" element={<SignUp/>}/>
        

      </Routes>
      </Layout>
    </Router>
    </ThemeProvider>
    
    </>
  );
}

export default App;

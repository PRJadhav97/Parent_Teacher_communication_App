import './App.css';
import Footer from './Components/Footer/Footer';
import NavBar from './Components/Navbar';
import { Outlet } from 'react-router-dom';

// import { MyContext } from './MyContext';

function App() {
  // const [text, setText] = useState("");
  
  return (
    <>

    <NavBar/>     

     <Outlet/>

     <Footer/>

     {/* <StudentGraph/> */}

     {/* <ModalGraph/> */}
    </>
  );
}

export default App;

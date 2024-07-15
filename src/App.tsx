import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import './styles.css';
import Registration from './views/Registration';
import Main from './views/Main';
import Admin from './views/Admin';


const App =() => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
    </BrowserRouter> 
  );
}

export default App;

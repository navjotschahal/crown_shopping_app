import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './routes/homepage/homepage.component';
import Navigation from './routes/navigation/navigation.component';
import SignIn from './routes/sign-in/sign-in.component';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigation/>} >
        <Route index element={<HomePage></HomePage>}></Route>
        <Route path='shop' ></Route>
        <Route path='sign-in' element={<SignIn/>}></Route>
      </Route>
    </Routes>
  );
}

export default App;

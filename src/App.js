import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import { AnimatedRoutes } from './components/AnimatedRoutes';
import {UserNameProvider} from './context/UsernameContext'


function App() {
  return (
    <UserNameProvider className="app">
  <BrowserRouter>
    <AnimatedRoutes/>
  </BrowserRouter>
    </UserNameProvider>
  );
}

export default App;

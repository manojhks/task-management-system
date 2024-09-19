import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import { AnimatedRoutes } from './components/AnimatedRoutes';


function App() {
  return (
    <div className="app">
  <BrowserRouter>
    <AnimatedRoutes/>
  </BrowserRouter>
    </div>
  );
}

export default App;

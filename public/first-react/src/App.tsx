import './App.css'
import { useEffect } from 'react';
import './utilities/http.interceptor';
import Header from './components/Header';
import Routing from './components/Routing';
import { NavigateFunction, useNavigate } from 'react-router-dom'

function App() {
  const navigate: NavigateFunction = useNavigate();
  useEffect(() => {
      const token = localStorage.getItem('token');
      if(!token) {
          navigate('/login');
      }
  }, []);

  return (
    <div className="App">
      <Header />
      <Routing />
    </div>
  )
}

export default App

import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import './App.css'
import Header from './pages/Header';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <AppRoutes />
       
      </div>
    
    </Router>
    
  );
}

export default App;


// src/App.js



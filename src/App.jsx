import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import './App.css'
import Footer from './pages/Footer';
import Header from './pages/Header';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <AppRoutes />
        <Footer/>
      </div>
    </Router>
    
  );
}

export default App;


// src/App.js



import './App.css';
import './sass/main.scss';
import Sidebar from './components/Sidebar/Sidebar';
import Appside from './pages/Appside/Appside';

function App() {
  return (
    <div className="App">
      <div className='appgrid'>
        <Sidebar />
        <Appside />
        
     </div>
    </div>
  );
}

export default App;

import './App.css';
import './sass/main.scss';
import { useHistory } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Appside from './pages/Appside/Appside';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Borrow from './pages/Appside/Borrow';
import AdminPage from './pages/Admin/AdminPage';
import Vault from './pages/Vault/Vault';
import Home from './pages/Home/Home';
import AppHome from '../src/pages/Appside/AppHome';
import LiquidationPage from './pages/Liquidation/LiquidationPage';
import S2E from './components/LiquidationExchange/S2E';
import S2X from './components/LiquidationExchange/S2X';
import Header from './components/Header/Header';


function App() {
  const {
    location: { pathname },
  } = useHistory();
  return (
    <div className="App">
        

      <div className='appgrid'>
        <div className='apphome'>
        <Header />
        
        <Switch>
        <Route exact path ='/' component={AppHome} />
        <Route exact path ='/borrow' component={Borrow} />
        <Route  path='/home' component={Home}/>
        <Route path='/admin' component={AdminPage} />
        <Route path='/vault' component={Vault} />
        <Route exact path='/liquidations' component={LiquidationPage} />
        <ProtectedRoute path='/liquidations/s2x' component={S2X} />
        <ProtectedRoute path='/liquidations/s2e' component={S2E} />        

        </Switch>
        </div>
     </div>
    </div>
  );
}

export default App;

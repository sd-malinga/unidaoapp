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
import AppHome from "../src/pages/Appside/AppHome";

function App() {
  const {
    location: { pathname },
  } = useHistory();
  return (
    <div className="App">

      <div className='appgrid'>
        <Switch>
        <Route exact path ='/' component={AppHome} />
        </Switch>
        {pathname  !==  '/' && <Sidebar />}
        {pathname  !==  '/' && <Appside />}
        
     </div>
    </div>
  );
}

export default App;

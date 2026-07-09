import { Link, Outlet } from 'react-router-dom'
import './App.css'

function App() {
  return <div className="main">
    <div className="navigation">
      <div className="titreN"><h1>PHP COOP</h1><br/><br/><br/></div>
      <div className="leslinks">
        <Link to="/">RESERVATION</Link><br/><br/>
        <Link to="/voiture">VOITURE</Link><br/>
        <Link to="/client">CLIENT</Link><br/>
        <Link to="/profit">PROFIT</Link>
      </div>
    </div>
    <div className="out">
      <Outlet />
    </div>
  </div>
}

export default App

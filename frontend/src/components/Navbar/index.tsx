import { AuthContext } from 'AuthContext';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { getTokenData, isAuthenticated } from 'util/auth';
import history from 'util/history';
import { removeAuthData } from 'util/storage';
import './styles.css';


const Navbar = () => {
  const {authContextData, setAuthContextData} = useContext(AuthContext);


  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  },[setAuthContextData]);

  const handleClick = (event:React.MouseEvent<HTMLButtonElement> ) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      authenticated: false,
    });
    history.replace('/')
  }
  return (
    <nav className="navbar main-nav bg-primary">
      <div className="container-fluid">
        <Link className="navbar-logo-text" to="/movies">
          <h4>MovieFlix</h4>
        </Link>
        <div className= "logout-container">
          {authContextData.authenticated && (
            <button className="btn" onClick={handleClick}>
              <h5>SAIR</h5>
            </button>
            
          ) }
        </div>
      </div>
    </nav>
  );
};
export default Navbar;

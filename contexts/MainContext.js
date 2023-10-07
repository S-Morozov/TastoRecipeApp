import React, {useState} from 'react';
import PropTypes from 'prop-types';

const MainContext = React.createContext({});

const MainProvider = (props) => {
  // create state isLoggedIn, set value to false
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const setGuestUser = () => {
    setIsLoggedIn(false);
    setUser({
      username: 'Guest',
   
    });
  };

  return (
    <MainContext.Provider value={{isLoggedIn, setIsLoggedIn, user, setUser,setGuestUser }}>
      {props.children}
    </MainContext.Provider>
   );
};

MainProvider.propTypes = {
  children: PropTypes.node,
};

export {MainContext, MainProvider};

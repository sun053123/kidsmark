import React, { useContext, useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link  } from 'react-router-dom'

import { AuthContext } from '../context/auth'

function MenuBar() {

    const { user, logout } = useContext(AuthContext)
    const pathname = window.location.pathname;
    // what ever page you are in when you refresh , it will bring you to pathname == menubar button
    const path = pathname === '/' ? 'home' : pathname.substr(1);

    const [activeItem, setActiveItem] = useState(path);

    const handleItemClick = (e, { name }) => setActiveItem(name);


    const menuBar = user ? ( //show if user login or logout will change menubar

        //if user loged in
        <div> 
        <Menu pointing secondary size='massive' color="teal">
          <Menu.Item
            name={user.username}
            active={activeItem === 'home' || ''}
            as={Link}
            to="/"
          />
          <Menu.Item
            name='quiz'
            active={activeItem === 'quiz' }
            onClick={handleItemClick}
            as={Link}
            to="/quiz"
          />

          <Menu.Menu position='right'>
            <Menu.Item
                name='logout'
                onClick={logout}
            />
          </Menu.Menu>
        </Menu>

        
      </div>

    ) : (
        <div>
        <Menu pointing secondary size='massive' color="teal">
          <Menu.Item
            name='home'
            active={activeItem === 'home' || ''}
            onClick={handleItemClick}
            as={Link}
            to="/"
          />
          <Menu.Item
            name='quiz'
            active={activeItem === 'quiz' }
            onClick={handleItemClick}
            as={Link}
            to="/quiz"
          />
          <Menu.Menu position='right'>
            <Menu.Item
                name='login'
                active={activeItem === 'login'}
                onClick={handleItemClick}
                as={Link}
                to="/login"   
            />
                <Menu.Item
                name='register'
                active={activeItem === 'register'}
                onClick={handleItemClick}
                as={Link}
                to="/register"
                />
          </Menu.Menu>
        </Menu>

        
      </div>
        
    )

    return menuBar;
    
  }

  export default MenuBar;
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Classes from './Navbar.module.css'




export class Navbar extends Component {
  render(props) {
    return (
      <nav className={Classes.nav}>
        <div className={Classes.item}>
          <NavLink to="/profile" className={(navData) => (navData.isActive ? `${Classes.activeLink}` : 'none')}>Profile</NavLink>
        </div>
        <div className={Classes.item}>
          <NavLink to="/dialogs" className={(navData) => (navData.isActive ? `${Classes.activeLink}` : 'none')}>Messages</NavLink>
        </div>
        <div className={Classes.item}>
          <NavLink to="/news" className={(navData) => (navData.isActive ? `${Classes.activeLink}` : 'none')}>News</NavLink>
        </div>
        <div className={Classes.item}>
          <NavLink to="/music" className={(navData) => (navData.isActive ? `${Classes.activeLink}` : 'none')}>Music</NavLink>
        </div>
        <div className={Classes.item}>
          <NavLink to="/users" className={(navData) => (navData.isActive ? `${Classes.activeLink}` : 'none')}>Users</NavLink>
        </div>
        <div className={Classes.item + ' ' + Classes.setting}>
          <NavLink to="/setting" className={(navData) => (navData.isActive ? `${Classes.activeLink}` : 'none')}>Setting</NavLink>
        </div>
      </nav>
    )
  }
}

export default Navbar
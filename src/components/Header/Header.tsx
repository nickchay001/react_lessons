import React from 'react'
import { NavLink } from 'react-router-dom'
import Classes from './Header.module.css'

export type MapPropsType ={
  isAuth:boolean
  login:string | null
}
export type DispatchPropsType ={
  logout:() => void
}

const Header:React.FC<MapPropsType & DispatchPropsType> = (props) => {
  return (
    <header className={Classes.header}>
      <img alt='#' src='data:image/png;base64,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' />
      <div className={Classes.loginBlock}>
        {props.isAuth
          ? <div> {props.login} - <button onClick={props.logout}>Log out</button> </div>
          : <NavLink to={'/login'}>Login</NavLink>}
      </div>
    </header>
  )
}

export default Header
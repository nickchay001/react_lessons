import React from 'react'
import Classes from './Footer.module.css'

type PropsType = {

}

const Footer: React.FC<PropsType> = (props) => {
  return (
    <footer className={Classes.footer}></footer>
  )
}

export default Footer
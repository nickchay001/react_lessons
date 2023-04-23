import React from 'react'
import Classes from './../Dialogs.module.css'

type PropsType = {
  message: string
}

const Message: React.FC<PropsType> = (props) => {
    return (
      <div className={Classes.message}>{props.message}</div>
    )
  }

export default Message
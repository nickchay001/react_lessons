import React, { Component } from 'react'
import Classes from './Post.module.css'

type PropsType = {
    message:string
    likesCount:number
}

const Post: React.FC<PropsType> = (props) => {
    return (
        <div className={Classes.item}>
            <img alt='#' src='https://static.vecteezy.com/system/resources/thumbnails/002/002/332/small/ablack-man-avatar-character-isolated-icon-free-vector.jpg' />
            {props.message}
            <div>
                <span>Like {props.likesCount}</span>
            </div>
        </div>
    )
}

export default Post
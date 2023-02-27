import React, { Component } from 'react'
import Classes from './Post.module.css'

export class Post extends Component {
    render(props) {
       
        return (
            <div className={Classes.item}>
                <img alt='#' src='https://static.vecteezy.com/system/resources/thumbnails/002/002/332/small/ablack-man-avatar-character-isolated-icon-free-vector.jpg'/>
                {this.props.message}
                <div>
                <span>Like {this.props.likesCount}</span>
                </div>
            </div>
        )
    }
}

export default Post
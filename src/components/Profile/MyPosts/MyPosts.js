import React, { Component } from 'react'
import { addPostActionCreator, updateNewPostTextActionCreater } from '../../../redux/profile-reducer';

import Classes from './MyPosts.module.css'
import Post from './Post/Post'





export class MyPosts extends Component {
  render() {
    let postsElements =
      this.props.profilePage.posts.map(p => <Post key={p.message + 1} message={p.message} likesCount={p.likesCount} />)

    let newPostElement = React.createRef();




    let addPost = () => {
      this.props.dispatch(addPostActionCreator());
    }

    let onPostChange = () => {
      let text = newPostElement.current.value;
      this.props.dispatch(updateNewPostTextActionCreater(text));
    }

    return (
      <div className={Classes.postsBlock}>
        <h3>My posts</h3>
        <div>
          <div>
            <textarea onChange={onPostChange} value={this.props.profilePage.newPostText} ref={newPostElement} />
          </div>
          <div>
            <button onClick={addPost}>Add post</button>
          </div>
        </div>
        <div className={Classes.posts}>
          {postsElements}
        </div>
      </div>
    )
  }
}

export default MyPosts
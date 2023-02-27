import React, { Component } from 'react'
import { addPostActionCreator, updateNewPostTextActionCreater } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';





export class MyPostsContainer extends Component {
  
  render() {
    let state = this.props.store.getState();

    let addPost = () => {
      this.props.store.dispatch(addPostActionCreator());
    }
    let onPostChange = (text) => {
      let action = updateNewPostTextActionCreater(text);
      this.props.store.dispatch(action)
    }

    return (
      <MyPosts
        updateNewPostText={onPostChange}
        addPost={addPost}
        posts={state.profilePage.posts}
        newPostText={state.profilePage.newPostText} />

    )
  }
}

export default MyPostsContainer
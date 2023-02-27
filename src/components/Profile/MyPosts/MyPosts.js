import React, { Component } from 'react'
import Classes from './MyPosts.module.css'
import Post from './Post/Post'





export class MyPosts extends Component {
  render() {
    let postsElements =
      this.props.posts.map(p => <Post key={p.message + 1} message={p.message} likesCount={p.likesCount} />)
    let newPostElement = React.createRef();

    let onAddPost = () => {
      this.props.addPost();
    }
    let onPostChange = () => {
      let text = newPostElement.current.value;
      this.props.updateNewPostText(text);
    }

    return (
      <div className={Classes.postsBlock}>
        <h3>My posts</h3>
        <div>
          <div>
            <textarea onChange={onPostChange} value={this.props.newPostText} ref={newPostElement} />
          </div>
          <div>
            <button onClick={onAddPost}>Add post</button>
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
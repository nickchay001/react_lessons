import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form';
import Classes from './MyPosts.module.css'
import Post from './Post/Post'





export class MyPosts extends Component {
  render() {
    let postsElements =
      this.props.posts.map(p => <Post key={p.message + 1} message={p.message} likesCount={p.likesCount} />)

    let onAddPost = (values) => {
      this.props.addPost(values.newPostText);
    }
    return (
      <div className={Classes.postsBlock}>
        <h3>My posts</h3>
        <AddNewPostFormRedux onSubmit={onAddPost} />
        <div className={Classes.posts}>
          {postsElements}
        </div>
      </div>
    )
  }
}


let AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field name="newPostText" component="textarea" />
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  )
}

const AddNewPostFormRedux = reduxForm({ form: "profileAddNewPostForm" })(AddNewPostForm)

export default MyPosts
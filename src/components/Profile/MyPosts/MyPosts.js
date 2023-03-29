import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form';
import Classes from './MyPosts.module.css'
import Post from './Post/Post'
import { required, maxLengthCreator} from './../../../utils/validators/validators'
import { Textarea } from '../../common/FormsControls/FormsControls';





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

const maxLength10 = maxLengthCreator(10);
let AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field name="newPostText" component={Textarea} placeholder="Post message"
          validate={[required,maxLength10 ]} />
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  )
}

const AddNewPostFormRedux = reduxForm({ form: "profileAddNewPostForm" })(AddNewPostForm)

export default MyPosts
import React from 'react'
import Classes from './MyPosts.module.css'
import Post from './Post/Post'
import { AddNewPostFormRedux, AddPostFormValuesType } from './AddPostForm/AddPostForm';
import { PostType } from '../../../types/types';


export type MapPropsType = {
  posts: Array<PostType>
}
export type DispatchPropsType = {
  addPost: (newPostText: string) => void
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = props => {
  console.log("render")
  let postsElements =
    props.posts.map(p => <Post key={p.message + 1} message={p.message} likesCount={p.likesCount} />)

  let onAddPost = (values: AddPostFormValuesType) => {
    props.addPost(values.newPostText);
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

const MyPostsMemorized = React.memo(MyPosts)


export default MyPostsMemorized
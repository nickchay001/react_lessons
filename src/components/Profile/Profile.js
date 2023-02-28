import React, { Component } from 'react'

import MyPostsContainer from './MyPosts/MyPostsContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'


export class Profile extends Component {
  render() {
    return (
      <div>
        <ProfileInfo />
        <MyPostsContainer/>
      </div>
    )
  }
}

export default Profile
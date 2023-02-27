import React, { Component } from 'react'
import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from './ProfileInfo/ProfileInfo'


export class Profile extends Component {
  render(props) {
    return (
      <div>
        <ProfileInfo />
        <MyPosts 
        profilePage={this.props.profilePage}
         
          dispatch={this.props.dispatch}
        />
      </div>
    )
  }
}

export default Profile
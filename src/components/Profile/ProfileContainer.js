import axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import Profile from './Profile'
import {setUserProfile} from './../../redux/profile-reducer'


export class ProfileContainer extends Component {
  componentDidMount() {
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
      .then(response => {
        this.props.setUserProfile(response.data)
      });
  }

  render() {
    return (
      <div>
        <Profile
          {...this.props}
          profile={this.props.profile} />
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile
})


export default connect(
  mapStateToProps,
  {
    setUserProfile,
  }
)(ProfileContainer)
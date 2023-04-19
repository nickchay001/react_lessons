import React, { Component } from 'react'
import { connect } from 'react-redux';
import Profile from './Profile'
import { setUserProfile, getUserProfile, getStatus, updateStatus, savePhoto, saveProfile, } from './../../redux/profile-reducer'
//import { withAuthNavigate } from '../../hoc/withAuthNavigate';
import { compose } from 'redux';
import { withRouter } from '../../hoc/withRouter';



export class ProfileContainer extends Component {
  refreshProfile() {
    let userId = this.props.router.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId; //userId = this.props.authorizedUserId;
      if (!userId) {
       userId = 28375
        if (!userId) {
          this.props.router.navigate('/login')
        }
      }
    }
    this.props.getUserProfile(userId);
    this.props.getStatus(userId);
  }

  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.router.params.userId !== prevProps.router.params.userId) {
      this.refreshProfile()
    }
  }



  render() {
    return <Profile {...this.props} profile={this.props.profile}
      status={this.props.status} updateStatus={this.props.updateStatus}
      isOwner={!this.props.router.params.userId} savePhoto={this.props.savePhoto} />
  }
}


let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId, //userId =state.auth.userId;
  isAuth: state.auth.isAuth,
})



export default
  compose(
    connect(mapStateToProps, { setUserProfile, getUserProfile, getStatus, updateStatus, savePhoto, saveProfile, }),
    withRouter,
    //withAuthNavigate,
  )(ProfileContainer)


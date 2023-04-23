import React, { Component } from 'react'
import { connect } from 'react-redux';
import Profile from './Profile'
import { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile, } from '../../redux/profile-reducer'
//import { withAuthNavigate } from '../../hoc/withAuthNavigate';
import { compose } from 'redux';
import { withRouter } from '../../hoc/withRouter';
import { AppStateType } from '../../redux/redux-store';
import { ProfileType } from '../../types/types';

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  getUserProfile: (userId: number) => void
  getStatus: (userId: number) => void
  updateStatus: (status: string) => void
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => Promise<any>
}
type PathParamsType = {
  userId: string
}
type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>


export class ProfileContainer extends React.Component<PropsType> {
  refreshProfile() {
    let userId = this.props.router.params.userId;
    if (!userId) {
      debugger
      userId = this.props.authorizedUserId; //userId = this.props.authorizedUserId;
      if (!userId) {
        userId = 28375
        if (!userId) {
          this.props.router.navigate('/login')
        }
      }
    }
    if (!userId) {
      throw new Error("ID shoul exists in URI params or in state ('authorizedUserId')")
    } else {
      this.props.getUserProfile(userId);
      this.props.getStatus(userId);
    }
  }

  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
    if (this.props.router.params.userId !== prevProps.router.params.userId) {
      this.refreshProfile()
    }
  }



  render() {
    return <Profile saveProfile={function (profile: ProfileType): Promise<any> {
      throw new Error('Function not implemented.');
    } } {...this.props} profile={this.props.profile}
    status={this.props.status} updateStatus={this.props.updateStatus}
    isOwner={!this.props.router.params.userId} savePhoto={this.props.savePhoto} />
  }
}


let mapStateToProps = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId, //userId =state.auth.userId;
  isAuth: state.auth.isAuth,
})



export default
  compose<React.ComponentType>(
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile, }),
    withRouter,
    //withAuthNavigate,
  )(ProfileContainer)


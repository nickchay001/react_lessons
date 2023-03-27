import React, { Component } from 'react'
import { connect } from 'react-redux';
import Profile from './Profile'
import { setUserProfile, getUserProfile, getStatus, updateStatus } from './../../redux/profile-reducer'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
//import { withAuthNavigate } from '../../hoc/withAuthNavigate';
import { compose } from 'redux';



export class ProfileContainer extends Component {
  componentDidMount() {
    let userId = this.props.router.params.userId;
    if (!userId) {
      userId = 28375
    }
    this.props.getUserProfile(userId);
    this.props.getStatus(userId);
  }



  render() {
    return <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} />
  }
}


let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status
})

function withRouter(Component) {

  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}


export default
  compose(
    connect(mapStateToProps, { setUserProfile, getUserProfile, getStatus, updateStatus }),
    withRouter,
    //withAuthNavigate,
  )(ProfileContainer)


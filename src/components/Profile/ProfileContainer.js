import React, { Component } from 'react'
import { connect } from 'react-redux';
import Profile from './Profile'
import { setUserProfile, getUserProfile } from './../../redux/profile-reducer'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';



export class ProfileContainer extends Component {
  componentDidMount() {
    let userId = this.props.router.params.userId;
    if (!userId) {
      userId = 28375
    }
    this.props.getUserProfile(userId)
  }



  render() {
    if(!this.props.isAuth){
      return <Navigate to={"/login"} />;
    }
    return <Profile {...this.props} profile={this.props.profile} />
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  isAuth: state.auth.isAuth,
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

export default connect(mapStateToProps, { setUserProfile, getUserProfile, })(withRouter(ProfileContainer));



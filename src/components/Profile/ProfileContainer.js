import axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import Profile from './Profile'
import { setUserProfile } from './../../redux/profile-reducer'
import { useLocation, useNavigate, useParams } from 'react-router-dom';



export class ProfileContainer extends Component {
  componentDidMount() {
    let userId = this.props.router.params.userId;
    if(!userId) {
      userId = 10
    }
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
      .then(response => {

        //Через конкатенацию строк (+) добавляем значение переменной в конец строки запроса

        this.props.setUserProfile(response.data);

      });
  }



  render() {
    
    return <Profile {...this.props} profile={this.props.profile} />
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile
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

export default connect(mapStateToProps, { setUserProfile })(withRouter(ProfileContainer));



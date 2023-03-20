import React, { Component } from 'react'
import { connect } from 'react-redux';
import Header from './Header'
import { setAuthUserData, getAuthUserData } from './../../redux/auth-reducer'

export class HeaderContainer extends Component {
    componentDidMount() {
        this.props.getAuthUserData()
    }

    render() {
        return (
            <Header
                isAuth={this.props.isAuth}
                login={this.props.login}
            />
        )


    }

}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});


export default connect(mapStateToProps, { setAuthUserData, getAuthUserData })(HeaderContainer);
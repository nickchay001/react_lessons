import React, { Component } from 'react'
import { connect } from 'react-redux';
import Header, { DispatchPropsType, MapPropsType, PropsType } from './Header'
import { logout } from '../../redux/auth-reducer'
import { AppStateType } from '../../redux/redux-store';

export class HeaderContainer extends Component<MapPropsType & DispatchPropsType> {
    render() {
        return (
            <Header
                {...this.props}
            />
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});


export default connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, { logout })(HeaderContainer);
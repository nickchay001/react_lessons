import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { AppStateType } from "../redux/redux-store";


let mapStateToPropsNavigate = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})

type MapPropsType = {
    isAuth: boolean
}
type DispatchPropsType = {
}

export function withAuthNavigate<WCP>(WrappedComponent:any) {

    const NavigateComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
        let { isAuth, ...restProps } = props
        if (!isAuth) return <Navigate replace to={"/login"} />;

        return <WrappedComponent {...restProps as WCP} />
    }

    let ConnectesAuthNavigateComponent = connect<MapPropsType, DispatchPropsType, WCP, AppStateType>(
        mapStateToPropsNavigate)
        (NavigateComponent)

    return ConnectesAuthNavigateComponent;
}
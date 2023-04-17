import { connect } from "react-redux";
import { requestUsers, follow, unfollow } from "../../redux/users-reduser";
import React, { Component } from 'react';
import Users from './Users';
import Preloader from "../common/Preloader/Preloader";
import { compose } from "redux";
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from "../../redux/users-selectors";
import { UserType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";


type mapStateToPropsType = {
    currentPage: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    followingInProgress: Array<number>
    pageSize: number
}

type MapDispatchPropsType = {
    requestUsers: (currentPage: number, pageSize: number) => void
    unfollow: () => void
    follow: () => void
}

type OwnPropsType = {
    pageTitle: string
}

type PropsType = mapStateToPropsType & MapDispatchPropsType & OwnPropsType





export class UsersContainer extends Component<PropsType> {
    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        this.props.requestUsers(pageNumber, this.props.pageSize,);
    }

    render() {
        return (
            <> <h2>{this.props.pageTitle}</h2>
                {
                    this.props.isFetching ?
                        <Preloader />
                        : null
                }
                <Users
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    users={this.props.users}
                    unfollow={this.props.unfollow}
                    follow={this.props.follow}
                    followingInProgress={this.props.followingInProgress}


                    onPageChanged={this.onPageChanged} 
                />
            </>
        )
    }
}


/*let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    }
}*/

let mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}


//let mapDispatchToProps = (dispatch) => {
// return {
//  follow: (userId) => {
//      dispatch(followAC(userId));
//  },
//  unfollow: (userId) => {
//      dispatch(unfollowAC(userId));
//  },
//  setUsers: (users) => {
//      dispatch(setUsersAC(users));
//  },
//  setCurrentPage: (pageNumber) => {
//      dispatch(setCurrentPageAC(pageNumber))
//  },
//  setTotalUsersCount: (totalCount) => {
//      dispatch(setUsersTotalCountAC(totalCount))
//  },
//  toggleIsFetching: (isFetching) => {
//      dispatch(toggleIsFetchingAC(isFetching))
//  },
//  //  }
//}


export default compose(
    connect<MapDispatchPropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
        mapStateToProps,
        {
            requestUsers,
            follow,
            unfollow,
        },
    ),
)(UsersContainer)


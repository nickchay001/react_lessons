import { connect } from "react-redux";
import { requestUsers, follow, unfollow, FilterType } from "../../redux/users-reduser";
import React, { Component } from 'react';
import Users from './Users';
import Preloader from "../common/Preloader/Preloader";
import { compose } from "redux";
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from "../../redux/users-selectors";
import { UserType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";


type mapStateToPropsType = {
    currentPage: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    followingInProgress: Array<number>
    pageSize: number
    filter:FilterType
}

type MapDispatchPropsType = {
    //getUsers: (currentPage: number, pageSize: number, term: string) => void
    requestUsers: (currentPage: number, pageSize: number, filter:FilterType) => void
    unfollow: () => void
    follow: () => void
}

type OwnPropsType = {
    pageTitle: string
}

type PropsType = mapStateToPropsType & MapDispatchPropsType & OwnPropsType





export class UsersContainer extends Component<PropsType> {
    componentDidMount() {
        //const { currentPage, pageSize } = this.props
        //this.props.getUsers(currentPage, pageSize, '')

        this.props.requestUsers(this.props.currentPage, this.props.pageSize, this.props.filter);
    }

    onPageChanged = (pageNumber: number, filter:FilterType) => {
        //const { pageSize } = this.props
        //this.props.getUsers(pageNumber, pageSize, '')

        this.props.requestUsers(pageNumber, this.props.pageSize, filter);
    }

    onFilterChanged = (filter: FilterType) => {
        this.props.requestUsers(1, this.props.pageSize, filter);
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
                    onFilterChanged={this.onFilterChanged}

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
        filter:getUsersFilter(state)
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


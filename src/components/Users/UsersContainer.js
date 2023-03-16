import { connect } from "react-redux";
import { follow, setCurrentPage, setUsers, setTotalUsersCount, toggleIsFetching, unfollow, toggleFollowingProgress } from "../../redux/users-reduser";
import React, { Component } from 'react';
import Users from './Users';
import Preloader from "../common/Preloader/Preloader";
import { usersAPI } from "../../api/api";




export class UsersContainer extends Component {
    componentDidMount() {
        this.props.toggleIsFetching(true);
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(data.items);
                //this.props.setTotalUsersCount(response.data.totalCount); Для загрузки всех пользователей
            });
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true);
        usersAPI.getUsers(pageNumber, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(data.items);
            });
    }

    render() {
        return (
            <>
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
                    toggleFollowingProgress={this.props.toggleFollowingProgress}
                    followingInProgress={this.props.followingInProgress}


                    onPageChanged={this.onPageChanged}

                />
            </>
        )
    }
}


let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        toggleFollowingProgress: state.usersPage.toggleFollowingProgress,
        followingInProgress: state.usersPage.followingInProgress,
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



export default connect(
    mapStateToProps,
    {
        follow,
        unfollow,
        setUsers,
        setCurrentPage,
        setTotalUsersCount,
        toggleIsFetching,
        toggleFollowingProgress,
    },
)(UsersContainer);
import { connect } from "react-redux";
import { followSuccess, getUsers, setCurrentPage, unfollowSuccess, toggleFollowingProgress, follow, unfollow } from "../../redux/users-reduser";
import React, { Component } from 'react';
import Users from './Users';
import Preloader from "../common/Preloader/Preloader";




export class UsersContainer extends Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
         this.props.getUsers(pageNumber, this.props.pageSize,);
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
        followSuccess,
        unfollowSuccess,
        setCurrentPage,
        toggleFollowingProgress,
        getUsers,
        follow,
         unfollow,
    },
)(UsersContainer);
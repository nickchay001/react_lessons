import React, { FC, useEffect } from 'react'
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import { UsersSearchForm } from './UsersSearchForm';
import { ActionsTypes, DispatchTypes, FilterType, ThunkType, requestUsers } from '../../redux/users-reduser';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from '../../redux/users-selectors';


type PropsType = {
   
}


export const Users: FC<PropsType> = (props) => {

    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch<DispatchTypes>()

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    },[])


    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }
    const follow = (userId: number) => {
        dispatch(follow(userId))
        
    }
    const unfollow = (userId: number) => {
        dispatch(unfollow(userId))
    }


    return (
        <div>
            <div>
                <UsersSearchForm onFilterChanged={onFilterChanged} />
            </div>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                totalItemsCount={totalUsersCount} pageSize={pageSize} portionSize={10} />
            <div>
                {
                    users.map(u => <User user={u} key={u.id}
                        followingInProgress={followingInProgress}
                        unfollow={unfollow} follow={follow} />)
                }
            </div>
        </div>
    )
}

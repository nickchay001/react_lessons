import React, { FC } from 'react'
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import { UserType } from '../../types/types';
import { UsersSearchForm } from './UsersSearchForm';
import { FilterType } from '../../redux/users-reduser';

type PropsType = {
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    totalUsersCount: number
    users: Array<UserType>
    totalItemsCount: number
    onFilterChanged: (filter: FilterType) => void
    pageSize: number
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}


let Users: FC<PropsType> = ({ currentPage, onPageChanged,
    totalUsersCount, pageSize, users, followingInProgress, unfollow, follow, onFilterChanged }) => {
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






export default Users
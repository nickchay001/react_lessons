import React, { FC } from 'react'
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import { UserType } from '../../types/types';

type PropsType = {
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    totalUsersCount: number
    users: Array<UserType>
    totalItemsCount: number
    pageSize: number
    followingInProgress: Array<number>
    unfollow: (userId:number) => void
    follow: (userId:number) => void
}


let Users: FC<PropsType> = ({ currentPage, onPageChanged,
    totalUsersCount, pageSize, users, followingInProgress, unfollow, follow }) => {
    return (
        <div>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                totalItemsCount={totalUsersCount} pageSize={pageSize} portionSize={0} />
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
import React, { FC, useEffect } from 'react'
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import { UsersSearchForm } from './UsersSearchForm';
import { DispatchTypes, FilterType, requestUsers } from '../../redux/users-reduser';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from '../../redux/users-selectors';
import { useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string';

type PropsType = {}


export const Users: FC<PropsType> = (props) => {

    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch<DispatchTypes>()

    const navigate = useNavigate()
    const location = useLocation()

    type QueryParamsType = {
        term?: string
        page?: string
        friend?: string
    }

    useEffect(() => {
        const parsed = queryString.parse(location.search.substring(1)) as QueryParamsType ;

        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.page) actualPage = Number(parsed.page)

        if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term as string }

        switch (!!parsed.friend) {
            case 'null':
                actualFilter = { ...actualFilter, friend: null }
                break
            case 'true':
                actualFilter = { ...actualFilter, friend: true }
                break
            case 'false':
                actualFilter = { ...actualFilter, friend: false }
                break
        }
        dispatch(requestUsers(actualPage, pageSize, actualFilter))

    }, [])

    useEffect(() => {
        const query: QueryParamsType = {}
        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)

        navigate({
            pathname: '/users',
            search: queryString.stringify(query) 
        })
    }, [filter, currentPage])

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

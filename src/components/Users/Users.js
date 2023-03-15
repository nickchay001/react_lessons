import React from 'react'
import Classes from './Users.module.css'
import userPhoto from './../../assets/images/user.jpg'
import { NavLink } from 'react-router-dom';
import axios from 'axios';

let Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    return (
        <div>
            <div className={Classes.pageNumberContainer}>
                {pages.map(p => {
                    return (<span key={p} className={props.currentPage === p && Classes.selectedPage}
                        onClick={(e) => { props.onPageChanged(p); }}
                    >{p}</span>)
                })}
            </div>
            {
                props.users.map(u =>
                    <div key={u.id}>
                        <span>
                            <div className={Classes.userImage}>
                                <NavLink to={'/profile_content/' + u.id}>
                                    <img alt='#' src={u.photos.small != null ? u.photos.small : userPhoto} />
                                </NavLink>
                            </div>
                            <div>
                                {u.followed
                                    ? <button onClick={() => {
                                        axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,{
                                            withCredentials:true,
                                            headers: {
                                                "API-KEY": "12d97806-a0f5-4c29-b0c2-d36da6964c6e"
                                            }
                                        })
                                        .then(response => {
                                            if(response.data.resultCode === 0) {
                                                props.unfollow(u.id)
                                            }
                                        });

                                        props.unfollow(u.id)
                                    }}>Unfollow</button>
                                    : <button onClick={() => {
                                        axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                            withCredentials:true,
                                            headers: {
                                                "API-KEY": "12d97806-a0f5-4c29-b0c2-d36da6964c6e"
                                            }
                                        })
                                        .then(response => {
                                            if(response.data.resultCode === 0) {
                                                props.follow(u.id)
                                            }
                                        });
                                    }}>Follow</button>}
                            </div>
                        </span>
                        <span>
                            <span>
                                <div>{u.name}</div>
                                <div>{u.status}</div>
                            </span>
                            <span>
                                <div>{"u.location.country"}</div>
                                <div>{"u.location.city"}</div>
                            </span>
                        </span>
                    </div>)
            }
        </div>
    )
}

export default Users
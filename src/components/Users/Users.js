import React from 'react'
import Classes from './Users.module.css'

let Users = (props) => {
 
  if (props.users.length === 0) {
    props.setUsers([
      {
        id: 1, photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfrj6fZysU_uyN8yn-ulp3FK63BrzZoj1AkjycyHOyiBygo5rDLElAfUnm8IKoADJysQA&usqp=CAU',
        followed: false, fullName: 'Dmitro', status: 'I`m a boss', location: { city: 'Kiev', country: 'Ukraine' }
      },
      {
        id: 2, photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfrj6fZysU_uyN8yn-ulp3FK63BrzZoj1AkjycyHOyiBygo5rDLElAfUnm8IKoADJysQA&usqp=CAU',
        followed: true, fullName: 'Chishtof', status: 'Kurwa to ebana', location: { city: 'Warshawa', country: 'Poland' }
      },
      {
        id: 3, photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfrj6fZysU_uyN8yn-ulp3FK63BrzZoj1AkjycyHOyiBygo5rDLElAfUnm8IKoADJysQA&usqp=CAU',
        followed: true, fullName: 'Angela', status: 'I`m a pretty', location: { city: 'Ankara', country: 'Turkey' }
      },
      {
        id: 4, photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfrj6fZysU_uyN8yn-ulp3FK63BrzZoj1AkjycyHOyiBygo5rDLElAfUnm8IKoADJysQA&usqp=CAU',
        followed: false, fullName: 'Dedur', status: 'Sus', location: { city: 'Poligon', country: 'Ukraine' }
      },
    ]
    )
  }

  return (
    <div>{
      props.users.map(u => <div key={u.id}>
        <span>
          <div className={Classes.userImage}>
            <img alt='#' src={u.photoUrl} />
          </div>
          <div>
            {u.followed
              ? <button onClick={() => { props.unfollow(u.id) }}>Unfollow</button>
              : <button onClick={() => { props.follow(u.id) }}>Follow</button>}
          </div>
        </span>
        <span>
          <span>
            <div>{u.fullName}</div>
            <div>{u.status}</div>
          </span>
          <span>
            <div>{u.location.country}</div>
            <div>{u.location.city}</div>
          </span>
        </span>

      </div>)

    }</div>
  )
}


export default Users
import React from 'react'

import MyPostsContainer from './MyPosts/MyPostsContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import { ProfileType } from '../../types/types'

type PropsType = {
  profile: ProfileType | null
  status: string
  isOwner: boolean

  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => Promise<any>
  updateStatus: (status: string) => void
}

const Profile: React.FC<PropsType> = (props) => {
  return (
    <div>
      <ProfileInfo
        saveProfile={props.saveProfile}
        savePhoto={props.savePhoto}
        isOwner={props.isOwner}
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus} />
      <MyPostsContainer />
    </div>
  )
}

export default Profile
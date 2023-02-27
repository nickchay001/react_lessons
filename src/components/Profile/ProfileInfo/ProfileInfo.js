import React, { Component } from 'react'
import Classes from './ProfileInfo.module.css'

export class ProfileInfo extends Component {
    render() {
        return (
            <div>
                <div className={Classes.bunner}>
                    <img alt='#' src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png' />
                </div>
                <div className={Classes.descriptiomBlock}>
                    ava + description
                </div>
            </div>
        )
    }
}

export default ProfileInfo
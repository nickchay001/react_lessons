import React from 'react'
import preloader from './../../../assets/images/preloader.svg'

type PropsType = {

}

let Preloader:React.FC<PropsType> = () => {
        return (
            <div >
                <img alt="" src={preloader} />
            </div>
        )
    }

export default Preloader
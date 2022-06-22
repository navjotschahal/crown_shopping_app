import React from "react";
import './menu-item.styles.scss'

const MenuItem = ({ title, subTitle, backgroundImage, size }) => {
    return <div className={`${size} menu-item`}>

        <div className={`background-image`} style={{
            backgroundImage: `url(${backgroundImage})`
        }}/>

        <div className={`content`}>
            <h1 className="title">{title}</h1>
            <span className="subtitle">{subTitle}</span>
        </div>

    </div>
}

export default MenuItem;
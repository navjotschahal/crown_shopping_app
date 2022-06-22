import React from "react";
import './directory.styles.scss';
import MenuItem from "../menu-item/menu-item.component";
import sections from "./directory.data";

class Directory extends React.Component {
    constructor() {
        super();

        this.state = {
            sections: sections
        }
    }

    render() {
        return (
            <div className="directory-menu">
                {
                    this.state.sections.map((section) => {
                        return (
                            <MenuItem
                                key={section.id} title={section.title.toUpperCase()}
                                backgroundImage={section.backgroundImageUrl}
                                subTitle={`SHOP NOW`} size={section.size}
                            />
                        )
                    })
                }
            </div>
        )
    }
}

export default Directory;

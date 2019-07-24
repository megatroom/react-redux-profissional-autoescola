import React from 'react'
import { withRouter } from "react-router-dom"

const SectionButton = ({title, icon, destination, history}) => (
<div className="section-button">
    <button className="section-button__action" onClick={ () => history.push(`/${destination}`)}>
        <div className="section-button__icon">
        <i className="material-icons">{icon}</i>
        </div>
        <div>
            <span className="section-button__title">{title}</span>
        </div>
    </button>
</div>
)

export default withRouter(SectionButton)
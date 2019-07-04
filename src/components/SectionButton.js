import React from 'react'

const SectionButton = ({title, icon}) => (
<div className="section-button">
    <button className="section-button__action">
        <div className="section-button__icon">
        <i className="material-icons">{icon}</i>
        </div>
        <div>
            <span className="section-button__title">{title}</span>
        </div>
    </button>
</div>
)

export default SectionButton
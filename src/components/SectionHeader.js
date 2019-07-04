import React from 'react'

const SectionHeader = ({ title }) => (
    <div className="section-header">
            <span className="section-header__title">
                {title}
            </span>
            <div>
                <div className="section-header__separator"></div>
            </div>
    </div>
)

export default SectionHeader
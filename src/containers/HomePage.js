import React from 'react'
import SectionHeader from '../components/SectionHeader'
import SectionButton from '../components/SectionButton'

class HomePage extends React.Component {
    render() {
        return(
            <div className="container">
                <SectionHeader title={"Serviços"} />
                <SectionButton title={"Aula Teórica"} icon={"edit"} destination={"classes"}/>
                
                <SectionHeader title={"Cadastros"} />
                <SectionButton title={"Alunos"} icon={"person"} destination={"Students"}/>
            </div>
        );
    }
}

export default HomePage
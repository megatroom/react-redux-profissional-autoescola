import React, {Fragment} from 'react'

import AppBar from '../components/AppBar'
import SectionHeader from '../components/SectionHeader';
import SectionButton from '../components/SectionButton';

class App extends React.Component {

    render() {
        return(
            <Fragment>
                <AppBar />
                <div className="container">
                    <SectionHeader title={"Serviços"} />
                    <SectionButton title={"Aula Teórica"} icon={"edit"} />
                    
                    <SectionHeader title={"Cadastros"} />
                    <SectionButton title={"Alunos"} icon={"person"} />
                </div>
            </Fragment>
        );
    }
}

export default App
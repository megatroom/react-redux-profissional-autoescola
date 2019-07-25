import React, {Fragment} from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"

import AppBar from '../components/AppBar'
import NavigationDrawer from '../components/NavigationDrawer'
import HomePage from './HomePage'
import TheoryLessons from './TheoryLessons'
import Students from './Students'

class App extends React.Component {

    state = {
        isMenuOpen: false
    }

    handleOpenMenu = () => {
        this.setState({ isMenuOpen: true })
    }

    handleCloseMenu = () => {
        this.setState({ isMenuOpen: false })
    }

    render() {
        
        const {isMenuOpen} = this.state;

        return(
            <Router>
                <Fragment>
                    <AppBar onOpenMenu={this.handleOpenMenu} onCloseMenu={this.handleCloseMenu} isMenuOpen={isMenuOpen} />
                    <Route path="/" exact render={props => <HomePage/>} />
                    <Route path="/students" exact render={props=> <Students />} />
                    <Route path="/classes" exact render={props=> <TheoryLessons />} />
                    <NavigationDrawer onCloseMenu={this.handleCloseMenu} isOpen={isMenuOpen}/>
                </Fragment>
            </Router>
        );
    }
}

export default App
import React, { Component } from 'react';

import SettingsContext from './SettingsContext';

const themes = [
  { key: 'default', label: 'Padrão', style: { backgroundColor: 'darkslateblue', color: 'white' } },
  { key: 'classic', label: 'Clássico', style: { backgroundColor: 'maroon', color: 'white' } },
  { key: 'light', label: 'Light', style: { backgroundColor: 'white' } }
];

class SettingsProvider extends Component {
  state = {
    themes: themes,
    selectedTheme: themes[0]
  };

  handleToggleTheme = selectedTheme => {
    this.setState({ selectedTheme });
  };

  render() {
    const { themes, selectedTheme } = this.state;

    return (
      <SettingsContext.Provider value={{ themes, selectedTheme, toggleTheme: this.handleToggleTheme }}>
        {this.props.children}
      </SettingsContext.Provider>
    );
  }
}

export default SettingsProvider;

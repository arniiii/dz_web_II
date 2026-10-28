import React from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

import ThemeContext from './contexts';

class ThemeSwitcher extends React.Component {
  // BEGIN (write your solution here)
  static contextType = ThemeContext;

  render() {
    const { themes, theme, setTheme } = this.context;
    return (
      <ButtonGroup className="mb-2">
        {themes.map((item) => (
          <ToggleButton key={item.id} id={`theme-${item.id}`} type="radio" name="theme" variant="secondary"
            checked={theme.id === item.id} value={item.id} onChange={() => setTheme(item)}>
            {item.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    );
  }
  // END
}

export default ThemeSwitcher;

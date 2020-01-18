import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import Header from './header';
import Footer from './footer';
import '../styles/index.css';
import layoutStyles from './layout.module.css';
import { darkTheme, lightTheme } from '../styles/theme';

const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text}
  }
`;

class Layout extends React.Component {
  constructor(props) {
    super(props);
    // const [isLight, setLight] = useState('light');
    // window.localStorage.setItem('theme', isLight);
    this.handleThemeSwitching = this.handleThemeSwitching.bind(this);
    this.state = {
      theme: !window.localStorage.getItem('theme') ? 'light' : window.localStorage.getItem('theme')
    };
  }
  
  // componentDid

  handleThemeSwitching() {
    if (this.state.theme === 'light') {
      this.setState({ theme: 'dark' });
    } else {
      this.setState({ theme: 'light' });
    }
    window.localStorage.setItem('theme', this.state.theme);
  }

  componentDidUpdate() {
    window.localStorage.setItem('theme', this.state.theme);
  }
  
  render() {
    return (
      <ThemeProvider theme={(this.state.theme === 'light') ? lightTheme : darkTheme}>
        <GlobalStyles />
        <div className={layoutStyles.container}>
          <div className={layoutStyles.content}>
            <Header
              handleThemeSwitching={this.handleThemeSwitching}
              isLight={this.state.theme}
            />
            {this.props.children}
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    );
  }
}

export default Layout;
import React, { Component } from 'react'; 
import './App.css';
import Main from './Components/main';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';


class App extends Component {

  render() {
    return (
      <Provider store={ConfigureStore()}>
        <BrowserRouter>
          <div className="app">
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;

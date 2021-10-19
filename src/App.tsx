import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route path='/auth'>
          <header className='App-header'>
            <img src={logo} className='App-logo' alt='logo' />
            <p>This is auth page</p>
            <Link to='/'>Back to Home Page</Link>
          </header>
        </Route>
        <Route path='/' exact>
          <header className='App-header'>
            <img src={logo} className='App-logo' alt='logo' />
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <Link to='/auth'>Sign In</Link>
          </header>
        </Route>
      </Switch>
    </div>
  );
}

export default App;

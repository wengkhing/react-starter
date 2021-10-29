import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './app.route';
import './App.scss';

function App() {
  return (
    <div className='App'>
      <Switch>
        {routes.map((props, key) => (
          <Route key={key} {...props} />
        ))}
      </Switch>
    </div>
  );
}

export default App;

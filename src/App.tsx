import React from 'react';
import logo from './logo.svg';
import './App.css';
import store from './store';

const App: React.FC = () => {
  const counter = store.getState().counter;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload {counter}.
        </p>
        <button onClick={() => store.dispatch({ type: 'increment' })}>Increment</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

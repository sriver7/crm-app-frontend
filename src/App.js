import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This will be the front end for this project
        </p>
        <p>
          Sonny Rivera-Ruiz - COSC 880
        </p>
        <p>
          CRM
        </p>
        <a
          className="App-link"
          href="https://github.com/sriver7/crm-app-frontend"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </header>
    </div>
  );
}

export default App;

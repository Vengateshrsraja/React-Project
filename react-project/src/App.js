import logo from './logo.svg';
import './App.css';
import Project from './component/project';
function App() {
  const containerStyle = {
    backgroundColor: 'black', 
    color: 'white', 
    textAlign: 'center',
  };
  return (
    <div style={containerStyle}>
      <h1 style={containerStyle}> Welcome to Our React project</h1>
      < Project />
    </div>
  );
}

export default App;

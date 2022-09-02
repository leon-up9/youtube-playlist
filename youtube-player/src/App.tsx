import "./App.css";
import Player from "./components/Player/Player";
import PlayerList from "./components/PlayerList/PlayerList";

function App() {
  return (
    <div className="App">
      <PlayerList />
      <Player />
    </div>
  );
}

export default App;

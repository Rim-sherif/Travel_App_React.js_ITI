import "./App.css";
import Footer from "./componants/Footer/Footer";
import TripsList from "./componants/Triplist/TripList";
import Video from "./componants/Video/Video";
// import Chat from './componants/Chat/Chat';
// import ChatPage from "./componants/Chat/Chat";

function App() {
  return (
    <div className="">
      <TripsList/>
    <Video/>
    <Footer/>

      {/* <ChatPage/> */}
    </div>
  );
}

export default App;

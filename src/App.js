import './App.css';
import './login.css';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Login from './components/Login';
import Main from './components/Main';
import SignUp from './components/Signup';
import CronJobs from './components/CronJobs';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login key="login"/>} />
        <Route exact path="/signup" element={<SignUp key="signup"/>} />
        <Route exact path="/" element={<Main page="inbox" key="inbox"/>} />
        <Route exact path="/sent" element={<Main page="sent" key="sent"/>} />
        <Route exact path="/hover" element={<Main page="hover" key="hover"/>} />
        <Route exact path="/float" element={<Main page="float" key="float"/>} />
        <Route exact path="/stride" element={<Main page="stride" key="stride"/>} />
        <Route exact path="/disappear" element={<Main page="disappear" key="disapear"/>} />
        <Route exact path="/haunt" element={<Main page="haunt" key="haunt"/>} />
        <Route exact path="/save" element={<Main page="save" key="save"/>} />
        <Route exact path="/read" element={<Main page="read" key="read"/>} />
        <Route exact path="/triggers" element= {<CronJobs key="triggers"/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

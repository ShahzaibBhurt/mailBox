import './App.css';
import './login.css';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Login from './components/Login';
import Main from './components/Main';
import SignUp from './components/Signup';
import { useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import moment from 'moment';

const DeleteEmails = gql`mutation deleteEmails($dateTime: timestamptz!) {
  delete_mails(where: {will_delete: {_lte: $dateTime}}) {
    affected_rows
  }
}`;

function App() {
  const [deleteEmail] = useMutation(DeleteEmails);
  useEffect(()=>{
    setInterval(()=>{
      var dateTime = moment().format()
      deleteEmail({variables:{dateTime}})
    },3600000)
  })
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;

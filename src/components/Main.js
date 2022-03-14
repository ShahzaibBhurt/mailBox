import { gql, useMutation } from '@apollo/client';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Datatable from './Datatable';
import Message from './Message';
import SideMenu from './SideMenu';

// Define mutation
const Move = gql`mutation move($id: Int!, $page: String!, $time:timestamptz!) {
  update_mails(where: {id: {_eq: $id}}, _set: {folder: $page, will_delete: $time}) {
    affected_rows
  }
}`;
// Define mutation
const deleteMail = gql`mutation deleteMail($id: Int!) {
  delete_compose_emails_by_pk(id: $id) {
    id
  }
}`;

const actionsOpt = [
  "inbox",
  "hover",
  "float",
  "stride",
  "disappear",
  "haunt",
  "save",
]

function Main({page}) {
  const navigate = useNavigate();
  const location = useLocation()
  const [msgData, setMsgData] = useState()
  const [selRows, setSelRows] = useState()
  //checking if user is already login
  const uid = localStorage.getItem("uid")
  useEffect(()=>{
      if(!uid){
          navigate('/login')
      }
  },[uid])// eslint-disable-line react-hooks/exhaustive-deps

  // Pass mutation to useMutation
  const [changeFolder, { loading:Moveloading }] = useMutation(Move);
  const [deleteMails, { loading:deleteMailLoading }] = useMutation(deleteMail);
  
    const columns = [
        /* {
           cell: (e) => <button className='btn btn-transparent' onClick={()=>handleEdit(e)}><i className='far fa-edit'></i></button>,
           ignoreRowClick: true,
           allowOverflow: true,
           button: true,
           maxWidth:'10%',
           minWidth:'30px'
         },
         {
           cell: (e) => <button className='btn btn-transparent' onClick={()=>handleDelete(e)}><i className='far fa-trash-alt'></i></button>,
           ignoreRowClick: true,
           allowOverflow: true,
           button: true,
           maxWidth:'10%',
           minWidth:'30px'
         },*/
         {
           selector: row => row.receiverData.first_name+" "+row.receiverData.last_name,
           ignoreRowClick: true,
           sortable: true,
           minWidth:"20%",
           maxWidth:"30px"
         },
         {
          selector: row => row.subject,
          sortable: true,
          minWidth:"20%",
           maxWidth:"30px"
        },
         {
           selector: row => row.msg,
           sortable: true,
         }
       ];
       const handleLogout =()=>{
         localStorage.removeItem("uid");
         navigate("/login")
       }
       const msgD =  location.state
       useEffect(()=>{
         if(msgD){
          setMsgData(msgD)
         }
       },[msgD])
      const handleAction =(page)=>{
        var time = ""

        switch(page){
          case 'hover':
            time = moment().add(30, 'days').format()
            break;
          case 'float':
            time = moment().add(1, 'days').format();
            break;
          case 'stride':
            time = moment().add(60, 'days').format();
            break;
          case 'disappear':
            time = moment().add(1, 'hour').format();
            break;
          case 'haunt':
            time = moment().add(60, 'days').format();
            break;
          case 'save':
            time = null;
            break;
          default:
            time = moment().add(1, 'days').format();
            break;
        }
        if(selRows){
          selRows.map((row)=>{
            return changeFolder({variables:{id:row.id, page, time}})
          })
        }
      }
      const handleDelete = ()=>{
        if(selRows){
          var c = window.confirm("Are you sure you want to delete these emails");
          if(c){
            selRows.map((row)=>{
              return deleteMails({variables:{id:row.id}})
            })
          }
        }
      }
  return (
    <div className="container-fluid mailCon">
      <div className="row inbox-wrapper">
          <div className="col-lg-12">
                <div className="row">
                  <SideMenu/>
                  <div className="col-lg-9 email-content">
                    <div className='d-flex justify-content-between mb-3'>
                      {(page !== 'sent')?
                      <div className="dropdown">
                      <button className="btn btn-primary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
                        action
                      </button>
                      <ul className="dropdown-menu">
                        {actionsOpt.map((p)=>{
                          return (page !== p) && 
                          <li key={p} style={{cursor:"pointer"}} onClick={()=>handleAction(p)} className="dropdown-item">move to {p}</li>
                        })}
                      </ul>
                    </div>:
                    <button className='btn btn-outline-danger btn-sm' onClick={handleDelete}>Delete</button>
                      }
                      <button className='btn btn-outline-primary float-right btn-sm' onClick={handleLogout}>Logout</button>
                    </div>
                    
                    {(Moveloading || deleteMailLoading)?"Please wait...":
                      (page === 'read')?
                       (msgData) && <Message data={msgData}/>:
                      <Datatable columns={columns} page={page} response={s=>setSelRows(s)}/>
                    }
                  </div>
                  {/*<Message/>*/}
                </div>
          </div>
        </div>
      </div>
  )
}

export default Main
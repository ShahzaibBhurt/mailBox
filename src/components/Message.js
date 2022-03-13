import React from 'react'
import { useNavigate } from 'react-router-dom'

function Message({data}) {
  const navigate = useNavigate();
    return (
        <div className="col-lg-12 email-content">
              <div className="email-head">
                <div className="email-head-subject">
                  <div className="title d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <button className='btn btn-primary rounded-circle px-2 mr-3 text-center' onClick={() => navigate(-1)}><i className="fa fa-angle-left"></i></button> 
                      <span>{data.subject}</span>
                    </div>
                    {/*<div className="icons">
                      <a href="#" className="icon">44<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" strokelinejoin="round" className="feather feather-share text-muted hover-primary-muted" data-toggle="tooltip" title="" data-original-title="Forward"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg></a>
                      <a href="#" className="icon">33<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" strokelinejoin="round" className="feather feather-printer text-muted" data-toggle="tooltip" title="" data-original-title="Print"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg></a>
                      <a href="#" className="icon">22<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" strokelinejoin="round" className="feather feather-trash text-muted" data-toggle="tooltip" title="" data-original-title="Delete"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      </a>
                    </div>*/}
                  </div>
                </div>
                <div className="email-head-sender d-flex align-items-center justify-content-between flex-wrap">
                  <div className="d-flex align-items-center">
                    <div className="avatar">
                      {data.receiverData.first_name[0]+data.receiverData.last_name[0]}
                    </div>
                    <div className="sender d-flex align-items-center">
                      <p className='mb-0'>{data.receiverData.first_name+" "+data.receiverData.last_name} to me</p> {/*<span>to</span><a href="#">me</a>*/}
                      {/*<div className="actions dropdown">
                        <a className="icon" href="#" data-toggle="dropdown"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" strokelinejoin="round" className="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg></a>
                        <div className="dropdown-menu" role="menu">
                          <a className="dropdown-item" href="#">Mark as read</a>
                          <a className="dropdown-item" href="#">Mark as unread</a>
                          <a className="dropdown-item" href="#">Spam</a>
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item text-danger" href="#">Delete</a>
                        </div>
                      </div>*/}
                    </div>
                  </div>
                  <div className="date"></div>
                </div>
              </div>
              <div className="email-body">
                <p>{data.msg}</p>             
              </div>
            </div>
    )
}

export default Message
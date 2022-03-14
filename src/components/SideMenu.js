import { gql, useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

const addEmailQue = gql`mutation MyMutation($msg:String!, $sen:String!, $rec:String!, $sub:String!, $page:String!) {
	insert_mails(objects: {msg: $msg, receiver: $rec, sender: $sen, subject:$sub, folder:$page}) {
	  affected_rows
	}
	insert_compose_emails(objects: {msg: $msg, receiver: $rec, sender: $sen, subject: $sub}) {
		affected_rows
	}
}`;

function SideMenu() {
	const { pathname } = useLocation();
	//var date = new Date();
	//date = date.getDate()+"/"+(date.getMonth() + 1) + "/" +date.getFullYear()
	const user_email = localStorage.getItem("email");
	const name = localStorage.getItem("name");

	const [uInput, setInput] = useState({sub:"", msg:"", sen:user_email, rec:"", page:"inbox"})
     
    const [addEmail, { data, loading}] = useMutation(addEmailQue);
	
	const onChange =(e)=>{
        setInput({...uInput, [e.target.name]: e.target.value})
    }

	useEffect(()=>{
		if(data)
		if(data.insert_mails.affected_rows === 1)
		setInput({sub:"", msg:"", sen:user_email, rec:"", page:"inbox"})
	},[data])// eslint-disable-line react-hooks/exhaustive-deps

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const {sub, msg, sen, rec, page} = uInput;
		addEmail({variables: { sub, msg, sen, rec, page}});
    }

    return (
        <>
        <div className="col-lg-3 email-aside border-lg-right">
            <div className="aside-content">
                <div className="aside-header">
                    <button className="navbar-toggle" data-target=".aside-nav" data-toggle="collapse" type="button"><span className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokelinecape="round" strokeLinejoin="round" className="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg></span></button><span className="title text-center"><b>Forsvinna</b></span>
                    <p className="description mt-2 text-center mb-0">{name}</p>
                </div>
                <div className="aside-compose">
                    <a className="btn btn-primary btn-block" data-toggle="modal" data-target="#compose-modal" href='/'>Compose Email</a>
                </div>
                <div className="aside-nav collapse">
                    <ul className="nav">
                        <li className={(pathname === '/')?"active":""}>
							<Link to="/">
								<span className="icon">
									<i className="fa fa-inbox mr-3" style={{fontSize:"20px"}}></i></span>
									Inbox{/*<span className="badge badge-danger-muted text-white font-weight-bold float-right">2</span>*/}
							</Link>
						</li>
                        <li className={(pathname === '/sent')?"active":""}>
							<Link to="/sent">
								<span className="icon"><i className="fa fa-envelope mr-3"></i></span>
								Sent Mail
							</Link>
						</li>
                        <li className={(pathname === '/hover')?"active":""}>
							<Link to="/hover">
								<span className="icon">
									<i className="fa fa-briefcase mr-3"></i>
								</span>Sveima
							</Link>
						</li>
                        <li className={(pathname === '/float')?"active":""}>
							<Link to="/float">
								<span className="icon">
									<i className="fa fa-briefcase mr-3"></i>
								</span>Fljóta
							</Link>
						</li>
                        <li className={(pathname === '/stride')?"active":""}>
							<Link to="/stride">
								<span className="icon">
									<i className="fa fa-star mr-3"></i>
								</span>Skref
							</Link>
						</li>
                        <li className={(pathname === '/disappear')?"active":""}>
							<Link to="/disappear">
								<span className="icon">
									<i className="fa fa-trash mr-3"></i>
								</span>Hverfa
							</Link>
						</li>
                        <li className={(pathname === '/haunt')?"active":""}>
							<Link to="/haunt">
								<span className="icon">
									<i className="fa fa-file mr-3"></i>
								</span>ásækja
							</Link>
						</li>
                        <li className={(pathname === '/save')?"active":""}>
							<Link to="/save">
								<span className="icon">
									<i className="fa fa-file mr-3"></i>
								</span>Save
							</Link>
						</li>
                    </ul>
                </div>
            </div>
        </div>
        {/* BEGIN COMPOSE MESSAGE */}
					<div className="modal fade" id="compose-modal" tabIndex="-1" role="dialog" aria-hidden="true">
						<div className="modal-wrapper">
							<div className="modal-dialog">
								<div className="modal-content">
									<div className="modal-header bg-blue">
                                    <h4 className="modal-title"><i className="fa fa-envelope"></i> Compose New Message</h4>
										<button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
									</div>
									{(data) && (data.insert_mails.affected_rows === 1) &&
									<div className="alert alert-success alert-dismissible fade show" role="alert">
										Email Sent
										<button type="button" className="close" data-dismiss="alert" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									}
									<form onSubmit={handleSubmit}>
										<div className="modal-body">
											<div className="form-group">
												<input name="rec" type="email" value={uInput.rec} onChange={onChange} className="form-control" placeholder="To"/>
											</div>
											<div className="form-group">
												<input name="sub" type="text" value={uInput.sub} onChange={onChange} className="form-control" placeholder="Subject"/>
											</div>
											<div className="form-group">
												<textarea name="msg" value={uInput.msg} onChange={onChange} className="form-control" placeholder="Message"></textarea>
											</div>
											{/*<div className="form-group">
												<input type="file" name="attachment"/>
											</div>*/}
										</div>
										<div className="modal-footer">
											<button type="button" className="btn btn-default" data-dismiss="modal"><i className="fa fa-times"></i> Discard</button>
											<button type="submit" className="btn btn-primary pull-right" disabled={(loading)?true:false}><i className="fa fa-envelope"></i>{(loading)?"Sending...":"Send Message"}</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
					{/* END COMPOSE MESSAGE */}
        </>
    )
}

export default SideMenu
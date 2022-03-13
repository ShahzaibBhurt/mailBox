import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

// Define mutation
const Signup = gql`mutation Signup($fname:String!, $lname:String!, $email:String!, $password:String!) {
    insert_users_one(object: {first_name:$fname, last_name:$lname, email:$email, password:$password}) {
      email
      password
    }
  }`;

export default function SignUp() {
    const navigate = useNavigate();
    const [creds, setCreds] = useState({fname:"", lname:"", email:"", password:"", re_pass:""});
    const [err, setErr] = useState();

    //checking if user is already login
    const uid = localStorage.getItem("uid")
    useEffect(()=>{
        if(uid){
            navigate('/')
        }
    }, [uid]) // eslint-disable-line react-hooks/exhaustive-deps
    // Pass mutation to useMutation
    const [addUser, { data, loading, error }] = useMutation(Signup);

    useEffect(()=>{
        if(error){
            setErr("Please choose a unique email address")
        }
        if(data){
            setErr("")
        }
    }, [error, data])

    const onChange =(e)=>{
        setCreds({...creds, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const {fname, lname, email, password, re_pass} = creds;
        if(password === re_pass){
            addUser({variables: { fname, lname, email, password}});
        }else{
            setErr("Password not match!")
        }
    }
    return (
        <div className='loginBody'>
            <div className="loginForm">
                <div className="text-center mb-3">
                    <h2 className='fw-bold'>The MailBox</h2>
                </div>
                {(err) &&
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {err}
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>}
                {(data) &&
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    Your account is created successfully
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                }
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <label className='mb-0'>First Name</label>
                                <input type="text" name="fname" onChange={onChange} value={creds.fname} required/>
                            </div>
                            <div className='col-md-6'>
                                <label className='mb-0'>Last Name</label>
                                <input type="text" name="lname" onChange={onChange} value={creds.lname} required/>
                            </div>
                            <div className='col-md-12'>
                                <label className='mb-0'>Email</label>
                                <input type="email" name="email" onChange={onChange} value={creds.email} required/>
                            </div>
                            <div className='col-md-6'>
                                <label className='mb-0'>Password</label>
                                <input type="password" name='password' onChange={onChange} value={creds.password} required/>
                            </div>
                            <div className='col-md-6'>
                                <label className='mb-0'>Re Password</label>
                                <input type="password" name='re_pass' onChange={onChange} value={creds.re_pass} required/>
                            </div>
                            <div className='col-md-12'>
                                <input type="submit" value={(loading)?"Loading...":"Sign Up"} disabled={(loading)?true:false}/>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <p className='mb-0'>Already member?</p>
                        <Link className='mb-0' to="/login">Sign In</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

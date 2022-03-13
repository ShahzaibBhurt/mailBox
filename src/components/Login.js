import { gql, useLazyQuery} from '@apollo/client';
import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';

// Define Query
const login = gql`query Login($email: String!, $password: String!) {
    users(where: {_and: {email: {_eq: $email}, password: {_eq: $password}}}) {
      id
      first_name
      last_name
      email
    }
  }`;

export default function Login() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({email:"", password:""});
    const [err, setErr] = useState();

    //checking if user is already login
    const uid = localStorage.getItem("uid")
    useEffect(()=>{
        if(uid){
            navigate('/')
        }
    }, [uid])// eslint-disable-line react-hooks/exhaustive-deps

    const [getLogin, { loading, error, data }] = useLazyQuery(login);

    useEffect(()=>{
        if(data){
            if(data.users.length > 0){
                const {id, first_name, last_name, email} = data.users[0];
                localStorage.setItem("uid", id)
                localStorage.setItem("name", first_name+" "+last_name)
                localStorage.setItem("email", email)
                navigate('/')
            }else{
                setErr("invailid credentials")
            }
        }
    },[data, error])// eslint-disable-line react-hooks/exhaustive-deps

    const onChange =(e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const {email, password} = credentials
        getLogin({variables: { email, password }})
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
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='mb-0'>Your Email</label>
                        <input type="email" name="email" onChange={onChange} value={credentials.email} required/>
                        <label className='mb-0'>Your Password</label>
                        <input type="password" name='password' onChange={onChange} value={credentials.password} required/>
                        <input type="submit" value={(loading)?"Please wait...":"Login"} disabled={(loading)?true:false}/>
                    </div>
                    <div className="text-center">
                        <p className='mb-0'>Not a member?</p>
                        <Link className='mb-0' to="/signup">Sign Up</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

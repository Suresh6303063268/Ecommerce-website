import React, {useState} from 'react';

function Login() {

const[data,setData]=useState({
    username:'',
    password:''
})

const{username,password} =data;

const changehandler = e => {
    setData({...data,[e.target.name]:[e.target.value]})
}

const handlersubmit =e =>{
    e.preventDefault();
    console.log(data);
}


  return (
    <div>
      <form onSubmit={handlersubmit}>
        <input type='text' name='username'    value={username} placeholder='Enter the User Name'  onChange={changehandler} /> <br/>
        <input type='password' name='password'    value={password} placeholder='Enter the Password' onChange={changehandler} /> <br/>
        <input type='submit' name='submit'   />
      </form>
    </div>
  )
}

export default Login

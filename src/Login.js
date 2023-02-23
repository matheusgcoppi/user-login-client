import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, Link } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate()
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const info = {email, password}

    fetch("https://deploy-api-login.up.railway.app/login", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info)
    }).then(async response => {
        console.log(response.body)
        try {
         const data = await response.json()
         console.log(data)
         
         if(data.sucess === "true") {
            console.log("You're loggin in"); 
            navigate("/logged")   
            
        }
        if(data.sucess === "false") {
          console.log("There's something wrong with the password");  
          navigate("/register")    
      }
            
       } catch(error) {
         console.log('Error happened here!')
         console.error(error)
       }
      })
    }

    return ( 

        <div className="all ">
                
            <p className='text-center'>Sign With:</p>
        
        <div className="container d-flex justify-content-center">
            
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" value = {email} onChange={(e) => setEmail (e.target.value)} placeholder="Enter email" required/>
        </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value = {password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <Button className="btn-sign-up" variant="danger">
      <Link className="btn-sign" to="/register">
      Sign Up
      </Link>
      </Button>
    </Form>
        </div>
            </div>
     );
}
 
export default Login;
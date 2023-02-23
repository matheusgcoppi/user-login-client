import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router';
const Register = () => {

    const navigate = useNavigate()

    const [firstName, setFirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [role, setRole] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [wrongPassword, setWrongPassword] = useState(false)
    const [wrongEmail, setEmailPassword] = useState(false)


    const handleSubmit = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            setWrongPassword(true)
            return
        }
        
        const createUser = {firstName,lastName,role,age, email, password}
        console.log(createUser)

        fetch("https://deploy-api-login.up.railway.app/register", {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(createUser)
    }).then(async response => {
        console.log("testre")
        
        try {
            const data = await response.json()
            console.log(data)
            setWrongPassword(false)

            if(data.sucess === "true") {
                navigate('/')
            }

            if(data.error === "email") {
                setEmailPassword(true)
                setWrongPassword(false)
                return
            }
            
            
       } catch(error) {
         console.log('Error happened here!')
         console.error(error)
       }
      })
    }
        
    
    return ( 
        <div className='all1'>
        <div className="container d-flex justify-content-center">
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>

          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Last Name" value={lastName} onChange={(e) => setlastName(e.target.value)} />

          <Form.Label>Role</Form.Label>
          <Form.Control type="text" placeholder="role" value={role} onChange={(e) => setRole(e.target.value)}/>

          <Form.Label>Age</Form.Label>
          <Form.Control type="number" placeholder="age" value={age} onChange={(e) => setAge(parseInt(e.target.value))}/>

          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>

          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
          <div>{wrongPassword && <p className="text-danger">Those passwords didn't match. Try again.</p>}</div>
          <div>{wrongEmail && <p className="text-danger">There is an email with the same characters</p>}</div>

         
        </Form.Group>
        
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      </div>
      
      </div>
     );
}
 
export default Register;
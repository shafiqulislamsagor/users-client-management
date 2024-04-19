
import { useEffect, useState } from 'react'
import './App.css'

function App() {
    const [user , setUser] = useState([])
    useEffect(()=>{
        fetch('http://localhost:3000/users')
        .then(res=> res.json())
        .then(data=> setUser(data))
    },[])
    const fromHandler = event =>{
        event.preventDefault()
        const from = event.target
        const name = from.name.value
        const email = from.email.value
        const newUser = {name,email}
        newUser.id = user.length + 1
        // console.log(newUser);
        fetch('http://localhost:3000/users',{
            method:'post',
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(newUser)
        })
        .then(res=>res.json())
        .then(data=> {
            const allUsers = [...user,data]
            setUser(allUsers)
            from.reset()
            // console.log(data);
        })
    }
    return (
        <>
            <h2>Users Client Management</h2>
            <h2>Users Length : {user.length}</h2>
            <form onSubmit={fromHandler}>
                <input type="text" name="name" id="name" />
                <br />
                <input type="email" name="email" id="email" />
                <br />
                <input type="submit" value="Added" />
            </form>
            <div>
                {
                    user.map(user => <h2 key={user.id}>id: {user.id} name: {user.name} email: {user.email}</h2>)
                }
            </div>
        </>
    )
}

export default App

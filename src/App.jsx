/* eslint-disable no-undef */

import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])
  const fromHandle = event => {
    event.preventDefault()
    const from = event.target;
    const name = from.name.value
    const email = from.email.value
    const user = { name, email }
    console.log(user);
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        const newUser = {...users,data}
        setUsers(newUser)
        console.log(user);
        console.log(data);
        console.log(newUser);
        from.reset()
      } )
  }
  // console.log(users);
  return (
    <>
      <h2>Users Client Management</h2>
      <h2>Users Length : {users.length}</h2>
      <form onSubmit={fromHandle}>
        <input type="text" name="name" id="name" />
        <br />
        <input type="email" name="email" id="email" />
        <br />
        <input type="submit" value="Added" />
      </form>
      <div>
        {
          users.map(user => <h2 key={user.id}>id: {user.id} name: {user.name} email: {user.email}</h2>)
        }
      </div>
    </>
  )
}

export default App

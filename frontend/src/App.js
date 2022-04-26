import {io} from 'socket.io-client'
import {useState, useEffect} from 'react'

const socket = io('http://localhost:3001')


function App() {
  const [user,set_user] = useState('')
  const [mensaje,set_mensaje] = useState('')
  const [mensajes,set_mensajes] = useState('')

  const handle_input = ({target}) =>{
    set_user(target.value)
  }
  const handle_message = ({target}) =>{
    set_mensaje(target.value)
  }
  const handle_click = () => {
    socket.emit('new',{user,mensaje})
  }

  useEffect(() => {
    socket.on('mensaje',data =>{
      set_mensajes(data)
    })
  }, [socket])

  return (
    <main>
      <div>
        <h1>Hi {user}</h1>
        <input type="text" onChange={handle_input}/>
        <h2>what do u want to say today</h2>
        <input type="text" onChange={handle_message}/>
        <button onClick={handle_click}>Send</button>
      </div>
      <div>
        <h1>{mensajes.user}</h1>
        <p>{mensajes.mensaje}</p>
        <br/>
      </div>
    </main>
  )
}

export default App;

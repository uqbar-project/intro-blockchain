import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { createRef, useState } from 'react'
import { Toast } from 'primereact/toast'
import { useNavigate } from 'react-router-dom'
import { usuarioService } from 'src/services/usuarioService'
// eslint-disable-next-line no-unused-vars
import * as blockchainService from 'src/services/blockchainService'

export function LoginForm() {
  const navigate = useNavigate()
  const toast = createRef()
  
  async function login() {
    try {
      await usuarioService.login(usuario, password)
      navigate('/wallet')
    } catch (e) {
      console.log(e)
      toast.current.show({severity: 'error', summary: 'Usuario o contraseña incorrectos', detail: e.message})
    }
  }

  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  return (
    <div>
      <div className="titulo">Login</div>
      <div className="section-header">
        <b>Usuario</b>
      </div>
      <div className="section-group">
        <InputText placeholder="Usuario (como dodain, juan o dini)" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
      </div>
      <div className="section-header">
        <b>Contraseña</b>
      </div>
      <div className="section-group">
        <Password value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="section-group">
        <Button label="Ingresar" icon="pi pi-user" onClick={login} />
      </div>
      <div className="section-group">
        <Toast ref={toast}></Toast>
      </div>
    </div>  
  )
}
import { InputText } from 'primereact/inputtext'
import {Password} from 'primereact/password'
import { Button } from 'primereact/button'
import { createRef, useState } from 'react'
import { Toast } from 'primereact/toast'
import { useHistory } from 'react-router-dom'
import { usuarioService } from '../services/usuarioService'

export function LoginForm() {
  const history = useHistory()
  const toast = createRef()
  
  async function login() {
    try {
      await usuarioService.validar(usuario, password)
      history.push('/wallet')
    } catch (e) {
      console.log(e)
      toast.current.show({severity: 'error', summary: 'Usuario o contraseña incorrectos', detail: e.message})
    }
  }

  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  return (
    <div>
      <div class="titulo">Login</div>
      <div class="section-header">
        <b>Usuario</b>
      </div>
      <div class="section-group">
        <InputText placeholder="Usuario (como dodain, juan o dini)" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
      </div>
      <div class="section-header">
        <b>Contraseña</b>
      </div>
      <div class="section-group">
        <Password value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div class="section-group">
        <Button label="Ingresar" icon="pi pi-user" onClick={login} />
      </div>
      <div class="section-group">
        <Toast ref={toast}></Toast>
      </div>
    </div>  
  )
}
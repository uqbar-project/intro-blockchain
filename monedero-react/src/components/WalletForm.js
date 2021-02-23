import { billeteraService, usuarioService } from '../services/usuarioService'
import { Chip } from 'primereact/chip'
import { Knob } from 'primereact/knob'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { useHistory } from 'react-router-dom'
import { createRef, useState } from 'react'

export function WalletForm() {
  const usuario = usuarioService.usuario
  const [saldo, setSaldo] = useState(usuarioService.saldo)
  const [monto, setMonto] = useState(0)
  const toast = createRef()
  const history = useHistory()
  
  async function poner() {
    try {
      const nuevoSaldo = await billeteraService.poner(monto)
      setSaldo(nuevoSaldo)
      setMonto(0)
    } catch (e) {
      console.log(e)
      toast.current.show({severity: 'error', summary: 'Error al poner plata en la billetera virtual', detail: e.message})
    }    
  }

  async function sacar() {
    try {
      const nuevoSaldo = await billeteraService.sacar(monto)
      setSaldo(nuevoSaldo)
      setMonto(0)
    } catch (e) {
      console.log(e)
      toast.current.show({severity: 'error', summary: 'Error al sacar plata en la billetera virtual', detail: e.message})
    }    
  }

  function logout() {
    usuarioService.init()
    history.push('/')
  }

  return (
    <div>
      <div class="titulo">Billetera virtual</div>
      <div class="section-group">
        <Chip label={usuario} icon="pi pi-user" />
      </div>
      <div class="section-group">
        <Knob value={saldo} readonly={true} max={saldo > 1000 ? saldo * 2 : 1000}/>
      </div>
      <div class="section-group">
      <InputText placeholder="Monto en pesos (debe ser positivo)" value={monto} onChange={(e) => setMonto(e.target.value)} />
      </div>
      <div class="section-group">
        <Button label="Poner" className="p-button-secondary" icon="pi pi-plus" onClick={poner} />
        <Button label="Sacar" className="p-button-warning" icon="pi pi-minus" onClick={sacar} />
        <Button label="Salir" className="p-button-success" icon="pi pi-user" onClick={logout} />
      </div>
      <div class="section-group">
        <Toast ref={toast}></Toast>
      </div>      
    </div>
  )
}
import { usuarioService } from '../services/usuarioService'
import { Chip } from 'primereact/chip'
import { Knob } from 'primereact/knob'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { useNavigate } from 'react-router-dom'
import { createRef, useState } from 'react'
import { billeteraService } from '../services/billeteraService'

export function WalletForm() {
  const usuario = usuarioService.usuario
  const [saldo, setSaldo] = useState(usuarioService.saldo)
  const [monto, setMonto] = useState(0)
  const toast = createRef()
  const navigate = useNavigate()
  
  async function poner() {
    await actualizarBilletera(() => billeteraService.poner(monto))
  }

  async function sacar() {
    await actualizarBilletera(() => billeteraService.sacar(monto))
  }

  async function actualizarBilletera(operacion) {
    try {
      const nuevoSaldo = await operacion()
      setSaldo(nuevoSaldo)
      setMonto(0)
    } catch (e) {
      console.log(e)
      toast.current.show({severity: 'error', summary: 'Error al sacar plata en la billetera virtual', detail: e.message})
    }    
  }

  function logout() {
    usuarioService.init()
    navigate('/')
  }

  return (
    <div>
      <div className="titulo">Billetera virtual</div>
      <div className="section-group">
        <Chip label={usuario} icon="pi pi-user" />
      </div>
      <div className="section-group">
        <Knob value={saldo} readOnly={true} max={Math.max(saldo * 2, 1000)}/>
      </div>
      <div className="section-group">
      <InputText placeholder="Monto en pesos (debe ser positivo)" value={monto} onChange={(e) => setMonto(e.target.value)} />
      </div>
      <div className="section-group">
        <Button label="Poner" className="p-button-secondary" icon="pi pi-plus" onClick={poner} />
        <Button label="Sacar" className="p-button-warning" icon="pi pi-minus" onClick={sacar} />
        <Button label="Salir" className="p-button-success" icon="pi pi-user" onClick={logout} />
      </div>
      <div className="section-group">
        <Toast ref={toast}></Toast>
      </div>      
    </div>
  )
}
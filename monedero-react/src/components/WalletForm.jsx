import { Chip } from 'primereact/chip'
import { Knob } from 'primereact/knob'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { useNavigate } from 'react-router-dom'
import { createRef, useState } from 'react'
import { usuarioService } from 'src/services/usuarioService'
import { billeteraService } from 'src/services/billeteraService'

export function WalletForm() {
  const usuario = usuarioService.usuario
  const [saldo, setSaldo] = useState(usuarioService.saldo)
  const [monto, setMonto] = useState(0)
  const toast = createRef()
  const navigate = useNavigate()
  
  async function poner() {
    await actualizarBilletera(() => billeteraService.poner(monto), 'poner')
  }

  async function sacar() {
    await actualizarBilletera(() => billeteraService.sacar(monto), 'sacar')
  }

  async function actualizarBilletera(operacion, nombreOperacion) {
    try {
      const nuevoSaldo = await operacion()
      setSaldo(nuevoSaldo)
      setMonto(0)
    } catch (e) {
      console.log(e)
      toast.current.show({severity: 'error', summary: `Error al ${nombreOperacion} plata en la billetera virtual`, detail: e.message})
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
        <Chip label={usuario} icon="pi pi-user" data-testid="usuario" />
      </div>
      <div className="section-group">
        <Knob value={saldo} readOnly={true} max={Math.max(saldo * 2, 1000)} data-testid="saldo"/>
      </div>
      <div className="section-group">
      <InputText placeholder="Monto en pesos (debe ser positivo)" value={monto} data-testid="monto" onChange={(e) => setMonto(e.target.value)} />
      </div>
      <div className="section-group">
        <Button label="Poner" className="p-button-secondary" icon="pi pi-plus" data-testid="poner" onClick={poner} />
        <Button label="Sacar" className="p-button-warning" icon="pi pi-minus" data-testid="sacar" onClick={sacar} />
        <Button label="Salir" className="p-button-success" icon="pi pi-user" onClick={logout} />
      </div>
      <div className="section-group">
        <Toast ref={toast}></Toast>
      </div>      
    </div>
  )
}
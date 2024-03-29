import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import { BrowserRouter } from 'react-router-dom'
import { billeteraService } from 'src/services/billeteraService'
import { usuarioService } from 'src/services/usuarioService'
import { WalletForm } from './WalletForm'

const saldoInicial = 150

describe('WalletForm', () => {

  beforeAll(() => {
    vi.mock('src/services/blockchainService', () => ({}))
  })

  afterAll(() => {
    vi.clearAllMocks()
  })

  billeteraService.poner = async (monto) => {
    usuarioService.saldo = usuarioService.saldo + +monto
    return usuarioService.saldo
  }

  billeteraService.sacar = async (monto) => {
    usuarioService.saldo = usuarioService.saldo - +monto
    return usuarioService.saldo
  }

  describe('al iniciar la página', () => {
    simulateLogin()
    test('se muestra el saldo y el nombre del usuario', async () => {
      const { container } = render(
        <BrowserRouter>
          <WalletForm />
        </BrowserRouter>,
      )
      expect(await container.getElementsByClassName('p-knob-text')[0]).toHaveTextContent('150')
      expect(await screen.findByTestId('usuario')).toHaveTextContent('Julián')
    })
  })

  describe('al poner plata', () => {
    test('sube el saldo y el monto vuelve a 0', async () => {
      simulateLogin()
      const { container } = render(
        <BrowserRouter>
          <WalletForm />
        </BrowserRouter>,
      )
      await act(async () => {
        await userEvent.type(screen.getByTestId('monto'), '50')
        await userEvent.click(screen.getByTestId('poner'))
      })
      expect(await container.getElementsByClassName('p-knob-text')[0]).toHaveTextContent('200')
      expect(screen.getByTestId('monto')).toHaveValue('0')
    })
  })

  describe('al sacar plata', () => {
    test('baja el saldo y el monto vuelve a 0', async () => {
      simulateLogin()
      const { container } = render(
        <BrowserRouter>
          <WalletForm />
        </BrowserRouter>,
      )
      await act(async () => {
        await userEvent.type(screen.getByTestId('monto'), '50')
        await userEvent.click(screen.getByTestId('sacar'))
      })
      expect(await container.getElementsByClassName('p-knob-text')[0]).toHaveTextContent('100')
      expect(screen.getByTestId('monto')).toHaveValue('0')
    })
  })
})

function simulateLogin() {
  usuarioService.usuario = 'Julián'
  usuarioService.saldo = saldoInicial
  usuarioService.address = '0x3A5123002c4546dE724C79B10F610930B2Ec2207'
}

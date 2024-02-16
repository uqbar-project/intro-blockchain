import './App.css'
import './index.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

import { MonederoRoutes } from './routes'

function App() {
  return (
    <div className="App">
      <MonederoRoutes/>
    </div>
  )
}

export default App

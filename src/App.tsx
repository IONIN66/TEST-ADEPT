import { Provider } from 'react-redux'
import { CompanyTable } from './components/CompanyTable/CompanyTable'
import { store } from './store/store'

import './styles/styles.scss'

function App() {
    return (
        <Provider store={store}>
            <CompanyTable />
        </Provider>
    )
}

export default App

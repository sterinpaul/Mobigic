import {BrowserRouter,Routes,Route} from 'react-router-dom'
import SignInOrUp from './pages/SignInOrUp'
import Home from './pages/Home'
import Profile from './pages/Profile'
import { useSelector } from 'react-redux'

const App = ()=>{
  const {token} = useSelector(store=>store.user)
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={token ? <Home/> : <SignInOrUp/>}/>
      <Route path='/profile' element={<Profile/>}/>
    </Routes>
    </BrowserRouter>
  )
}
export default App
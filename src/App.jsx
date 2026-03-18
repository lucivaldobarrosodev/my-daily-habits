import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import BemVindo from './components/BemVindo'
import SecaoHabitos from './components/SecaoHabitos'
import HabitList from './components/HabitList'

function App() {
  return (
    <div>
      <Header />
      <BemVindo nomeUsuario="Turma ITEAM" />
      <SecaoHabitos titulo="Meus Habitos">
        <HabitList />
      </SecaoHabitos>
      <Footer />
    </div>
  )
}

export default App

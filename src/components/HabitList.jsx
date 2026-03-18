import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import HabitCard from './HabitCard'
import { useHabits } from '../contexts/HabitsContext'

function HabitList() {
  const { habits, adicionarHabit, removerHabit } = useHabits()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    novoNome: '',
    novaDescricao: '',
    novaCategoria: '',
    novaMeta: '7',
  })
  const [erroNome, setErroNome] = useState('')
  const nomeInputRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (name === 'novoNome') {
      if (value.length > 0 && value.length < 3) {
        setErroNome('O nome deve ter pelo menos 3 caracteres.')
      } else {
        setErroNome('')
      }
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.novoNome.trim() || erroNome) {
      nomeInputRef.current?.focus()
      return
    }

    const novoHabit = {
      id: Date.now(),
      nome: form.novoNome,
      descricao: form.novaDescricao,
      categoria: form.novaCategoria || 'Geral',
      meta: parseInt(form.novaMeta) || 7,
      ativo: true,
      diasFeitos: 0,
    }

    adicionarHabit(novoHabit)
    setForm({ novoNome: '', novaDescricao: '', novaCategoria: '', novaMeta: '7' })
    setErroNome('')
    navigate('/habitos')
  }

  if (!habits) return null

  return (
    <section>
      <form onSubmit={handleSubmit} className="habit-form">
        <div>
          <label>
            Nome do hábito *
            <input
              type="text"
              name="novoNome"
              value={form.novoNome}
              onChange={handleChange}
              ref={nomeInputRef}
            />
          </label>
          {erroNome && <p style={{ color: 'red', fontSize: '0.8rem' }}>{erroNome}</p>}
        </div>
        <div>
          <label>
            Descrição
            <input
              type="text"
              name="novaDescricao"
              value={form.novaDescricao}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Categoria
            <input
              type="text"
              name="novaCategoria"
              value={form.novaCategoria}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Meta semanal (dias)
            <input
              type="number"
              name="novaMeta"
              value={form.novaMeta}
              onChange={handleChange}
              min="1"
              max="7"
            />
          </label>
        </div>
        <button type="submit">Adicionar hábito</button>
      </form>

      {habits.length === 0 && (
        <p>Nenhum hábito cadastrado ainda. Que tal começar?</p>
      )}

      <ul>
        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            id={habit.id}
            nome={habit.nome}
            descricao={habit.descricao}
            meta={habit.meta}
            ativo={habit.ativo}
            diasFeitos={habit.diasFeitos}
            categoria={habit.categoria}
            onRemover={() => removerHabit(habit.id)}
          />
        ))}
      </ul>
    </section>
  )
}

export default HabitList

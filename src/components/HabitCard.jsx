function HabitCard({
  nome,
  descricao = '',
  categoria = 'Geral',
  meta,
  ativo = true,
  diasFeitos = 0,
  onRemover,
}) {
  const metaAtingida = diasFeitos >= meta

  const mensagemMeta = metaAtingida
    ? 'Meta da semana atingida!'
    : `${diasFeitos} de ${meta} dias concluidos`

  return (
    <div className="habit-card">
      <h3>{nome}</h3>
      {descricao && <p className="habit-descricao">{descricao}</p>}
      <p className="habit-meta">{mensagemMeta}</p>
      <p className="habit-categoria">Categoria: {categoria}</p>
      <span className={`habit-status ${ativo ? 'ativo' : 'pausado'}`}>
        {ativo ? 'Ativo' : 'Pausado'}
      </span>
      {metaAtingida && <p className="habit-conquista">Parabens! Meta da semana atingida!</p>}

      {onRemover && (
        <button type="button" onClick={onRemover}>
          Remover
        </button>
      )}
    </div>
  )
}

export default HabitCard

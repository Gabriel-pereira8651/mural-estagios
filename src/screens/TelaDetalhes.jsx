import Icone, { IC } from '../components/Icone';
import Logo from '../components/Logo';
import { fmtDataCompleta } from '../utils/datas';

// Tela 4: Detalhes da vaga (HTA 2.2 e 2.3)
export default function TelaDetalhes({ vaga, aluno, salva, candidatura, onVoltar, onSalvar, onCandidatar, onVerCandidatura }) {
  const atende = aluno.atendePeriodo(vaga);
  const d = vaga.diasRestantes();
  return (
    <>
      <section className="card det-topo">
        <Logo vaga={vaga} grande />
        <h1>{vaga.titulo}</h1>
        <p className="det-emp">{vaga.empresa}</p>
        <p className="det-local"><Icone d={IC.local} tamanho={16} />{vaga.cidade}</p>
      </section>

      <div className={'prazo-banner' + (vaga.urgente() ? ' urgente' : '')}>
        <Icone d={IC.relogio} tamanho={24} />
        <div>
          <strong>Inscrições até {fmtDataCompleta(vaga.prazoInscricao)}</strong>
          <span>{d === 0 ? 'Hoje é o último dia para se candidatar' : d === 1 ? 'Falta 1 dia' : `Faltam ${d} dias`}</span>
        </div>
      </div>

      <p className={'selo grande ' + (atende ? 'ok' : 'nao')}>
        <Icone d={atende ? IC.check : IC.alerta} tamanho={18} />
        {atende
          ? `Você atende ao período exigido (a partir do ${vaga.periodoMinimo}º).`
          : `Esta vaga exige o ${vaga.periodoMinimo}º período e você está no ${aluno.periodo}º. Salve a vaga para acompanhar outras oportunidades da empresa.`}
      </p>

      <section className="card">
        <dl className="info-grid">
          <div><dt>Modalidade</dt><dd>{vaga.modalidade}</dd></div>
          <div><dt>Bolsa</dt><dd>{vaga.bolsa}</dd></div>
          <div><dt>Carga horária</dt><dd>{vaga.carga}</dd></div>
          <div><dt>Período mínimo</dt><dd>{vaga.periodoMinimo}º</dd></div>
        </dl>
      </section>

      <section className="card texto">
        <h2>Sobre a vaga</h2>
        <p>{vaga.descricao}</p>
        <h2>Requisitos</h2>
        <ul>{vaga.requisitos.map(r => <li key={r}>{r}</li>)}</ul>
        <h2>Cursos aceitos</h2>
        <div className="tags">{vaga.cursos.map(c => <span key={c} className="tag">{c}</span>)}</div>
      </section>

      <div className="barra-acao">
        <button className={'btn-icone-borda' + (salva ? ' ativo' : '')} onClick={() => onSalvar(vaga)}
          aria-pressed={salva} aria-label={salva ? 'Remover vaga das salvas' : 'Salvar vaga'}>
          <Icone d={IC.bookmark} preenchido={salva} />
        </button>
        {candidatura
          ? <button className="btn primario" onClick={onVerCandidatura}>Ver minha candidatura</button>
          : <button className="btn primario" onClick={onCandidatar} disabled={!atende}>Candidatar-se</button>}
      </div>
    </>
  );
}

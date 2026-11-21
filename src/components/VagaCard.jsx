import Icone, { IC } from './Icone';
import Logo from './Logo';

export default function VagaCard({ vaga, aluno, salva, enviada, nova, onAbrir, onSalvar }) {
  const atende = aluno.atendePeriodo(vaga);
  return (
    <article className="vaga-card">
      <button className="vaga-main" onClick={() => onAbrir(vaga.id)}>
        <Logo vaga={vaga} />
        <span className="vaga-info">
          {(nova || enviada) && (
            <span className="vaga-tags">
              {nova && <span className="tag-nova">Nova</span>}
              {enviada && <span className="tag-enviada">Candidatura enviada</span>}
            </span>
          )}
          <strong className="vaga-titulo">{vaga.titulo}</strong>
          <span className="vaga-emp">{vaga.empresa}</span>
          <span className="vaga-meta">
            <span className="pill-mod">{vaga.modalidade}</span>
            <span className={'prazo' + (vaga.urgente() ? ' urgente' : '')}><Icone d={IC.relogio} tamanho={14} />{vaga.textoPrazo()}</span>
          </span>
          <span className={'selo ' + (atende ? 'ok' : 'nao')}>
            <Icone d={atende ? IC.check : IC.alerta} tamanho={14} />
            {atende ? 'Você atende ao período exigido' : `Exige ${vaga.periodoMinimo}º período`}
          </span>
        </span>
      </button>
      <button className={'salvar-btn' + (salva ? ' ativo' : '')} onClick={() => onSalvar(vaga)}
        aria-pressed={salva} aria-label={salva ? 'Remover vaga das salvas' : 'Salvar vaga'}>
        <Icone d={IC.bookmark} preenchido={salva} />
      </button>
    </article>
  );
}

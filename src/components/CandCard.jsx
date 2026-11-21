import Logo from './Logo';
import StatusPill from './StatusPill';
import { fmtDataCompleta } from '../utils/datas';

export default function CandCard({ c, v, onAbrir, onCancelar }) {
  const etapas = ['Enviada', 'Em análise', 'Resultado'];
  const atual = c.status === 'Em análise' ? 1 : 0;
  return (
    <article className="card">
      <div className="cand-topo">
        <Logo vaga={v} />
        <div className="cand-txt"><strong>{v.titulo}</strong><span>{v.empresa}</span></div>
        <StatusPill status={c.status} />
      </div>
      <ol className="etapas" aria-label={`Etapa atual: ${c.status}`}>
        {etapas.map((e, i) => <li key={e} className={i <= atual ? 'feita' : ''}><span className="bolinha" />{e}</li>)}
      </ol>
      <p className="cand-data">Enviada em {fmtDataCompleta(c.dataEnvio)} com {c.curriculo.arquivoPdf}. Protocolo {c.protocolo}.</p>
      <div className="cand-acoes">
        <button className="link" onClick={onAbrir}>Ver vaga</button>
        <button className="link perigo" onClick={onCancelar}>Cancelar candidatura</button>
      </div>
    </article>
  );
}

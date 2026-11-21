import Icone, { IC } from '../components/Icone';
import { DISCIPLINAS } from '../data/dados';
import { fmtData, diasDe } from '../utils/datas';

// Tela 1: Avisos (início)
export default function TelaInicio({ aluno, novas, avisos, onMural }) {
  return (
    <>
      <section className="card saudacao">
        <h1>Olá, {aluno.nome}!</h1>
        {avisos.length > 0 ? (
          <ul className="avisos">
            {avisos.map((a, i) => (
              <li key={i}>
                <button className="aviso" onClick={a.onClick}>
                  <span className={'aviso-ic ' + (a.tipo || '')}><Icone d={a.icone} tamanho={18} /></span>
                  <span>{a.texto}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : <p className="suave">Nenhum aviso novo por aqui.</p>}
      </section>

      <button className="atalho-mural" onClick={onMural}>
        <span className="atalho-ic"><Icone d={IC.pasta} tamanho={26} /></span>
        <span className="atalho-txt">
          <strong>Mural de Estágios</strong>
          <span>{novas > 0 ? `${novas} ${novas === 1 ? 'vaga nova' : 'vagas novas'} para você` : 'Veja as vagas abertas'}</span>
        </span>
        {novas > 0 && <span className="atalho-badge" aria-label={`${novas} vagas novas`}>{novas}</span>}
        <Icone d={IC.direita} />
      </button>

      {DISCIPLINAS.map(d => (
        <article key={d.codigo} className="card disc">
          {d.prova && <span className="pill-prova">Prova: {fmtData(d.prova)}</span>}
          <h3>{d.nome}</h3>
          <p className="suave">Local e horário: <strong>{d.local}</strong></p>
          <div className="disc-pills">
            <span className="pill">Faltas: <b>{d.faltas}</b></span>
            <span className={'pill ' + d.crCor}>CR: <b>{d.cr}</b></span>
          </div>
        </article>
      ))}

      <article className="card noticia">
        <div className="noticia-img" aria-hidden="true" />
        <div className="noticia-txt">
          <h3>Feira de Estágios e Carreiras</h3>
          <p>Empresas parceiras apresentam vagas e fazem entrevistas rápidas. Leve seu currículo atualizado.</p>
          <span className="noticia-data"><Icone d={IC.calendario} tamanho={15} />{fmtData(diasDe(12))} às 14:00, Ginásio do Inatel</span>
        </div>
      </article>
    </>
  );
}

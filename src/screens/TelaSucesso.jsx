import Icone, { IC } from '../components/Icone';
import StatusPill from '../components/StatusPill';
import { fmtDataCompleta, fmtHora } from '../utils/datas';

// Tela 6: Confirmação e comprovante
export default function TelaSucesso({ cand, vaga, aluno, onMinhas, onMural }) {
  return (
    <div className="sucesso">
      <div className="check-anim" aria-hidden="true">
        <svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="36" /><polyline points="24 41 35 52 57 30" /></svg>
      </div>
      <h1>Candidatura enviada!</h1>
      <p className="suave centro">Sua candidatura para <strong>{vaga.titulo}</strong> na {vaga.empresa} chegou à empresa.</p>
      <section className="card comprovante">
        <h2>Comprovante</h2>
        <dl>
          <div><dt>Protocolo</dt><dd>{cand.protocolo}</dd></div>
          <div><dt>Enviada em</dt><dd>{fmtDataCompleta(cand.dataEnvio)} às {fmtHora(cand.dataEnvio)}</dd></div>
          <div><dt>Currículo</dt><dd>{cand.curriculo.arquivoPdf}</dd></div>
          <div><dt>Status</dt><dd><StatusPill status={cand.status} /></dd></div>
        </dl>
        <p className="email-nota"><Icone d={IC.email} tamanho={16} />Enviamos uma cópia para {aluno.email}</p>
      </section>
      <button className="btn primario largo" onClick={onMinhas}>Ver minhas candidaturas</button>
      <button className="btn secundario largo" onClick={onMural}>Voltar ao mural</button>
    </div>
  );
}

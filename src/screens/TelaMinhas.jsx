import { useState } from 'react';
import { IC } from '../components/Icone';
import CandCard from '../components/CandCard';
import VagaCard from '../components/VagaCard';
import Vazio from '../components/Vazio';
import { MURAL } from '../data/dados';

// Tela 7: Minhas candidaturas e vagas salvas
export default function TelaMinhas({ abaInicial, candidaturas, salvas, vistas, aluno, temCandidatura, onVoltar, onAbrir, onSalvar, onCancelar, onMural }) {
  const [aba, setAba] = useState(abaInicial || 'candidaturas');
  const vagasSalvas = salvas.map(id => MURAL.buscar(id)).filter(Boolean).sort((a, b) => a.diasRestantes() - b.diasRestantes());
  return (
    <>
      <div className="abas" role="tablist">
        <button role="tab" aria-selected={aba === 'candidaturas'} className={'aba' + (aba === 'candidaturas' ? ' sel' : '')}
          onClick={() => setAba('candidaturas')}>Candidaturas <span className="aba-n">({candidaturas.length})</span></button>
        <button role="tab" aria-selected={aba === 'salvas'} className={'aba' + (aba === 'salvas' ? ' sel' : '')}
          onClick={() => setAba('salvas')}>Vagas salvas <span className="aba-n">({vagasSalvas.length})</span></button>
      </div>

      {aba === 'candidaturas' && (candidaturas.length > 0
        ? <div className="lista-vagas">{candidaturas.map(c => {
            const v = MURAL.buscar(c.vagaId);
            return <CandCard key={c.id} c={c} v={v} onAbrir={() => onAbrir(v.id)} onCancelar={() => onCancelar(c)} />;
          })}</div>
        : <Vazio icone={IC.lista} titulo="Nenhuma candidatura ainda"
            texto="Quando você se candidatar a uma vaga, ela aparece aqui com o status atualizado."
            acao="Explorar o mural" onAcao={onMural} />)}

      {aba === 'salvas' && (vagasSalvas.length > 0
        ? <div className="lista-vagas">{vagasSalvas.map(v => (
            <VagaCard key={v.id} vaga={v} aluno={aluno} salva enviada={temCandidatura(v.id)}
              nova={v.nova && !vistas.includes(v.id)} onAbrir={onAbrir} onSalvar={onSalvar} />
          ))}</div>
        : <Vazio icone={IC.bookmark} titulo="Nenhuma vaga salva"
            texto="Toque no marcador de uma vaga para guardá-la. Avisamos você quando o prazo estiver acabando."
            acao="Explorar o mural" onAcao={onMural} />)}
    </>
  );
}

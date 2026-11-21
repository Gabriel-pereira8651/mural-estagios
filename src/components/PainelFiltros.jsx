import { useState } from 'react';
import useEsc from '../hooks/useEsc';
import { CURSOS, MODALIDADES } from '../data/dados';
import { FILTROS_VAZIOS } from '../utils/filtros';

// Tela 3.1 do wireframe: filtros de curso, período e modalidade
export default function PainelFiltros({ inicial, aluno, contar, onAplicar, onFechar }) {
  useEsc(onFechar);
  const [rasc, setRasc] = useState(inicial);
  const n = contar(rasc);
  return (
    <div className="overlay baixo" onClick={onFechar}>
      <div className="sheet" role="dialog" aria-modal="true" aria-labelledby="titulo-filtros" onClick={e => e.stopPropagation()}>
        <div className="sheet-alca" />
        <div className="sheet-topo">
          <h2 id="titulo-filtros">Filtrar vagas</h2>
          <button className="link" onClick={() => setRasc({ ...rasc, curso: aluno.curso, periodo: aluno.periodo })}>Usar meu curso e período</button>
        </div>
        <label className="campo">
          <span>Curso</span>
          <select value={rasc.curso} onChange={e => setRasc({ ...rasc, curso: e.target.value })}>
            <option value="">Todos os cursos</option>
            {CURSOS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <label className="campo">
          <span>Período mínimo exigido</span>
          <select value={rasc.periodo} onChange={e => setRasc({ ...rasc, periodo: Number(e.target.value) })}>
            <option value={0}>Qualquer período</option>
            {[4, 5, 6, 7, 8, 9, 10].map(p => <option key={p} value={p}>Até o {p}º período</option>)}
          </select>
        </label>
        <fieldset className="campo">
          <legend>Modalidade</legend>
          <div className="segmentado">
            {['', ...MODALIDADES].map(m => (
              <button key={m || 'todas'} type="button" className={'seg' + (rasc.modalidade === m ? ' sel' : '')}
                aria-pressed={rasc.modalidade === m} onClick={() => setRasc({ ...rasc, modalidade: m })}>{m || 'Todas'}</button>
            ))}
          </div>
        </fieldset>
        <div className="sheet-acoes">
          <button className="btn secundario" onClick={() => setRasc({ ...FILTROS_VAZIOS, busca: rasc.busca })}>Limpar</button>
          <button className="btn primario" onClick={() => onAplicar(rasc)} disabled={n === 0}>
            {n === 0 ? 'Nenhuma vaga' : `Ver ${n} ${n === 1 ? 'vaga' : 'vagas'}`}
          </button>
        </div>
      </div>
    </div>
  );
}

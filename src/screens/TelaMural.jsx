import Icone, { IC } from '../components/Icone';
import VagaCard from '../components/VagaCard';
import Vazio from '../components/Vazio';
import { FILTROS_VAZIOS, chipsAtivos } from '../utils/filtros';

// Tela 3: Mural de vagas (HTA 1 e 2.1)
export default function TelaMural({ filtros, setFiltros, resultado, aluno, salvas, vistas, temCandidatura, onAbrir, onSalvar, onFiltros, autoFocar }) {
  const ativos = chipsAtivos(filtros);
  return (
    <>
      <div className="busca-linha">
        <label className="busca">
          <Icone d={IC.busca} tamanho={18} />
          <input type="search" placeholder="Buscar vaga ou empresa" value={filtros.busca} autoFocus={autoFocar}
            onChange={e => setFiltros({ ...filtros, busca: e.target.value })} aria-label="Buscar vaga ou empresa" />
        </label>
        <button className="btn-filtro" onClick={onFiltros} aria-label={`Filtros${ativos.length ? `, ${ativos.length} ativos` : ''}`}>
          <Icone d={IC.filtro} /><span className="rotulo-filtro">Filtros</span>
          {ativos.length > 0 && <span className="contador">{ativos.length}</span>}
        </button>
      </div>
      {ativos.length > 0 && (
        <div className="chips">
          {ativos.map(c => (
            <button key={c.chave} className="chip" onClick={() => setFiltros({ ...filtros, [c.chave]: FILTROS_VAZIOS[c.chave] })}
              aria-label={`Remover filtro ${c.rotulo}`}>
              {c.rotulo}<Icone d={IC.x} tamanho={14} />
            </button>
          ))}
        </div>
      )}
      <p className="resultado" aria-live="polite">
        {resultado.length} {resultado.length === 1 ? 'vaga encontrada' : 'vagas encontradas'}
      </p>
      {resultado.length > 0 ? resultado.map(v => (
        <VagaCard key={v.id} vaga={v} aluno={aluno} salva={salvas.includes(v.id)} enviada={temCandidatura(v.id)}
          nova={v.nova && !vistas.includes(v.id)} onAbrir={onAbrir} onSalvar={onSalvar} />
      )) : (
        <Vazio icone={IC.busca} titulo="Nenhuma vaga com esses filtros"
          texto="Tente outro termo de busca ou remova algum filtro para ver mais vagas."
          acao="Limpar busca e filtros" onAcao={() => setFiltros(FILTROS_VAZIOS)} />
      )}
    </>
  );
}

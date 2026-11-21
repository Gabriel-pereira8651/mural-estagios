import Icone, { IC } from './Icone';
import useEsc from '../hooks/useEsc';

// Menu lateral em seções, como no app do Inatel
export default function Menu({ aluno, novas, telaAtual, onFechar, onNavegar, onReiniciar }) {
  useEsc(onFechar);
  const secoes = [
    { itens: [{ rotulo: 'Avisos', icone: IC.sino, tela: 'inicio' }] },
    { titulo: 'Estágios', itens: [
      { rotulo: 'Mural de Estágios', icone: IC.pasta, tela: 'mural', badge: novas },
      { rotulo: 'Minhas candidaturas', icone: IC.lista, tela: 'minhas' },
    ] },
    { titulo: 'Aproveitamento Escolar', itens: [
      { rotulo: 'Notas', icone: IC.grafico },
      { rotulo: 'Frequência', icone: IC.calendario },
      { rotulo: 'Material Didático', icone: IC.livro },
    ] },
    { titulo: 'Calendários e Horários', itens: [
      { rotulo: 'Calendário Acadêmico', icone: IC.calendario },
      { rotulo: 'Provas', icone: IC.provas },
      { rotulo: 'Horários de Aula', icone: IC.relogio },
    ] },
    { titulo: 'Outras Opções', itens: [
      { rotulo: 'Reiniciar demonstração', icone: IC.reiniciar, acao: onReiniciar },
      { rotulo: 'Configurações', icone: IC.engrenagem },
      { rotulo: 'Sair', icone: IC.power },
    ] },
  ];
  return (
    <div className="overlay" onClick={onFechar}>
      <nav className="gaveta" aria-label="Menu principal" onClick={e => e.stopPropagation()}>
        <div className="gaveta-user">
          <span className="avatar">CS</span>
          <div><strong>{aluno.nomeCompleto}</strong><span>{aluno.curso}, {aluno.periodo}º período</span></div>
        </div>
        {secoes.map((sec, i) => (
          <ul key={i} className="gaveta-secao" aria-label={sec.titulo || 'Principal'}>
            {sec.titulo && <li><h2>{sec.titulo}</h2></li>}
            {sec.itens.map(item => (
              <li key={item.rotulo}>
                <button className={'gaveta-item' + (item.tela && item.tela === telaAtual ? ' atual' : '')}
                  onClick={() => (item.acao ? item.acao() : onNavegar(item.tela))}>
                  <Icone d={item.icone} tamanho={22} /><span>{item.rotulo}</span>
                  {item.badge > 0 && <span className="badge" aria-label={`${item.badge} novas`}>{item.badge}</span>}
                </button>
              </li>
            ))}
          </ul>
        ))}
      </nav>
    </div>
  );
}

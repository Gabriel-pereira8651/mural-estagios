import { useState, useEffect, useMemo, useRef } from 'react';
import { ALUNO, MURAL } from './data/dados';
import { CHAVE, estadoInicial, carregar, persistir } from './data/armazenamento';
import { FILTROS_VAZIOS } from './utils/filtros';
import { IC } from './components/Icone';
import Cabecalho from './components/Cabecalho';
import Menu, { MenuConteudo } from './components/Menu';
import PainelFiltros from './components/PainelFiltros';
import Dialogo from './components/Dialogo';
import Toast from './components/Toast';
import Vazio from './components/Vazio';
import TelaInicio from './screens/TelaInicio';
import TelaMural from './screens/TelaMural';
import TelaDetalhes from './screens/TelaDetalhes';
import TelaEnviar from './screens/TelaEnviar';
import TelaSucesso from './screens/TelaSucesso';
import TelaMinhas from './screens/TelaMinhas';

// Estado global, navegação entre telas e regras de negócio
export default function App() {
  const inicial = useMemo(() => carregar() || estadoInicial(), []);
  const [salvas, setSalvas] = useState(inicial.salvas);
  const [vistas, setVistas] = useState(inicial.vistas);
  const [candidaturas, setCandidaturas] = useState(inicial.candidaturas);
  const [pilha, setPilha] = useState([{ tela: 'inicio' }]);
  const [menuAberto, setMenuAberto] = useState(false);
  const [filtrosAbertos, setFiltrosAbertos] = useState(false);
  const [filtros, setFiltros] = useState(FILTROS_VAZIOS);
  const [toast, setToast] = useState(null);
  const [dialogo, setDialogo] = useState(null);
  const [bloqueado, setBloqueado] = useState(false);
  const atual = pilha[pilha.length - 1];
  const candRef = useRef(candidaturas);
  candRef.current = candidaturas;

  useEffect(() => { persistir({ salvas, vistas, candidaturas }); }, [salvas, vistas, candidaturas]);
  useEffect(() => { setBloqueado(false); }, [pilha]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), toast.acao ? 5500 : 3500);
    return () => clearTimeout(t);
  }, [toast]);

  // Navegação
  const ir = (tela, extra = {}) => setPilha(p => [...p, { tela, ...extra }]);
  const voltar = () => setPilha(p => (p.length > 1 ? p.slice(0, -1) : p));
  const irRaiz = (tela, extra = {}) => setPilha(tela === 'inicio' ? [{ tela: 'inicio' }] : [{ tela: 'inicio' }, { tela, ...extra }]);
  const substituir = (tela, extra = {}) => setPilha(p => [...p.slice(0, -1), { tela, ...extra }]);
  const mostrarToast = (msg, acao) => setToast({ msg, acao, id: Date.now() });

  // Dados derivados
  const resultado = useMemo(() => MURAL.filtrarVagas(filtros), [filtros]);
  const novas = MURAL.listarVagas().filter(v => v.nova && !vistas.includes(v.id)).length;
  const candidaturaDe = id => candidaturas.find(c => c.vagaId === id);
  const temCandidatura = id => !!candidaturaDe(id);

  // Ações
  const abrirVaga = id => { setVistas(v => (v.includes(id) ? v : [...v, id])); ir('detalhes', { id }); };
  const alternarSalva = vaga => {
    const ja = salvas.includes(vaga.id);
    setSalvas(s => (ja ? s.filter(x => x !== vaga.id) : [...s, vaga.id]));
    mostrarToast(ja ? 'Vaga removida das salvas.' : 'Vaga salva. Avisamos você antes do prazo acabar.');
  };
  const concluirEnvio = cand => {
    setCandidaturas(cs => [cand, ...cs]);
    substituir('sucesso', { candId: cand.id });
    const v = MURAL.buscar(cand.vagaId);
    // Simula a empresa abrindo a candidatura alguns segundos depois
    setTimeout(() => {
      const ainda = candRef.current.some(c => c.id === cand.id && c.status === 'Enviada');
      if (!ainda) return; // foi cancelada antes
      setCandidaturas(cs => cs.map(c => (c.id === cand.id && c.status === 'Enviada' ? c.comStatus('Em análise') : c)));
      mostrarToast(`${v.empresa} começou a analisar sua candidatura.`);
    }, 9000);
  };
  const pedirCancelamento = cand => {
    const v = MURAL.buscar(cand.vagaId);
    setDialogo({
      titulo: 'Cancelar candidatura?',
      texto: `A ${v.empresa} deixará de ver seu currículo para ${v.titulo}. Você pode se candidatar de novo enquanto a vaga estiver aberta.`,
      confirmar: 'Cancelar candidatura', manter: 'Manter',
      onConfirmar: () => {
        setCandidaturas(cs => cs.filter(c => c.id !== cand.id));
        mostrarToast('Candidatura cancelada.', { rotulo: 'Desfazer', fn: () => setCandidaturas(cs => (cs.some(c => c.id === cand.id) ? cs : [cand, ...cs])) });
      },
    });
  };
  const navegarMenu = tela => {
    setMenuAberto(false);
    if (tela) irRaiz(tela);
    else mostrarToast('Essa seção não faz parte deste protótipo.');
  };
  const reiniciar = () => {
    try { localStorage.removeItem(CHAVE); } catch (e) { /* ok */ }
    const e = estadoInicial();
    setSalvas(e.salvas); setVistas(e.vistas); setCandidaturas(e.candidaturas);
    setFiltros(FILTROS_VAZIOS); setMenuAberto(false); irRaiz('inicio');
    mostrarToast('Demonstração reiniciada.');
  };

  // Avisos da tela inicial (notificações e lembretes de prazo)
  const avisos = [];
  salvas.map(id => MURAL.buscar(id)).filter(v => v && v.urgente() && !temCandidatura(v.id)).forEach(v => {
    const d = v.diasRestantes();
    avisos.push({
      icone: IC.relogio, tipo: 'urgente', onClick: () => abrirVaga(v.id),
      texto: `A vaga salva ${v.titulo} encerra ${d === 0 ? 'hoje' : d === 1 ? 'amanhã' : `em ${d} dias`}.`,
    });
  });
  const compat = MURAL.listarVagas().find(v => v.nova && !vistas.includes(v.id) && ALUNO.atendePeriodo(v) && v.cursos.includes(ALUNO.curso) && !temCandidatura(v.id) && !salvas.includes(v.id));
  if (compat) avisos.push({ icone: IC.sino, texto: `Nova vaga compatível com seu perfil: ${compat.titulo}.`, onClick: () => abrirVaga(compat.id) });
  const emAnalise = candidaturas.find(c => c.status === 'Em análise');
  if (emAnalise) {
    const v = MURAL.buscar(emAnalise.vagaId);
    avisos.push({ icone: IC.email, texto: `Sua candidatura para ${v.titulo} está em análise.`, onClick: () => irRaiz('minhas') });
  }

  // Tela atual
  let conteudo = null;
  switch (atual.tela) {
    case 'inicio':
      conteudo = <TelaInicio aluno={ALUNO} novas={novas} avisos={avisos.slice(0, 3)} onMural={() => ir('mural')} />;
      break;
    case 'mural':
      conteudo = <TelaMural filtros={filtros} setFiltros={setFiltros} resultado={resultado} aluno={ALUNO}
        salvas={salvas} vistas={vistas} temCandidatura={temCandidatura} onAbrir={abrirVaga} onSalvar={alternarSalva}
        onFiltros={() => setFiltrosAbertos(true)} autoFocar={!!atual.foco} />;
      break;
    case 'detalhes': {
      const v = MURAL.buscar(atual.id);
      conteudo = <TelaDetalhes vaga={v} aluno={ALUNO} salva={salvas.includes(v.id)} candidatura={candidaturaDe(v.id)}
        onVoltar={voltar} onSalvar={alternarSalva} onCandidatar={() => ir('enviar', { id: v.id })}
        onVerCandidatura={() => ir('minhas', { aba: 'candidaturas' })} />;
      break;
    }
    case 'enviar': {
      const v = MURAL.buscar(atual.id);
      conteudo = <TelaEnviar vaga={v} aluno={ALUNO} onVoltar={voltar} onConcluir={concluirEnvio} onBloqueio={setBloqueado} />;
      break;
    }
    case 'sucesso': {
      const c = candidaturas.find(x => x.id === atual.candId);
      conteudo = c
        ? <TelaSucesso cand={c} vaga={MURAL.buscar(c.vagaId)} aluno={ALUNO}
            onMinhas={() => irRaiz('minhas', { aba: 'candidaturas' })} onMural={() => irRaiz('mural')} />
        : <Vazio icone={IC.lista} titulo="Candidatura cancelada" texto="Essa candidatura não está mais ativa."
            acao="Voltar ao mural" onAcao={() => irRaiz('mural')} />;
      break;
    }
    case 'minhas':
      conteudo = <TelaMinhas abaInicial={atual.aba} candidaturas={candidaturas} salvas={salvas} vistas={vistas}
        aluno={ALUNO} temCandidatura={temCandidatura} onVoltar={voltar} onAbrir={abrirVaga}
        onSalvar={alternarSalva} onCancelar={pedirCancelamento} onMural={() => irRaiz('mural')} />;
      break;
    default:
      conteudo = null;
  }
  const comBarra = atual.tela === 'detalhes' || atual.tela === 'enviar';
  // Item do menu destacado: as telas do fluxo de candidatura pertencem ao Mural
  const secaoMenu = { detalhes: 'mural', enviar: 'mural', sucesso: 'mural' }[atual.tela] || atual.tela;
  const TITULOS = { inicio: 'Avisos', mural: 'Mural de Estágios', detalhes: 'Detalhes da vaga', enviar: 'Enviar candidatura', sucesso: 'Candidatura enviada', minhas: 'Minhas candidaturas' };
  const buscar = () => {
    if (atual.tela === 'mural') { const el = document.querySelector('.busca input'); if (el) el.focus(); }
    else ir('mural', { foco: true });
  };

  return (
    <div className="app">
      <Cabecalho titulo={TITULOS[atual.tela]} raiz={pilha.length === 1} temNovidade={novas > 0}
        onMenu={() => setMenuAberto(true)} onVoltar={voltar} onBusca={buscar} voltarBloqueado={bloqueado} />
      <div className="corpo">
        <nav className="lateral" aria-label="Menu principal">
          <MenuConteudo aluno={ALUNO} novas={novas} telaAtual={secaoMenu} onNavegar={navegarMenu} onReiniciar={reiniciar} />
        </nav>
        <main key={pilha.length + atual.tela + (atual.id || '')} className={`tela tela-${atual.tela}` + (comBarra ? ' com-barra' : '')}>
          <div className="conteudo">{conteudo}</div>
        </main>
      </div>
      {menuAberto && <Menu aluno={ALUNO} novas={novas} telaAtual={secaoMenu} onFechar={() => setMenuAberto(false)}
        onNavegar={navegarMenu} onReiniciar={reiniciar} />}
      {filtrosAbertos && <PainelFiltros inicial={filtros} aluno={ALUNO} contar={f => MURAL.filtrarVagas(f).length}
        onFechar={() => setFiltrosAbertos(false)} onAplicar={f => { setFiltros(f); setFiltrosAbertos(false); }} />}
      {dialogo && <Dialogo {...dialogo} onFechar={() => setDialogo(null)} />}
      {toast && <Toast key={toast.id} toast={toast} onFechar={() => setToast(null)} />}
    </div>
  );
}

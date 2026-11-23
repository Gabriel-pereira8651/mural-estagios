import Icone, { IC } from './Icone';

// App bar no padrão do app do Inatel
export default function Cabecalho({ titulo, raiz, onMenu, onVoltar, onBusca, voltarBloqueado, temNovidade }) {
  return (
    <header className="topo">
      {raiz ? (
        <button className="icone-btn so-mobile" onClick={onMenu} aria-label="Abrir menu">
          <Icone d={IC.menu} tamanho={24} />
          {temNovidade && <span className="ponto" aria-hidden="true" />}
        </button>
      ) : (
        <button className="icone-btn" onClick={onVoltar} disabled={voltarBloqueado} aria-label="Voltar">
          <Icone d={IC.seta} tamanho={24} />
        </button>
      )}
      <h1>{titulo}</h1>
      <button className="icone-btn" onClick={onBusca} aria-label="Buscar vagas"><Icone d={IC.busca} tamanho={24} /></button>
    </header>
  );
}

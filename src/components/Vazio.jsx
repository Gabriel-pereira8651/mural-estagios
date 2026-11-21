import Icone from './Icone';

export default function Vazio({ icone, titulo, texto, acao, onAcao }) {
  return (
    <div className="vazio">
      <span className="vazio-ic"><Icone d={icone} tamanho={26} /></span>
      <h2>{titulo}</h2>
      <p>{texto}</p>
      {acao && <button className="btn secundario" onClick={onAcao}>{acao}</button>}
    </div>
  );
}

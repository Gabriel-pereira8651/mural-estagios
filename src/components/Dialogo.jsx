import useEsc from '../hooks/useEsc';

export default function Dialogo({ titulo, texto, confirmar, manter, onConfirmar, onFechar }) {
  useEsc(onFechar);
  return (
    <div className="overlay meio" onClick={onFechar}>
      <div className="dialogo" role="alertdialog" aria-modal="true" aria-labelledby="dlg-t" aria-describedby="dlg-d" onClick={e => e.stopPropagation()}>
        <h2 id="dlg-t">{titulo}</h2>
        <p id="dlg-d">{texto}</p>
        <div className="dialogo-acoes">
          <button className="btn secundario" onClick={onFechar} autoFocus>{manter}</button>
          <button className="btn perigo" onClick={() => { onConfirmar(); onFechar(); }}>{confirmar}</button>
        </div>
      </div>
    </div>
  );
}

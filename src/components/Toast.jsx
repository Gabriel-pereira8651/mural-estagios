export default function Toast({ toast, onFechar }) {
  return (
    <div className="toast" role="status">
      <span>{toast.msg}</span>
      {toast.acao && <button onClick={() => { toast.acao.fn(); onFechar(); }}>{toast.acao.rotulo}</button>}
    </div>
  );
}

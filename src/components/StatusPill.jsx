export default function StatusPill({ status }) {
  const classe = status === 'Em análise' ? 'analise' : 'enviada';
  return <span className={'status ' + classe}>{status}</span>;
}

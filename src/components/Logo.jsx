export default function Logo({ vaga, grande }) {
  return <span className={'logo-emp' + (grande ? ' grande' : '')} style={{ background: vaga.cor }} aria-hidden="true">{vaga.sigla}</span>;
}

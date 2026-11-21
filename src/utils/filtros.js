export const FILTROS_VAZIOS = { busca: '', curso: '', periodo: 0, modalidade: '' };
export const ABREV_CURSO = { 'Engenharia de Software': 'Eng. Software', 'Engenharia de Computação': 'Eng. Computação', 'Engenharia de Telecomunicações': 'Eng. Telecom', 'Engenharia Elétrica': 'Eng. Elétrica' };
export function chipsAtivos(f) {
  const c = [];
  if (f.curso) c.push({ chave: 'curso', rotulo: ABREV_CURSO[f.curso] || f.curso });
  if (f.periodo) c.push({ chave: 'periodo', rotulo: `Até o ${f.periodo}º período` });
  if (f.modalidade) c.push({ chave: 'modalidade', rotulo: f.modalidade });
  return c;
}

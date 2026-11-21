// Datas relativas a hoje, para a demonstração sempre fazer sentido
export const HOJE = new Date(); HOJE.setHours(0, 0, 0, 0);
export const MS_DIA = 86400000;
export function diasDe(n) { const d = new Date(HOJE); d.setDate(d.getDate() + n); return d; }
export function diffDias(a, b) { return Math.round((a - b) / MS_DIA); }
export const fmtData = d => d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
export const fmtDataCompleta = d => d.toLocaleDateString('pt-BR');
export const fmtHora = d => d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
export const normaliza = s => (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
export const fmtTamanho = b => b < 1024 * 1024
  ? Math.max(1, Math.round(b / 1024)) + ' KB'
  : (b / 1024 / 1024).toFixed(1).replace('.', ',') + ' MB';
export const LIMITE_PDF = 5 * 1024 * 1024;

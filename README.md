# Mural de Estágios (App Inatel)

Protótipo da nova funcionalidade **Mural de Estágios** do App Inatel, feito para o projeto final de S205 Interface Homem-Máquina.

## Rodar no computador

Precisa do [Node.js](https://nodejs.org) 18 ou mais novo.

```bash
npm install
npm run dev
```

Abra o endereço que aparecer no terminal (normalmente http://localhost:5173).

## Publicar no GitHub Pages

1. Crie um repositório no GitHub e envie esta pasta inteira para a branch `main`.
2. No repositório, vá em **Settings → Pages** e, em **Source**, escolha **GitHub Actions**.
3. Cada push na `main` gera o build e publica sozinho (aba **Actions** mostra o andamento).
4. O link fica `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

## Estrutura

```
src/
  models/       Classes do diagrama de classes: Aluno, Vaga, Curriculo, Candidatura, MuralEstagios
  data/         Dados simulados (aluno e vagas) e persistência no localStorage
  screens/      Uma tela por arquivo, na ordem do wireframe
  components/   Peças reutilizáveis: app bar, menu, cards, filtros, diálogo, toast
  hooks/        useEsc (fecha menus com Esc)
  utils/        Datas, formatação e filtros
  App.jsx       Estado global, navegação entre telas e regras de negócio
  main.jsx      Ponto de entrada
  styles.css    Estilos com tema claro e escuro no padrão do app do Inatel
```

## Telas e passos da HTA

| Tela | Passo da HTA |
|---|---|
| TelaInicio (Avisos) | Entrada, atalho para o mural e lembretes |
| Menu | 1. Abrir mural de vagas |
| TelaMural + PainelFiltros | 2.1 Filtrar vagas |
| TelaDetalhes | 2.2 Ler detalhes / 2.3 Salvar vaga |
| TelaEnviar | 3. Enviar candidatura (A: currículo do perfil / B: anexar PDF) |
| TelaSucesso | Feedback: comprovante |
| TelaMinhas | Feedback: "Minhas candidaturas" com status |

O menu lateral tem a opção **Reiniciar demonstração** para voltar aos dados iniciais.

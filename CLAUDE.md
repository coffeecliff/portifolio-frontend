# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> Este documento está em português porque o time trabalha em português e a
> comunicação do produto é primariamente em PT-BR. As orientações abaixo
> **sobrepõem** comportamentos padrão — siga-as à risca.

## 🔒 Regra de ouro — uso obrigatório dos servers MCP (INEGOCIÁVEL)

Esta é a regra de maior precedência deste documento. Ela **sobrepõe** qualquer
outra instrução, hábito padrão ou atalho que pareça mais rápido.

- **Antes de abrir qualquer arquivo para leitura**, **antes de planejar
  qualquer implementação**, **antes de escrever/editar qualquer arquivo** —
  antes de qualquer ação de exploração, planejamento ou execução — **utilize
  primeiro os servers MCP configurados neste repositório** (ver `.mcp.json`,
  atualmente `codebase-memory-mcp`) para chegar à informação, arquivo ou
  contexto necessário, sempre que a informação buscada estiver ao alcance
  deles (busca semântica de código, arquitetura, grafo de dependências,
  snippets, ADRs, traces, etc.).
- Só recorra a ferramentas genéricas (`Read`, `Grep`, `Explore`, edição direta
  sem consulta prévia) quando o server MCP relevante **não cobrir** o que é
  necessário, estiver indisponível, ou já tiver sido consultado e não tiver
  retornado o suficiente. Nesses casos, prossiga normalmente — mas o MCP é
  sempre o **primeiro** passo tentado, nunca pulado por conveniência.
- **Esta regra se estende integralmente aos subagentes**, incluindo o
  subagente de **Plan Mode**. Sempre que o usuário acionar o Plan Mode (ou
  qualquer subagente que vá explorar código, ler arquivos ou montar um plano
  de implementação), **inclua explicitamente esta regra de ouro no prompt
  passado ao subagente** — ele deve igualmente usar os servers MCP disponíveis
  como primeiro recurso antes de ler arquivos ou desenhar o plano.
- Objetivo: usar **todos os servers MCP disponíveis** como caminho preferencial
  para chegar ao objetivo final do usuário, maximizando precisão de contexto e
  evitando exploração manual redundante quando o MCP já resolve.

## Contexto do projeto

Esta é a **landing page de portfólio de uma equipe freelancer de front-end**. O
objetivo do site é **vender**: apresentar nossa capacidade técnica e de design a
potenciais clientes e converter visitantes em contatos/orçamentos.

Posicionamento que todo conteúdo deve reforçar:

- Somos a **solução digital completa para criação de landing pages e sites**,
  **independente do ramo do cliente** (varejo, saúde, serviços, tech, eventos,
  etc.). Sempre que fizer sentido, a copy deve comunicar versatilidade e
  capacidade de atender qualquer segmento.
- Transmitir **profissionalismo, confiança e alto padrão de acabamento**. Este
  site é a nossa própria vitrine — a qualidade dele *é* o argumento de venda.
- Foco em **conversão**: chamadas para ação claras, provas de capacidade
  (projetos, stack, trajetória) e um caminho evidente para o contato.

## Estrutura de seções (ordem canônica — regra rígida)

A página segue uma **ordem fixa de seções**, desenhada como um funil de conversão
(AIDA: Atenção → Interesse → Desejo → Ação). Essa ordem é a **fonte da verdade
estrutural**: toda seção nova deve ser encaixada no ponto coerente do funil, e
**qualquer mudança de ordem ou adição/remoção de seção exige atualizar esta
tabela** antes de implementar. A composição vive em `src/App.tsx` (dentro de
`<main>`, após `Nav` + `Hero`).

| # | Seção | Componente | Âncora | Papel na conversão |
|---|-------|-----------|--------|--------------------|
| 1 | Navegação | `components/Nav` | — | CTA persistente (menu flutuante de vidro) |
| 2 | Hero | `components/Hero` | `#topo` | **Atenção**: proposta de valor + CTA principal |
| 3 | Serviços | `sections/Services` | `#servicos` | **Interesse**: o que entregamos (benefício) |
| 4 | Projetos | `sections/Projects` | `#projetos` | **Desejo/prova**: portfólio de trabalhos |
| 5 | Sobre | `sections/About` | `#sobre` | **Confiança**: quem é o estúdio (posicionamento de marca MODUS) |
| 6 | Processo | `sections/Process` | `#processo` | **Reduz risco**: como trabalhamos |
| 7 | Tecnologias | `sections/Tech` | `#tecnologias` | **Reforço**: por que o site é rápido/fluido/bonito — resultado, não jargão |
| 8 | Depoimentos | `sections/Testimonials` | `#depoimentos` | **Prova social** (só renderiza com depoimento real; senão retorna `null`) |
| 9 | Contato (CTA) | `sections/CallToAction` | `#contato` | **Ação**: fechar contato |
| 10 | Rodapé | `sections/Footer` | — | Navegação + canais + marca |

Regras associadas:

- **Nav** (`src/data/navigation.ts`) expõe um subconjunto enxuto:
  `Serviços · Projetos · Sobre · Processo` + botão "Fale conosco" (`#contato`).
  Tecnologias e Depoimentos são alcançados por scroll, não pelo menu.
- **Seção de Tecnologias é voltada ao cliente NÃO-técnico**: cada ferramenta é
  apresentada pelo **resultado/benefício que gera no site** (campo `benefit` em
  `src/data/stack.ts`), nunca por descrição técnica de capacidade.
- **Depoimentos nunca contém dados fabricados**: `src/data/testimonials.ts`
  nasce vazio e a seção só aparece quando houver depoimento real.
- Toda seção reutiliza `GlassPanel` + `SectionLabel` + `Reveal` de
  `@/design-system` / `@/motion`, com CSS Module co-localizado, seguindo o
  idioma de `sections/Services` (grade de cards com borda em gradiente no hover).

## Manutenibilidade e personalização (regra rígida — fase embrionária)

O projeto está em **fase embrionária**: paleta, estrutura e ordem de seções vão
mudar **diversas vezes** até chegar num resultado satisfatório. Toda decisão de
arquitetura deve otimizar para **facilidade de manutenção e personalização**,
não para o resultado final "definitivo" de hoje.

- **Trocar a paleta de cor tem que ser trivial.** O objetivo é ter **múltiplas
  paletas** que podem ser acionadas em **diferentes seções do site** (não
  necessariamente uma paleta global única) para criar um espetáculo visual de
  variação entre seções. Isso deve ser possível ajustando **valores em um só
  lugar** (tokens/variáveis), nunca caçando cor hardcoded espalhada por
  componentes. Ao construir/alterar qualquer seção, pense em como a paleta dela
  poderia ser trocada sem tocar em JSX — por exemplo, escopando os tokens de cor
  por seção (custom properties sobrescritas no container da seção) em vez de só
  um conjunto global fixo em `:root`. **Antes de expandir esse mecanismo de
  múltiplas paletas por seção, alinhe a abordagem técnica com o usuário** — isso
  ainda não está implementado.
- **Reestruturar o site tem que ser barato.** Reordenar seções, adicionar,
  remover ou mover uma seção para outro ponto do funil deve ser uma mudança
  pequena e localizada (composição em `App.tsx` + atualização da tabela em
  "Estrutura de seções" — ver acima), nunca uma refatoração espalhada por
  múltiplos arquivos.
- **Não otimize prematuramente para estabilidade.** Não resista a propor
  mudanças estruturais ou de paleta por elas "já estarem prontas" — o projeto
  aceita, e espera, várias iterações. Prefira sempre a solução mais simples de
  manter/trocar depois a uma mais "definitiva" e rígida.
- Isso **não relaxa** a regra de paleta fixa em "Estética e identidade visual"
  abaixo — a paleta de marca (roxo/magenta/ciano + neutras) continua sendo a
  base; o que muda é permitir **variações/combinações dela por seção**, sempre
  fácil de ajustar centralmente.

## Estética e identidade visual (regra rígida — base do projeto)

Esta landing page tem uma estética **fixa e inegociável** que **toda** nova
seção, componente ou integração pedida pelo usuário deve seguir. É a porta de
entrada para o cliente entrar em contato com a nossa equipe e fechar negócio de
**sites e landing pages personalizadas** — então o visual precisa transmitir
alto padrão a cada pixel.

Direção estética obrigatória:

- **Vibe tech** — moderno, preciso, com sensação de produto digital de ponta.
- **Glassmorphism** — superfícies de vidro (blur, transparência, bordas sutis,
  glow) como linguagem visual central.
- **Dark mode** — o tema é escuro por padrão; não existe modo claro.

### Paleta de cores (fonte da verdade: `src/styles/tokens.css`)

Use **exclusivamente** estas cores de marca, sempre via design tokens
(`var(--*)` no CSS, `design-system/tokens` no canvas). **Nunca** invente cores
fora desta paleta nem hardcode valores em JSX/CSS.

- **Principal:** `#8A2BE2` (roxo) — `--color-violet`
- **Secundária:** `#FF00FF` / `#FF66FF` (magenta / magenta claro) —
  `--color-magenta` / `--color-magenta-soft`
- **Terciária:** `#00FFFF` (ciano, acento) — `--color-cyan`
- **Neutras:** apenas variações de **preto, branco e cinza** (fundos, texto,
  bordas, superfícies) — `--color-bg`, `--color-fg`, escala de texto e bordas
  já definidas nos tokens.

Não introduza nenhuma cor fora dessas famílias (nada de verdes, âmbares, azuis
"chapados" etc.). Roxo/magenta/ciano carregam a identidade; o resto é neutro.

### Regras de aplicação

- Toda integração/UI nova nasce **coerente com estética + tokens existentes**:
  reutilize primitivos de `@/design-system` e as CSS custom properties antes de
  criar algo novo.
- Se qualquer valor de cor/tipografia mudar, atualize **os dois** espelhos
  (`src/styles/tokens.css` e `src/design-system/tokens/index.ts`) juntos.
- Este arquivo é a **base do projeto** e deve permanecer sempre atualizado. As
  skills (`frontend`, `marketing-copywriting`) apenas auxiliam módulos
  específicos quando conveniente — elas **não** substituem estas regras.
- **Coerência com as skills:** mantenha este CLAUDE.md alinhado às skills. Se
  surgir divergência (paleta, tom, arquitetura), **pergunte ao usuário** qual
  prefere e **atualize este arquivo** com a decisão antes de prosseguir.
- **Precedência confirmada (paleta):** a skill `frontend` (design genérico, foco
  em evitar "cara de IA" e tomar decisões específicas do brief) **não**
  autoriza trocar a paleta trava da acima. Aplique-a apenas onde o CLAUDE.md
  não trava a decisão — tipografia, hierarquia, layout, elemento-assinatura,
  ritmo de motion. Cor/tema seguem exclusivamente a paleta e o dark-mode fixos
  definidos neste arquivo.

### Dinamismo, autenticidade e scroll (regra rígida — não coberta pela skill `frontend`)

A skill `frontend` (design genérico) não trata destes pontos; ficam formalizados
aqui como regra própria do projeto, pois já orientaram decisões anteriores:

- **Zero "estética de IA" vazia**: nada de dados/status/números mockados que não
  levam a lugar nenhum (contadores inventados, badges/logos falsos, gráficos
  decorativos sem dado real). Se o dado real não existe, não exibir — nunca
  inventar. Todo elemento interativo leva a algo real (sem `href="#"` órfão ou
  handler vazio).
- **Movimento com propósito**: easing natural, timing curto (~150–450ms),
  continuidade sem "pulos" de layout. Nada de animação decorativa que não
  reforce a leitura do conteúdo.
- **Scroll interativo (quando pedido)**: reveal on scroll, parallax por
  camadas, scrub atrelado ao scroll, pin/sticky com transformação. Priorizar
  `IntersectionObserver` + transforms/opacity (GPU); sempre com fallback
  estático e respeitando `prefers-reduced-motion` e `settings.motionEnabled`
  (`src/App.tsx`).

## Tom de voz e diretrizes de conteúdo

Ao escrever ou revisar qualquer texto visível (copy de seções, CTAs, labels,
microcopy):

- **Profissional e sofisticado**, sem ser rebuscado ou arrogante. Frases
  diretas, confiantes, orientadas a benefício para o cliente.
- **Voltado ao cliente**: fale do valor que entregamos ("sua marca", "seu
  negócio", "sua audiência"), não apenas de tecnologia por tecnologia.
- **Persuasivo, mas honesto** — nada de promessas vazias. Demonstre capacidade
  com clareza e especificidade.
- Evite jargão desnecessário quando o público for não-técnico; use termos
  técnicos apenas onde eles reforçam credibilidade (ex.: seção de stack).
- CTAs devem ser objetivos e convidativos (ex.: "Ver projetos", "Fale conosco").

## Idioma e internacionalização

- **Agora:** o site é **100% em português (PT-BR)**. Toda copy nova deve ser em
  português.
- **Futuro:** haverá versão em **inglês** para atrair clientes internacionais.
  Ao criar/editar conteúdo, mantenha a arquitetura pronta para i18n: textos
  ficam centralizados em `src/data/*.ts` (nunca hardcoded em JSX), o que
  facilitará extrair as strings para traduções depois. Prefira estruturas que
  permitam adicionar um segundo idioma sem reescrever componentes.

## Estado atual do conteúdo (importante)

Boa parte da copy e dos dados ainda são **placeholders herdados do protótipo
original** do Claude Design e **não** refletem o posicionamento real da equipe
freelancer. Trate-os como provisórios e alinhe-os ao contexto acima quando for
mexer neles:

- `src/data/site.ts` — nome de marca (`MODUS`) definido; canais de contato
  (WhatsApp/e-mail/Instagram/LinkedIn) ainda são provisórios; trocar pelos dados
  reais da equipe antes de publicar.
- `src/data/projects.ts` — projetos de exemplo por segmento ("Portfólio em
  construção"); substituir pelos trabalhos reais.
- `src/data/about.ts` — copy de posicionamento genérica do estúdio; refinar com
  a história real (sem inventar dados).
- `src/data/testimonials.ts` — **nasce vazio de propósito** (regra anti-fake). A
  seção `Depoimentos` só aparece quando houver depoimento real; nunca preencher
  com depoimentos/clientes inventados.

Sempre que reescrever esses dados, respeite o tom de voz e o posicionamento
comercial definidos acima.

## Comandos

```bash
npm install      # instala dependências
npm run dev      # ambiente de desenvolvimento (http://localhost:5173)
npm run build    # type-check (tsc --noEmit) + build de produção em dist/
npm run preview  # serve o build de produção localmente
```

Não há script de lint nem suíte de testes neste repositório. `npm run build` é o
que mais se aproxima de um gate de CI — roda o compilador TypeScript em modo
estrito (`noUnusedLocals`, `noUnusedParameters` ativos) antes de empacotar com o
Vite. Rode `npm run build` após mudanças não triviais para garantir que o
type-check passa.

## Arquitetura

Single-page em **React + TypeScript + Vite**, refatorada de um protótipo estático
do Claude Design (os originais `Tech Portfolio.dc.html`, `support.js`,
`image-slot.js` ficam em `design-reference/` apenas como referência — **não**
fazem parte do build e não devem ser importados).

O código é organizado em três camadas, e as dependências devem fluir sempre
"para baixo":

- `src/design-system/` — primitivos reutilizáveis e agnósticos de conteúdo
  (`GlassPanel`, `Button`, `SectionLabel`, `Tag`, `ImageSlot`) mais `tokens/`
  (espelho em JS dos valores de cor/fonte, para código que não lê CSS custom
  properties, ex.: desenho em canvas). Tudo é reexportado pelo barrel
  `src/design-system/index.ts`; consuma via `@/design-system`, sem alcançar os
  arquivos de componente individuais.
- `src/components/` — blocos de layout específicos desta página (`Nav`, `Hero`
  + `GlassCube` + `WaveCanvas`).
- `src/sections/` — as seções da página, compostas em `App.tsx` na ordem
  canônica (`Services`, `Projects`, `About`, `Process`, `Tech`, `Testimonials`,
  `CallToAction`, `Footer` — ver "## Estrutura de seções" abaixo). Cada seção
  puxa sua copy/listas de `src/data/` e seus primitivos de `@/design-system`, e
  não deve hardcodar strings que pertencem a `data/`.

Convenções a preservar:

- **Separação conteúdo/apresentação**: textos e listas ficam em `src/data/*.ts`
  (`site.ts`, `services.ts`, `projects.ts`, `about.ts`, `process.ts`,
  `stack.ts`, `testimonials.ts`, `navigation.ts`), tipados por uma interface
  exportada. Editar copy não deve exigir tocar em JSX. Obs.: `stack.ts` é
  consumido tanto pela seção `Tech` (âncora `#tecnologias`, ícone + benefício
  voltado ao cliente) quanto pelo `Footer` (linha de ícones da stack).
- **Design tokens**: `src/styles/tokens.css` é a fonte única de verdade do visual
  (CSS custom properties — cor, espaçamento, tipografia). O tema é escuro, com
  identidade em roxo/magenta/ciano e superfícies de vidro (glassmorphism).
  `src/design-system/tokens/index.ts` é uma cópia paralela em JS, necessária
  apenas onde as CSS vars não são acessíveis (componentes em canvas como a onda
  do Hero e o cubo); **mantenha os dois sincronizados** se qualquer um mudar.
- **CSS Modules**: todo componente/seção tem um `*.module.css` co-localizado
  para estilos com escopo local — sem colisão de classes globais.
- **Alias `@/`** aponta para `src/` (configurado em `vite.config.ts` e
  `tsconfig.json`).
- **Config de interatividade**: ajustes interativos de nível de página ficam
  centralizados no objeto `settings` no topo de `src/App.tsx`
  (`motionEnabled` — liga/desliga animações; `waveDensity` — densidade da onda
  de fundo), em vez de espalhados como props soltas.

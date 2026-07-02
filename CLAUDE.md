# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> Este documento está em português porque o time trabalha em português e a
> comunicação do produto é primariamente em PT-BR. As orientações abaixo
> **sobrepõem** comportamentos padrão — siga-as à risca.

## Contexto do projeto

Esta é a **landing page de portfólio de uma dupla freelancer de front-end**. O
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

## Estética e identidade visual (regra rígida — base do projeto)

Esta landing page tem uma estética **fixa e inegociável** que **toda** nova
seção, componente ou integração pedida pelo usuário deve seguir. É a porta de
entrada para o cliente entrar em contato com a nossa dupla e fechar negócio de
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
  skills (`frontend-3d-ux`, `marketing-copywriting`) apenas auxiliam módulos
  específicos quando conveniente — elas **não** substituem estas regras.
- **Coerência com as skills:** mantenha este CLAUDE.md alinhado às skills. Se
  surgir divergência (paleta, tom, arquitetura), **pergunte ao usuário** qual
  prefere e **atualize este arquivo** com a decisão antes de prosseguir.

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
original** do Claude Design e **não** refletem o posicionamento real da dupla
freelancer. Trate-os como provisórios e alinhe-os ao contexto acima quando for
mexer neles:

- `src/data/team.ts`, `projects.ts`, `milestones.ts` descrevem um "coletivo de
  tecnologia de elite" fictício — substituir gradualmente pela nossa história e
  trabalhos reais.
- `src/sections/Footer/Footer.tsx` contém links de placeholder (`AAAA`, `BBBB`,
  colunas TRABALHO/SOBRE) que precisam de conteúdo real.

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
- `src/sections/` — as seções da página, compostas em `App.tsx` (`Team`,
  `Projects`, `Timeline`, `Footer`). Cada seção puxa sua copy/listas de
  `src/data/` e seus primitivos de `@/design-system`, e não deve hardcodar
  strings que pertencem a `data/`.

Convenções a preservar:

- **Separação conteúdo/apresentação**: textos e listas ficam em `src/data/*.ts`
  (`team.ts`, `projects.ts`, `stack.ts`, `milestones.ts`, `navigation.ts`),
  tipados por uma interface exportada. Editar copy não deve exigir tocar em JSX.
  Obs.: `stack.ts` existe como dado e é consumido pelo `Footer` (linha de ícones
  da stack); não há uma seção `TechStack` dedicada no momento, apesar de o link
  `#stack` existir na navegação.
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

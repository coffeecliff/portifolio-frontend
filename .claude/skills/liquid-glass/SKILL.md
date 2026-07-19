---
name: liquid-glass
description: Fundamentos, funcionamento e implementação do Liquid Glass (o material da Apple — WWDC 2025) traduzidos para a web deste projeto (React + CSS). Use ao criar, revisar ou refinar qualquer superfície de vidro, painel, nav, botão, card ou modal glassmorphism; ao decidir blur/tint/refração/specular; ao animar/morfar/mesclar superfícies de vidro; ou ao ajustar tokens de vidro. Gatilhos: "liquid glass", "vidro", "glass", "glassmorphism", "blur", "backdrop-filter", "refração", "lensing", "specular", "GlassPanel", "superfície de vidro", "material de vidro".
---

# Liquid Glass

Liquid Glass é o material dinâmico que a Apple introduziu como linguagem visual unificada (iOS/iPadOS/macOS/tvOS/watchOS/visionOS 26). Não é "um blur com transparência" — é um **material óptico** que refrata a luz e a cor do conteúdo por trás, reage ao toque/ponteiro em tempo real, e existe numa **camada funcional própria** acima do conteúdo. Esta skill destila os fundamentos oficiais e os traduz para a **web deste projeto** (não temos SwiftUI; temos CSS + React). A fonte é a documentação oficial da Apple — o mapeamento completo das APIs nativas está em `references/apple-native-api.md`.

Objetivo prático: quando o projeto pedir "uma superfície de vidro", o resultado deve ter a **profundidade e a intenção do Liquid Glass real** — não o retângulo semitransparente genérico com `backdrop-filter: blur(10px)` que grita "estética de IA".

## O modelo mental (comece sempre por aqui)

Liquid Glass organiza a UI em **duas camadas** e essa separação é o fundamento de tudo:

1. **Camada de conteúdo** (fundo): o conteúdo do app, backgrounds, mídia. **Nunca** recebe vidro.
2. **Camada de Liquid Glass** (topo): navegação e controles — nav, sidebars, toolbars, botões flutuantes, modais. **Flutua** sobre o conteúdo, deixando cor e luz atravessarem de baixo para cima, com sombra sutil que reforça a separação 3D.

Regra derivada: **vidro é para navegação e controle, não para conteúdo.** Aplicar vidro no conteúdo (ou em tudo) destrói a hierarquia — é o erro nº 1. Exceção: controles interativos transitórios (slider, toggle) que ganham vidro apenas enquanto ativos.

No nosso projeto isso já existe implicitamente: a `Nav` (menu flutuante de vidro) é a camada de vidro; as seções são conteúdo. Ao adicionar qualquer superfície de vidro nova, pergunte primeiro: *isto é navegação/controle (merece vidro) ou é conteúdo (não merece)?*

## Anatomia óptica — o que compõe o material

O "vidro" convincente é a soma de camadas ópticas simultâneas. Todo componente de vidro deve reproduzir estas propriedades (as 3 primeiras são obrigatórias; as 2 últimas dão o acabamento "real"):

1. **Blur do fundo** — desfoca o conteúdo atrás para preservar legibilidade do que está sobre o vidro.
2. **Resposta à cor/luz do entorno** — o vidro puxa cor e luminosidade do que está atrás (saturação/brilho), não é um cinza morto. Sobre fundo escuro fica mais escuro; sobre claro, mais claro.
3. **Sombra de elevação** — sombra suave que separa o vidro do conteúdo (dimensionalidade / camada flutuante).
4. **Specular highlight (borda de luz)** — uma borda fina de luz no topo/quinas, como o reflexo na aresta de um vidro real. É o que mais distingue Liquid Glass de glassmorphism raso.
5. **Lensing / refração de borda** — o vidro *dobra* o que está atrás nas bordas, como uma lente. É a assinatura do Liquid Glass da Apple. Na web é o efeito mais caro (ver seção de refração) — use com parcimônia, em superfícies-assinatura.

Se você só fizer blur + transparência, tem glassmorphism 2020. Liquid Glass = blur + resposta de cor + sombra + specular (+ lensing onde valer o custo).

## Variantes do material

A API nativa expõe três configurações de `Glass` — traduza-as como variantes de token/componente no projeto:

- **`regular`** (padrão): desfoca e ajusta a luminosidade do fundo, garantindo legibilidade. Use quando houver texto significativo (nav, modais, popovers, alertas) ou quando o fundo for imprevisível. **É o default para 90% dos casos.**
- **`clear`**: altamente translúcido, prioriza a visibilidade do que está atrás. Só para vidro flutuando sobre **mídia rica** (foto/vídeo). Cuidado com legibilidade: sobre fundo claro, adicione uma camada de escurecimento (~35% de opacidade) atrás do conteúdo; sobre fundo escuro, dispensa.
- **`identity`**: "sem efeito" — o conteúdo passa como se não houvesse vidro. Útil como estado neutro em transições/animações.

Modificadores encadeáveis do material nativo: **`tint(Color?)`** (dá cor/prominência) e **`interactive(Bool)`** (faz reagir a toque/ponteiro). No projeto, `tint` **só pode usar a paleta travada** (roxo/magenta/ciano — ver "Integração").

## Onde e quando usar — regras rígidas

**FAÇA:**
- Use vidro na camada funcional: nav, sidebars, toolbars, botões de ação importantes, modais/sheets.
- Escolha a variante pelo fundo: `regular` para texto/fundo incerto; `clear` só sobre mídia.
- Use cores vibrantes do sistema (no nosso caso, os tokens de marca) sobre o vidro para contraste garantido.
- Concentre o efeito nos elementos funcionais **mais importantes**.

**NÃO FAÇA:**
- Não coloque vidro na camada de conteúdo nem em "tudo" — quebra a hierarquia.
- Não empilhe muitas superfícies de vidro na mesma tela (custo de render + poluição visual).
- Não use `clear` sobre fundo claro sem escurecimento.
- Não sobreponha/encoste elementos de vidro sem espaçamento (a menos que a intenção seja mesclá-los — ver morphing).

## Como a Apple implementa (referência conceitual)

Mesmo sem SwiftUI, a **mecânica** informa nossa implementação web. Resumo (API completa em `references/apple-native-api.md`):

- **`glassEffect(_:in:)`** — aplica o material a uma view, dentro de uma forma (default: `Capsule`; pode ser `.rect(cornerRadius:)`, círculo etc.). Ex.: `.glassEffect(.regular.tint(.orange).interactive())`.
- **`GlassEffectContainer(spacing:)`** — agrupa várias views de vidro num **único passo de render** (performance) e permite que suas formas **se mesclem e se transformem** umas nas outras. O `spacing` controla a distância em que as formas começam a fundir: quanto maior, mais cedo fundem. Se o `spacing` do container > spacing do `HStack` interno, as formas já nascem fundidas.
- **`glassEffectUnion(id:namespace:)`** — força várias views a contribuírem para **uma só** cápsula de vidro (útil para grupos/itens dinâmicos).
- **`glassEffectID(_:in:)` + `Namespace` + `GlassEffectTransition`** — coordena o **morphing** quando views entram/saem: `matchedGeometry` (default, para formas dentro do spacing do container) ou `materialize` (para formas mais distantes). O sistema usa geometria + spacing para decidir o que se transforma em quê.

Três ideias transferem para a web: **(a)** vidro é forma+material configuráveis; **(b)** agrupar reduz custo e habilita fusão; **(c)** proximidade controla fusão, e transições fazem formas morfarem.

## Tradução para a web (o núcleo prático deste projeto)

Não existe `backdrop-filter: liquid-glass`. Reconstruímos o material empilhando camadas. **Antes de escrever CSS novo, cheque se `GlassPanel` (`@/design-system`) já resolve** — estenda-o com variantes em vez de criar vidro paralelo. Toda cor sai de `var(--*)`; nada de hex hardcoded.

### 1. Tokens de vidro (fonte da verdade)

Centralize o material em custom properties (em `src/styles/tokens.css`; espelhe no `design-system/tokens/index.ts` se for consumido em canvas). Isso torna trocar/tunar o vidro trivial — coerente com a regra de manutenibilidade do projeto:

```css
:root {
  /* Liquid Glass — camada REGULAR (default, dark mode) */
  --glass-blur: 20px;
  --glass-saturate: 180%;
  --glass-bg: rgba(255, 255, 255, 0.06);      /* tinta neutra sutil sobre dark */
  --glass-border: rgba(255, 255, 255, 0.14);   /* aresta base */
  --glass-specular: rgba(255, 255, 255, 0.55); /* brilho da borda de luz */
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.45);
  --glass-radius: 20px;

  /* Variante CLEAR (só sobre mídia) */
  --glass-clear-bg: rgba(255, 255, 255, 0.02);
  --glass-clear-blur: 8px;
  --glass-clear-dim: rgba(0, 0, 0, 0.35);       /* escurecimento p/ fundo claro */
}
```

Tint por seção/estado: sobrescreva `--glass-bg`/`--glass-border` no container da seção usando a paleta travada (ex.: `--glass-tint: color-mix(in srgb, var(--color-violet) 18%, transparent)`), nunca no JSX. Isso encaixa no mecanismo de "paletas por seção" do CLAUDE.md — **alinhe com o usuário antes de expandi-lo**.

### 2. Receita CSS base (Regular)

As camadas empilhadas que produzem o material. Ordem importa:

```css
.glass {
  position: relative;
  border-radius: var(--glass-radius);
  background: var(--glass-bg);
  /* blur + resposta de cor/luz do fundo (propriedades 1 e 2) */
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate));
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate));
  /* sombra de elevação (propriedade 3) */
  box-shadow: var(--glass-shadow),
              inset 0 1px 0 0 var(--glass-specular); /* highlight superior barato */
  border: 1px solid var(--glass-border);
  isolation: isolate;
}

/* Specular highlight rico (propriedade 4): borda em gradiente via máscara */
.glass::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(
    135deg,
    var(--glass-specular) 0%,
    transparent 40%,
    transparent 60%,
    color-mix(in srgb, var(--color-cyan) 30%, transparent) 100%
  );
  /* mostra só a borda (a moldura) */
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
  pointer-events: none;
}
```

Notas: `saturate()` é o que faz o vidro "puxar a cor" do fundo — não omita. O `inset ... specular` no `box-shadow` dá o filete de luz superior; o `::before` mascarado dá a moldura de luz completa (o toque que distingue Liquid Glass). `isolation: isolate` evita bleed de blend com irmãos.

### 3. Variante Interactive (hover/press) — o `interactive()` da Apple

Vidro funcional reage ao ponteiro: a luz "escorre" e o material responde. Timing curto (150–300ms), easing natural — coerente com as regras de motion do projeto:

```css
.glassInteractive {
  transition: transform .18s ease, box-shadow .18s ease, background .18s ease;
}
.glassInteractive:hover {
  transform: translateY(-1px);
  background: color-mix(in srgb, var(--glass-bg), var(--color-violet) 8%);
  box-shadow: 0 12px 40px rgba(0,0,0,.5),
              inset 0 1px 0 0 var(--glass-specular);
}
.glassInteractive:active { transform: translateY(0) scale(.985); }
```

Para o brilho que segue o cursor, atualize `--mx/--my` (posição do mouse em %) via JS e posicione um radial-gradient highlight — sempre atrás de `settings.motionEnabled` e `prefers-reduced-motion`.

### 4. Lensing / refração de borda (assinatura — avançado e caro)

O vidro real **dobra** o fundo nas bordas. Na web isso se faz com um filtro SVG `feDisplacementMap`: um mapa de deslocamento (gradiente/ruído) desloca os pixels do fundo, criando distorção de lente na moldura. É **caro** (repaint do fundo) — reserve para 1–2 superfícies-assinatura (ex.: o painel principal do Hero, a Nav), nunca para listas de cards.

```html
<!-- filtro reutilizável; o mapa define a intensidade/perfil da refração -->
<svg width="0" height="0" style="position:absolute">
  <filter id="glass-lensing">
    <feImage href="#displacement-map" result="map"/>
    <feDisplacementMap in="SourceGraphic" in2="map"
      scale="24" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
</svg>
```

```css
.glassLensed { backdrop-filter: blur(var(--glass-blur)) url(#glass-lensing); }
```

O mapa de deslocamento é tipicamente um gradiente radial/linear (borda forte, centro neutro) para que a distorção fique só nas arestas. Suporte varia por browser (Safari/Chromium ok; degrade para blur puro onde `url()` em backdrop-filter não pinta). **Sempre** teste custo de render e ofereça fallback estático.

### 5. Contêiner e performance (o `GlassEffectContainer` da web)

`backdrop-filter` é caro e **não compõe bem empilhado**. Análogos das regras nativas:

- **Limite** o número de superfícies de vidro simultâneas na viewport (a doc nativa alerta explicitamente que excesso degrada performance).
- **Prefira um painel de vidro contínuo** a muitos pequenos quando o layout permitir (equivale a agrupar no container).
- Promova a composição para GPU com moderação; evite `backdrop-filter` animado (anima `transform`/`opacity`, não o blur).
- `content-visibility`/`will-change` com cautela — medir, não presumir.

### 6. Morphing / fusão de superfícies (union + matchedGeometry na web)

Quando duas superfícies de vidro se aproximam e devem **fundir** (como `glassEffectUnion`/morph), a técnica web é o **"gooey filter"**: borrar as formas e reaplicar contraste alto no canal alfa, fazendo bordas próximas se fundirem numa só massa.

```html
<svg width="0" height="0"><filter id="glass-goo">
  <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="b"/>
  <feColorMatrix in="b" mode="matrix"
    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"/>
</filter></svg>
```

Aplique `filter: url(#glass-goo)` no **container** das formas; ao animar posições (aproximar/afastar), elas morfam juntas/separadas — o análogo direto do `spacing` do `GlassEffectContainer`. Para transições de entrada/saída com "matched geometry", use uma técnica FLIP (medir posição antes/depois e animar `transform`) ou `layoutId` se houver lib de motion. Tudo respeitando reduced-motion.

## Acessibilidade e motion (obrigatório)

Liquid Glass adapta-se a preferências do usuário — replique isso:

- **`prefers-reduced-transparency`**: reduza/anule o blur e aumente a opacidade do `--glass-bg` para um fundo quase sólido (mantendo contraste do texto).
- **`prefers-contrast: more`**: aumente `--glass-border`/opacidade do fundo; suba o contraste do texto.
- **`prefers-reduced-motion`** e `settings.motionEnabled` (`src/App.tsx`): desligue lensing dinâmico, brilho-que-segue-o-cursor e morphing; mantenha o vidro estático.
- Garanta contraste do conteúdo **sobre** o vidro (texto vibrante da paleta), não só a beleza do material. Vidro bonito com texto ilegível é falha.

```css
@media (prefers-reduced-transparency: reduce) {
  .glass { backdrop-filter: none; background: rgba(20,20,24,.9); }
}
```

## Integração com este projeto (regras travadas)

- **Paleta**: qualquer `tint`/brilho/borda colorida usa **só** roxo `--color-violet`, magenta `--color-magenta`/`--color-magenta-soft`, ciano `--color-cyan` e neutras. Nada fora disso (ver CLAUDE.md → Estética).
- **Dark mode only**: tune os tokens de vidro para fundo escuro; não crie caminho light.
- **Reuse `GlassPanel`** (`@/design-system`) e os primitivos existentes; estenda com variantes (`regular`/`clear`/`interactive`/`lensed`) em vez de vidro solto por seção. CSS Module co-localizado.
- **Dois espelhos de token**: se mudar cor/tipografia usada em canvas, atualize `tokens.css` **e** `design-system/tokens/index.ts` juntos.
- **Sem dado/efeito fake**: nada de brilho/refração "decorativo" que não reforce leitura (regra anti-estética-de-IA). Todo efeito serve à hierarquia ou à interação.
- **Gate de type-check**: rode `npm run build` após mudanças não triviais.

## Checklist antes de entregar uma superfície de vidro

1. É camada funcional (nav/controle/modal), não conteúdo? Se for conteúdo, provavelmente **não** deveria ter vidro.
2. Tem as 3 obrigatórias (blur + saturate + sombra) e, se for superfície-assinatura, specular (+ lensing)?
3. Variante certa: `regular` (default) ou `clear` (só sobre mídia, com dim se fundo claro)?
4. Tint só da paleta travada, via token — zero hex no JSX/CSS?
5. Contagem de superfícies de vidro na viewport está enxuta (performance)?
6. Fallbacks: reduced-transparency, reduced-motion, `settings.motionEnabled`?
7. Contraste do texto sobre o vidro validado?
8. `npm run build` passou?

## Fonte

Documentação oficial da Apple — "Adopting Liquid Glass" e Human Interface Guidelines → Materials, mais as referências de API SwiftUI/UIKit/AppKit. Mapa completo das rotas/APIs nativas em `references/apple-native-api.md`.

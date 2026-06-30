# Tech Portfolio 

Portfólio de um coletivo de tecnologia, refatorado de um protótipo único do
Claude Design para uma aplicação **React + TypeScript + Vite** com uma camada
de **design system**.

## Rodando o projeto

```bash
npm install      # instala dependências
npm run dev      # ambiente de desenvolvimento (http://localhost:5173)
npm run build    # type-check + build de produção em dist/
npm run preview  # serve o build de produção localmente
```

## Estrutura

```
src/
├── design-system/          # camada reutilizável (tokens + primitivos)
│   ├── tokens/             # cores e fontes expostas ao JS (canvas, cubo)
│   └── components/         # GlassPanel, Button, SectionLabel, Tag, ImageSlot
│
├── components/             # blocos de layout
│   ├── Nav/                # navegação flutuante de vidro
│   └── Hero/               # abertura: Hero + GlassCube + WaveCanvas
│
├── sections/              # seções da página
│   ├── Team/               # quem somos
│   ├── Projects/           # trabalhos selecionados
│   ├── TechStack/          # stack de tecnologias
│   ├── Timeline/           # linha do tempo interativa
│   └── Footer/             # contato + redes
│
├── data/                  # conteúdo desacoplado da UI (textos, listas)
│   ├── navigation.ts
│   ├── team.ts
│   ├── projects.ts
│   ├── stack.ts
│   └── milestones.ts
│
├── styles/                # tokens CSS + reset/global + keyframes
│   ├── tokens.css         # fonte única de verdade do visual (var(--*))
│   └── global.css
│
├── App.tsx                # composição da página + config de interatividade
└── main.tsx               # ponto de entrada React
```

## Princípios de organização

- **Design tokens** centralizados em `styles/tokens.css` (CSS custom
  properties). Para mudar a paleta ou tipografia, edite só esse arquivo.
- **Design system** (`src/design-system`) expõe primitivos reutilizáveis via um
  barrel (`@/design-system`). As seções consomem esses componentes em vez de
  repetir estilos.
- **Conteúdo separado da apresentação**: textos e listas vivem em `src/data`,
  então editar conteúdo não exige mexer em JSX.
- **CSS Modules** por componente — escopo local de estilos, sem colisões.
- **Alias `@/`** aponta para `src/` (configurado em `vite.config.ts` e
  `tsconfig.json`).

## Interatividade

As configurações que antes eram props do componente no Claude Design ficam
centralizadas em `src/App.tsx` (`settings`):

| Opção           | Descrição                                   |
| --------------- | ------------------------------------------- |
| `motionEnabled` | Liga/desliga animações (respeita reduced-motion) |
| `cubeFollow`    | Cubo 3D acompanha o mouse                    |
| `waveDensity`   | Densidade de linhas da onda de fundo (12–120) |

## Origem

Os arquivos originais do protótipo (`Tech Portfolio.dc.html`, `support.js`,
`image-slot.js`) são o export do Claude Design e foram preservados como
referência. Não fazem parte do build.

# Liquid Glass — Mapa completo das rotas e APIs nativas (Apple)

Referência bruta extraída da documentação oficial (`developer.apple.com`) para consulta. O `SKILL.md` traduz estes conceitos para a web; este arquivo preserva o material de origem e o mapa de rotas completo para quem precisar do detalhe nativo.

Fonte-raiz: **Adopting Liquid Glass** — `/documentation/technologyoverviews/adopting-liquid-glass`

---

## 1. Fundamentos do material (HIG → Materials)

**O que é:** material dinâmico que unifica a linguagem de design; apresenta controles e navegação sem obscurecer o conteúdo. Forma uma **camada funcional distinta** (tab bars, sidebars) que flutua acima da **camada de conteúdo**, criando hierarquia clara. Deixa cor/luz passarem de baixo para cima; dá dinamismo e profundidade mantendo legibilidade.

**Arquitetura de duas camadas:**
1. Camada Liquid Glass (topo): navegação e controles.
2. Camada de conteúdo (base): backgrounds e conteúdo do app.

**Variantes:**
- **Regular** — desfoca e ajusta luminosidade do fundo; garante legibilidade; scroll edge effects reforçam (blur + redução de opacidade). Sobre escuro fica mais escuro; sobre claro, mais claro. Default da maioria dos componentes. Usar com texto significativo (alertas, sidebars, popovers) ou fundo imprevisível.
- **Clear** — muito translúcido, prioriza o conteúdo atrás; para fundos de mídia rica (foto/vídeo). Legibilidade: fundo claro → camada de dim escura 35%; fundo escuro / controles AVKit → sem dim.

**Propriedades ópticas:**
- Lensing/refração: dobra e deixa o fundo aparecer; ajusta luminosidade conforme espessura/variante.
- Adaptação à luz: adapta-se à luminância de objetos/cores atrás (marcante no visionOS, sem Dark Mode separado).
- Sombra/dimensionalidade: componentes de vidro projetam sombra sutil, reforçando a separação 3D.
- Adaptação dinâmica: responde a configurações do sistema e de acessibilidade.

**Acessibilidade/legibilidade:**
- Use cores vibrantes do sistema (contraste garantido em qualquer contexto).
- Respeita: Reduce transparency, Increase contrast, Reduce motion.
- Vibrância p/ labels (iOS): `label` > `secondaryLabel` > `tertiaryLabel` > `quaternaryLabel` (evitar em ultra-thin/thin). Fills: `fill`/`secondaryFill`/`tertiaryFill`. Materiais mais espessos = mais contraste; mais finos = mais contexto.

**Dos/Don'ts (resumo):** vidro só na camada funcional; variante certa pelo fundo; cores vibrantes; componentes padrão; testar em vários contextos. Não usar vidro na camada de conteúdo; não usar clear sobre claro sem dim; não abusar em controles custom; não usar cores não-vibrantes sobre material.

**Materiais padrão por plataforma:** iOS/iPadOS 4 materiais (`ultraThin`, `thin`, `regular`, `thick`). macOS vários (+ blend "behind window"/"within window"). tvOS foco adota vidro. visionOS material "glass" adaptativo, prefira translucidez. watchOS material em modais full-screen.

---

## 2. Aplicando a views custom (SwiftUI) — o "como"

**`glassEffect(_:in:)`** — adiciona Liquid Glass a uma view. Default: variante `regular` numa forma `Capsule`.

```swift
Text("Hello, World!").font(.title).padding().glassEffect()
Text("Hello, World!").font(.title).padding().glassEffect(in: .rect(cornerRadius: 16.0))
Text("Hello, World!").font(.title).padding().glassEffect(.regular.tint(.orange).interactive())
```

Configuração: formas diferentes (rounded rect p/ componentes grandes), `tint` (prominência), `interactive()` (reage a toque/ponteiro como `PrimitiveButtonStyle.glass`). Aplique `glassEffect` **depois** dos modificadores que afetam a aparência.

**`GlassEffectContainer(spacing:)`** — agrupa múltiplas views de vidro: melhora performance (render combinado) e permite mesclar/morfar formas. `spacing` maior → formas fundem mais cedo ao se aproximar. Se `spacing` do container > spacing do `HStack`/`VStack` interno, formas fundem em repouso.

```swift
GlassEffectContainer(spacing: 40.0) {
  HStack(spacing: 40.0) {
    Image(systemName: "scribble.variable").frame(width: 80, height: 80).font(.system(size: 36)).glassEffect()
    Image(systemName: "eraser.fill").frame(width: 80, height: 80).font(.system(size: 36)).glassEffect()
      .offset(x: -40, y: 0)
  }
}
```

**`glassEffectUnion(id:namespace:)`** — várias views contribuem para **uma** cápsula de vidro (mesma forma/efeito/ID viram uma só). Bom para views dinâmicas ou fora de um container de layout.

```swift
let symbolSet = ["cloud.bolt.rain.fill", "sun.rain.fill", "moon.stars.fill", "moon.fill"]
GlassEffectContainer(spacing: 20.0) {
  HStack(spacing: 20.0) {
    ForEach(symbolSet.indices, id: \.self) { item in
      Image(systemName: symbolSet[item]).frame(width: 80, height: 80).font(.system(size: 36))
        .glassEffect().glassEffectUnion(id: item < 2 ? "1" : "2", namespace: namespace)
    }
  }
}
```

**Morphing / transições:** `glassEffectID(_:in:)` + `@Namespace` + `GlassEffectTransition`. Default `matchedGeometry` (formas dentro do spacing do container); `materialize` (formas mais distantes; usar com `withAnimation`). IDs únicos por namespace garantem morph correto quando views entram/saem.

```swift
@State private var isExpanded = false
@Namespace private var namespace
GlassEffectContainer(spacing: 40.0) {
  HStack(spacing: 40.0) {
    Image(systemName: "scribble.variable").frame(width: 80, height: 80).font(.system(size: 36))
      .glassEffect().glassEffectID("pencil", in: namespace)
    if isExpanded {
      Image(systemName: "eraser.fill").frame(width: 80, height: 80).font(.system(size: 36))
        .glassEffect().glassEffectID("eraser", in: namespace)
    }
  }
}
Button("Toggle") { withAnimation { isExpanded.toggle() } }.buttonStyle(.glass)
```

**Performance:** limitar containers e efeitos fora de containers; limitar nº de efeitos simultâneos na tela. Ver "Explore UI animation hitches and the render loop" e "Optimize SwiftUI performance with Instruments".

---

## 3. Tipo `Glass` (SwiftUI) — configuração do material

Estrutura que define a configuração do material Liquid Glass; usada com `glassEffect(_:in:)`.

| Membro | Assinatura | Descrição |
|---|---|---|
| `regular` | `static var regular: Glass` | Variante regular (default). |
| `clear` | `static var clear: Glass` | Variante clear (translúcida). |
| `identity` | `static var identity: Glass` | Sem efeito — conteúdo intacto (útil em transições). |
| `tint(_:)` | `func tint(Color?) -> Glass` | Copia com tint configurado. |
| `interactive(_:)` | `func interactive(Bool) -> Glass` | Copia configurada como interativa. |

Conforma a `Equatable`, `Sendable`. Disponível em iOS/iPadOS/macOS/tvOS/watchOS 26+.

---

## 4. Escopo de adoção por seção (do "Adopting Liquid Glass")

- **Overview** — componentes padrão de SwiftUI/UIKit/AppKit adotam o visual automaticamente ao compilar com os SDKs novos.
- **Visual Refresh** — aproveitar frameworks do sistema; reduzir backgrounds custom (interferem nos efeitos); testar com acessibilidade; não abusar.
- **App Icons** — ícones em camadas e dinâmicos; 4 variantes (default/dark/clear/tinted); formas sólidas semi-transparentes sobrepostas; Icon Composer.
- **Controls** — knobs viram vidro na interação; botões morfam em menus; formas mais arredondadas; alinhar formas concentricamente; scroll edge effects para legibilidade.
- **Navigation** — vidro na camada de navegação superior; tab bars/sidebars flutuam; hierarquia clara; tab→sidebar adaptável; minimizar tab bar no scroll; background extension effect.
- **Menus & Toolbars** — ícones padrão para ações comuns; agrupar itens; fixed spacers; labels de acessibilidade obrigatórios.
- **Windows & Modals** — cantos mais arredondados; resize contínuo (iPadOS); auditar edges de sheets; remover visual effect views custom.
- **Organization & Layout** — linhas/rows maiores, mais padding, raio de canto maior; capitalização title-style; `FormStyle.grouped`.
- **Search** — campo de busca desliza com o teclado (iOS); usar tabs de busca semânticas.
- **Platform Considerations** — `GlassEffectContainer` para combinar efeitos custom com performance; `UIDesignRequiresCompatibility` para manter aparência antiga em SDK antigo.

---

## 5. Mapa de rotas — APIs e páginas (títulos → caminho)

### Design (HIG) — `/design/Human-Interface-Guidelines/...`
`materials` · `app-icons` · `buttons` · `color` · `icons` · `lists-and-tables` · `menus` · `the-menu-bar` · `search-fields` · `sheets` · `action-sheets` · `sidebars` · `split-views` · `tab-bars` · `toolbars` · `windows`

### SwiftUI — `/documentation/SwiftUI/...`
- Núcleo do vidro: `Applying-Liquid-Glass-to-custom-views` · `View/glassEffect(_:in:)` · `GlassEffectContainer` · `Glass` (variantes) · `Material`
- Formas: `ConcentricRectangle` · `Shape/rect(corners:isUniform:)`
- Botões: `Button` · `PrimitiveButtonStyle/glass` · `PrimitiveButtonStyle/glass(_:)` · `PrimitiveButtonStyle/glassProminent`
- Controles: `Toggle` · `Slider` · `Stepper` · `Picker` · `TextField`
- Navegação/layout: `NavigationStack` · `NavigationSplitView` · `TabViewStyle/sidebarAdaptable` · `WindowStyle/titleBar` · `View/inspector(isPresented:content:)` · `View/backgroundExtensionEffect()` · `View/safeAreaBar(...)` · `View/scrollEdgeEffectStyle(_:for:)`
- Toolbar: `ToolbarSpacer` · `SpacerSizing/fixed` · `ToolbarContent/hidden(_:)`
- Foco/busca/form: `View/focusable(_:)` · `EnvironmentValues/isFocused` · `FormStyle/grouped` · `View/confirmationDialog(...)`

### UIKit — `/documentation/UIKit/...`
- Vidro: `UIGlassEffect` · `UIBackgroundExtensionView` · `UICornerConfiguration-swift.struct` · `UIView/cornerConfiguration`
- Botões glass: `UIButton/Configuration-swift.struct/glass()` · `prominentGlass()` · `clearGlass()` · `prominentClearGlass()`
- Controles/nav: `UISwitch` · `UISlider` · `UIStepper` · `UISegmentedControl` · `UITextField` · `UINavigationBar` · `UITabBar` · `UITabBarController/Mode-swift.enum/tabSidebar` · `UIToolbar` · `UISplitViewController` · `UISplitViewController/Column/inspector`
- Scroll/foco/popover/toolbar: `UIScrollEdgeElementContainerInteraction` · `UIFocusItem` · `UIControl/State-swift.struct/focused` · `UIPopoverPresentationController/sourceView` · `sourceItem` · `UIBarButtonItem/fixedSpace(_:)` · `UIBarButtonItem/isHidden`

### AppKit — `/documentation/AppKit/...`
- Vidro: `NSGlassEffectView` · `NSBackgroundExtensionView`
- Controles/nav: `NSButton` · `NSButton/BezelStyle-swift.enum/glass` · `NSSwitch` · `NSSlider` · `NSStepper` · `NSSegmentedControl` · `NSTextField` · `NSToolbar` · `NSToolbarItem/Identifier/space` · `NSToolbarItem/isHidden` · `NSSplitView` · `NSSplitViewController` · `NSSplitViewItem/init(inspectorWithViewController:)` · `NSAlert/beginSheetModal(for:completionHandler:)`

### Xcode / Infra
`Xcode/creating-your-app-icon-using-icon-composer` · `Xcode/improving-your-app-s-performance` · `BundleResources/Information-Property-List/UIDesignRequiresCompatibility`

### Recursos externos
Apple Design Resources — `https://developer.apple.com/design/resources/`

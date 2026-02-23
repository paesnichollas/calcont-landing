# Design System Audit Notes (Etapa 1)

## 1) Mapa do projeto (arquivos e secoes)

### Entrada principal
- `app/page.tsx`
  - Monta a landing one-page nesta ordem:
    1. `NavbarSection`
    2. `HeroSection`
    3. `SignatureBandSection`
    4. `HighlightsCarouselSection`
    5. `ServicesSection`
    6. `TeamByCitySection`
    7. `NumbersSection`
    8. `GalleryCarouselSection`
    9. `TestimonialsSection`
    10. `CtaSection`
    11. `FooterSection`
    12. `BackToTopButton`

### Layout, tema e estilo global
- `app/layout.tsx`
  - Define metadata, fonte, scripts do GA e provider de tema.
- `app/globals.css`
  - Define tokens semanticos (`:root` e `.dark`) e utilitarios visuais globais.
- `tailwind.config.ts`
  - Mapeia tokens CSS para classes semanticas (`primary`, `background`, `card`, etc.).

### Secoes auditadas (obrigatorias)
- `components/sections/navbar.tsx`
- `components/sections/hero.tsx`
- `components/sections/services.tsx`
- `components/sections/team-by-city.tsx`
- `components/sections/testimonials.tsx`
- `components/sections/numbers.tsx`
- `components/motion/reveal.tsx`

### Conteudo editavel
- `content/*.ts`
  - Dados da UI ficam fora dos componentes.
  - Novo arquivo util de manutencao desta etapa: `content/design-system-notes.md`.

## 2) Problemas atuais (antes da execucao)

1. Tema estava hardcoded em dark no layout (`className="dark"` no html).
2. `:root` e `.dark` tinham os mesmos tokens, sem light mode real.
3. `--primary` estava em vermelho e fora da direcao visual definida.
4. Navbar estava boa em estrutura (sticky + blur + tokens), mas sem toggle de tema e sem logo visual.

## 3) Descobertas importantes para execucao

1. shadcn/ui ja cobre as necessidades de UI desta entrega (`Button`, `DropdownMenu`, `Card`, `Tabs`, etc.).
2. Nao havia `next-themes` no projeto e foi adicionado.
3. O ZIP de referencia existe em `mnt/data/desing-system.zip`.
4. Direcao aprovada para referencia visual: hibrido Corporate + Bequant.

## 4) Pontos exatos de insercao

### ThemeProvider (next-themes)
- Dependencia:
  - `package.json` (adicionado `next-themes`).
  - `pnpm-lock.yaml` atualizado.
- Componente:
  - `components/theme-provider.tsx` (novo).
- Uso no layout:
  - `app/layout.tsx`:
    - `html` com `suppressHydrationWarning`.
    - `ThemeProvider` envolvendo `{children}`.
    - Config: `attribute="class"`, `defaultTheme="dark"`, `enableSystem`, `disableTransitionOnChange`, `storageKey="calcont-theme"`.

### Theme toggle
- Componente:
  - `components/ui/theme-toggle.tsx` (novo).
  - Usa `Button` + `DropdownMenu` (shadcn) e `useTheme` (next-themes).
- Insercao:
  - `components/sections/navbar.tsx`
  - Toggle no cluster de acoes do topo ao lado do CTA principal.
- Conteudo editavel:
  - `content/landing.ts`:
    - `themeMenuLabel`
    - `themeOptionLight`
    - `themeOptionDark`
    - `themeOptionSystem`

### Tokens novos
- Arquivo:
  - `app/globals.css`
- Ajustes:
  - `:root` agora e tema light real.
  - `.dark` agora e tema dark real.
  - `--primary` migrado para azul corporativo.
  - `bg-hero-glow` e `bg-hero-vignette` recalibrados para funcionar em light e dark.

### Logo na navbar
- Conteudo editavel:
  - `content/branding.ts`:
    - `brandName`
    - `logoSrc`
    - `logoAlt`
- Implementacao:
  - `components/sections/navbar.tsx` com `next/image` e fallback deterministico em build-time.
- Decisao aplicada:
  - `logoSrc` padrao: `"/favicon.svg"` ate existir `public/brand/calcont-logo.png`.

## 5) Riscos de regressao e mitigacao

1. Hydration mismatch na troca de tema:
   - Mitigado com `suppressHydrationWarning` e estado `mounted` no toggle.
2. Contraste insuficiente em light mode:
   - Mitigado por tokens novos e revisao de overlays globais.
3. Overflow na navbar mobile com mais controles:
   - Mitigado com agrupamento de acoes em `flex` com gap curto.
4. Regressao de tracking GA4:
   - Mantido `trackEvent()` centralizado em `lib/analytics.ts`.
5. Quebra por campos vazios de conteudo:
   - Mantidos fallbacks no componente de navbar e em secoes existentes.

## 6) Checklist de execucao (Etapas 2 a 5)

## Etapa 2 - Infra de tema
- [x] Adicionar `next-themes`.
- [x] Criar `ThemeProvider`.
- [x] Integrar provider no `layout`.
- [x] Remover tema hardcoded do html.
- [x] Implementar toggle com opcoes `light`, `dark`, `system`.

## Etapa 3 - Tokens e superfice visual
- [x] Criar light mode real em `:root`.
- [x] Recalibrar `.dark` com paleta premium corporativa.
- [x] Alinhar `--primary` com azul da direcao visual.
- [x] Ajustar utilitarios de hero para dupla compatibilidade de tema.

## Etapa 4 - Navbar e branding
- [x] Inserir logo + texto no brand da navbar.
- [x] Manter CTA e navegacao existentes.
- [x] Garantir labels de tema editaveis via `content/landing.ts`.

## Etapa 5 - Documentacao e manutencao
- [x] Atualizar `CONTENT_GUIDE.md` com novos campos de navbar/tema.
- [x] Registrar auditoria e plano em `content/design-system-notes.md`.
- [ ] Validacao visual manual em mobile e desktop (proximo passo recomendado).
- [ ] Smoke de analytics em ambiente com `NEXT_PUBLIC_GA_ID` (proximo passo recomendado).

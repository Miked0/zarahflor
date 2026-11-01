---
version: alpha
name: Zarah Flor
description: Clínica de estética especialista em pele negra — editorial, inclusivo, premium.
colors:
  primary: "#2A1712"
  secondary: "#6E5E52"
  tertiary: "#C9944A"
  neutral: "#FAF7F2"
  surface: "#FFFFFF"
  accent-hibisco: "#A335AE"
  on-primary: "#FFFFFF"
  on-tertiary: "#2A1712"
  on-hibisco: "#FFFFFF"
typography:
  h1:
    fontFamily: "Archivo"
    fontSize: 3rem
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  h2:
    fontFamily: "Archivo"
    fontSize: 2rem
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "0.14em"
  body-md:
    fontFamily: "Geist"
    fontSize: 1rem
    lineHeight: 1.55
    letterSpacing: "0em"
  label-caps:
    fontFamily: "Geist"
    fontSize: 0.62rem
    fontWeight: 600
    letterSpacing: "0.08em"
  stat-num:
    fontFamily: "Archivo"
    fontSize: "2.4rem"
    fontWeight: 700
    lineHeight: 1.1
rounded:
  sm: 0.35rem
  md: 0.5rem
  lg: 0.75rem
  full: 9999px
spacing:
  xs: 0.5rem
  sm: 1rem
  md: 1.5rem
  lg: 2.5rem
  xl: 4rem
components:
  top-bar:
    backgroundColor: "{colors.accent-hibisco}"
    textColor: "{colors.on-hibisco}"
    padding: "0.45rem 1rem"
    rounded: "0"
  button-text:
    backgroundColor: "transparent"
    textColor: "{colors.tertiary}"
    rounded: "{rounded.sm}"
    padding: "0.6rem 1rem"
  button-text-hover:
    textColor: "#7A4630"
  cta-referral:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: "0.7rem 1.1rem"
  cta-referral-hover:
    backgroundColor: "#7A4630"
    textColor: "{colors.on-primary}"
  media-frame:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
  stat-num:
    typography: "{typography.stat-num}"
    textColor: "{colors.primary}"
  folio-item:
    backgroundColor: "{colors.secondary}"
    rounded: "{rounded.full}"
    size: "0.75rem"
  folio-item-current:
    backgroundColor: "{colors.tertiary}"
  referral-panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "1.5rem"
  chapter-1-ground:
    backgroundColor: "{colors.primary}"
    textColor: "#E8E0D4"
  chapter-2-peak:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
---

## Overview

Zarah Flor é uma clínica de estética em São Paulo especialista em pele negra. A identidade visual é editorial, inclusiva e premium — nunca silenciosa. A cor de acento ouro (#C9944A) carrega o luxo; o hibisco (#A335AE) carrega a inclusão; o cacau (#2A1712) é o chão de confiança. O visitante deve ver a própria pele refletida logo na capa, sem precisar explicar nada.

## Colors

- **Primary (#2A1712) — Cacau:** Texto principal, títulos de capítulo, chão do Capítulo 1. Transmite solidez e confiança clínica.
- **Secondary (#6E5E52) — Ink-soft:** Texto secundário, metadados, rótulos pequenos. Menor ênfase, nunca desaparecido.
- **Tertiary (#C9944A) — Ouro:** Único driver de interação de alta ênfase (CTAs, destaques). Nunca usado como texto sobre fundo claro — contraste abaixo de 4.5:1.
- **Neutral (#FAF7F2) — Canvas:** Fundo da página, áreas de descanso entre capítulos.
- **Surface (#FFFFFF):** Cards, quadros de mídia, folha de encaminhamento.
- **Accent-Hibisco (#A335AE):** Top bar inclusiva, card de destaque. Mensagem de acolhimento sempre visível.

## Typography

Archivo para display (títulos, estatísticas), Geist para corpo e rótulos. Hierarquia é construída por peso e tamanho, não por família. Letter-spacing apertado em display; tracking normal em corpo.

## Layout

Escala de espaçamento em rem, baseada em 4px: xs (0.5rem), sm (1rem), md (1.5rem), lg (2.5rem), xl (4rem). Cada capítulo tem seu próprio device (pin, pan, flow, reveal) — nunca média-grid genérica.

## Shapes

Bordas arredondadas modestas: sm (0.35rem) em elementos interativos, md (0.5rem) em cards, lg (0.75rem) em quadros de mídia e painéis. full (9999px) reservado para os pontos do folio.

## Components

- `top-bar` é a única faixa fixa — mensagem inclusiva, sempre acima de tudo.
- `button-text` é o CTA padrão: texto corrido, sem fundo sólido (não é "botão ilha").
- `cta-referral` é o único botão de fundo sólido, usado apenas na folha de encaminhamento.
- `media-frame` é o quadro com borda sutil para imagens de tratamento.
- `stat-num` exibe números reais (87,6K, 5,0) com destaque tipográfico.
- `chapter-1-ground` é o chão escuro do Capítulo 1 (tensão, mais quieto).
- `chapter-2-peak` é o fundo do pico visual (Kinetic lines + paralaxe).

## Do's and Don'ts

- **Do** usar token references (`{colors.primary}`) em vez de hex literal em componentes.
- **Do** manter o Capítulo 1 mais quieto que o Capítulo 2 (pico).
- **Do** usar CTA como texto corrido no fechamento — nunca botão ilha.
- **Don't** usar ouro (#C9944A) como cor de texto sobre fundo claro — falha WCAG 4.5:1.
- **Don't** introduzir cores fora da paleta — estender a paleta primeiro.
- **Don't** aninhar variantes de componente. `button-text-hover` é uma entrada irmã, não filha.

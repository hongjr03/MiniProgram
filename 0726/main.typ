#import "@preview/touying:0.4.2": *
#import "@preview/pinit:0.1.4": *
#import "@preview/fletcher:0.5.1" as fletcher: diagram, node, edge
#let main-font-cn = "Noto Serif SC"
#let code-font-cn = "Noto Sans SC"

#set text(
  font: ("IBM Plex Serif", main-font-cn),
  lang: "zh",
  region: "cn",
  size: 16pt,
)

#let cjk-markers = regex("[“”‘’．，。、？！：；（）｛｝［］〔〕〖〗《》〈〉「」【】『』─—＿·…\u{30FC}]+")
#show cjk-markers: set text(font: main-font-cn)
#show raw: it => {
  show cjk-markers: set text(font: code-font-cn)
  it
}

#import "@preview/touying:0.4.2": *

#let s = themes.dewdrop.register(
  aspect-ratio: "16-9",
  // footer: [Dewdrop],
  navigation: "mini-slides",
  // navigation: none,
)
#let s = (s.methods.info)(
  self: s,
  title: [进度汇报],
  subtitle: [移动软件开发],
  author: [洪佳荣],
  date: datetime(
    year: 2024,
    month: 8,
    day: 26,
  ),
  institution: [中国海洋大学],
)



#let (init, slides, touying-outline, alert, speaker-note) = utils.methods(s)
#show: init

#show strong: alert

#let (slide, empty-slide, title-slide, new-section-slide, focus-slide) = utils.slides(s)
#show: slides

// = 本周进度

// == Retinexformer: One-stage Retinex-based Transformer for Low-light Image Enhancement (ICCV 2023) & (NTIRE 2024 Challenge) & (ECCV 2024)


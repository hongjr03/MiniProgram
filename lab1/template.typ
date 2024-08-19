#import "@preview/numblex:0.1.1": numblex, circle_numbers

#let font = (main: "IBM Plex Sans", mono: "IBM Plex Mono", cjk: "Noto Sans SC")

// #set text(font: "Dream Han Sans SC")

#let to-string(content) = {
  if content.has("text") {
    content.text
  } else if content.has("children") {
    content.children.map(to-string).join("")
  } else if content.has("body") {
    to-string(content.body)
  } else if content == [ ] {
    " "
  }
}

#let problem_counter = counter("problem")
#let prob-solution_counter = counter("prob-solution")

#let prob_block(body) = {
  v(-0.5em)
  block(fill: rgb(250, 255, 250), width: 100%, inset: 8pt, radius: 4pt, stroke: rgb(31, 199, 31), body)
}

#let speci_block(title, body) = {

  if title == "" {
    // v(-0.5em)
  } else {

    heading(level: 4, numbering: none, title)
  }
  v(-0.5em)
  block(fill: rgb("#fcfdff"), width: 100%, inset: 8pt, radius: 4pt, stroke: rgb("#1f84c7"), body)
}

#let prob(text, body) = {
  if text == "" or text == [] { } else {
    set heading(numbering: none)
    heading(level: 4)[#text]
  }
  // v(0.5em)
  if body == [] or body == none or body == "" {
    v(0.5em)
  } else {
    prob_block(body)
  }
}

#let cprob(text, body) = {
  block[
    #v(0.5em)
    #{
      problem_counter.step()
      locate(loc => {
        let elms = query(selector(heading.where(level: 2)).before(loc), loc)
        let counter_num = str(problem_counter.at(loc).last())
        let counter_domain = ""
        if elms.len() > 0 {
          counter_domain = to-string(elms.at(-1).body) + "-"
        }
        let serial_label = label(counter_domain + "问题" + counter_num)
        set heading(numbering: none)
        [
          // #counter_num
          #heading(level: 4, supplement: "问题")[问题 #problem_counter.display()：#text #serial_label]
        ]
      })
      if body == [] {
        v(0.5em)
      } else {
        prob_block(body)
      }
    }]
}

#let cprobs(text, supplement, body) = {
  block[
    #v(0.5em)
    #{
      problem_counter.step()
      locate(loc => {
        let elms = query(selector(heading.where(level: 2)).before(loc), loc)
        let counter_num = str(problem_counter.at(loc).last())
        let counter_domain = ""
        if elms.len() > 0 {
          counter_domain = to-string(elms.at(-1).body) + "-"
        }
        let serial_label = label(counter_domain + "问题" + counter_num)
        set heading(numbering: none)
        [
          // #counter_num
          #heading(level: 4, supplement: "问题")[问题 #problem_counter.display()：#text #serial_label]
        ]
      })
      if body == [] {
        v(0.5em)
      } else {
        supplement
        prob_block(body)
      }
    }]
}

#let cqa(title, body) = {
  [
    #set heading(numbering: none)
    #prob-solution_counter.step()
    ==== 问题 #prob-solution_counter.display()：#title
  ]
  // v(0.5em)
  if body == [] {
    v(0.5em)
  } else {
    // speci_block([解决方式], body)
    speci_block("", body)
  }
}

// 实验结果
#let result(body) = {
  block(breakable: true)[#{
      if body == [] {
        v(0.5em)
      } else {
        locate(loc => {
          let elms = query(selector(heading.where(level: 2)).before(loc), loc)
          let counter_num = str(problem_counter.at(loc).last())
          let counter_domain = to-string(elms.at(-1).body)
          let label = label(counter_domain + "-实验结果" + counter_num)
          let title = [实验结果 #h(1fr) #text(weight: "regular")[|] #counter_domain #label]
          speci_block(title, body)
        })

      }
    }]
}

#let result_label(name, body) = {
  block(breakable: true)[#{
      if body == [] {
        v(0.5em)
      } else {
        let counter_domain = name
        let label = label("实验结果-" + counter_domain)
        let title = [#counter_domain #label]
        speci_block(title, body)
      }
    }]
}

// 实验过程
#let process3(body) = {
  block(breakable: true)[#{
      if body == [] {
        v(0.5em)
      } else {
        locate(loc => {
          let elms = query(selector(heading.where(level: 3)).before(loc), loc)
          let counter_num = str(problem_counter.at(loc).last())
          let counter_domain = to-string(elms.at(-1).body)
          let label = label(counter_domain + "-实验过程" + counter_num)
          let title = [实验过程 #h(1fr) #text(weight: "regular")[|] #counter_domain #label]
          speci_block(title, body)
        })

      }
    }]
}

#let process2(body) = {
  block(breakable: true)[#{
      if body == [] {
        v(0.5em)
      } else {
        locate(loc => {
          let elms = query(selector(heading.where(level: 2)).before(loc), loc)
          let counter_num = str(problem_counter.at(loc).last())
          let counter_domain = to-string(elms.at(-1).body)
          let label = label(counter_domain + "-实验过程" + counter_num)
          let title = [实验过程 #h(1fr) #text(weight: "regular")[|] #counter_domain #label]
          speci_block(title, body)
        })

      }
    }]
}

// Some math operators
#let prox = [#math.op("prox")]
#let proj = [#math.op("proj")]
#let argmin = [#math.arg] + [#math.min]

#let assignment_class(
  size: 10.5pt,
  title,
  author,
  course_id,
  professor_name,
  semester,
  due_time,
  id,
  lang: "zh",
  region: "cn",
  source_code_link,
  blog_link,
  body,
) = {

  set text(font: (font.main, font.cjk), size: size, lang: lang, region: region)

  set heading(numbering: numblex("一、", "1.", "(1)"))

  show heading.where(level: 1): it => {
    if (it.numbering != none) {
      block(counter(heading.where(level: 1)).display("一") + "、" + it.body)
    } else {
      it
    }
  }


  show heading: it => [
    #it
    #v(0.3em)
  ]

  // Very useful trick, special thanks to @AxiomOfChoices
  // https://github.com/typst/typst/issues/2953#issuecomment-1858823455
  show heading: current => locate(loc => {
    let elms = query(selector(heading).before(loc), loc) // Finds all previous headings, inclusive
    if elms.len() > 1 {
      // If there are at least 2
      let previous_heading = elms.at(-2) // Take the previous one
      if ( // If it is close enough to the current one
        previous_heading.location().position().y + 35pt > current.location().position().y
      ) {
        return [#v(-0.3em) #current]
      }
    }
    return current
  })



  set raw(tab-size: 4)
  show link: it => {
    set text(fill: blue)
    underline(it)
  }

  set list(indent: 6pt)
  set enum(indent: 6pt)
  set enum(numbering: numblex(numberings: ("1.", "a)", circle_numbers)), full: true)

  set bibliography(title: [参考], style: "ieee")

  set document(title: title, author: author)
  set page(
    paper: "a4",
    header: locate(loc => if (counter(page).at(loc).first() == 1) {
      none
    } else {
      [
        #h(1fr)
        *#author* | *#title*
      ]
    }),
    footer: locate(loc => {
      let page_number = counter(page).at(loc).first()
      let total_pages = counter(page).final(loc).last()
      align(center)[
        #set text(size: 8pt)
        #page_number / #total_pages
      ]
    }),
  )

  // Title and Header

  let make_header(name, width: 453.5pt, max: 17pt, step: 0.1pt) = {
    context {
      if max == none {
        max = text.size
      }
      let textsize = max
      let size = measure(align(left, text(textsize)[#name]))
      while size.width > width {
        textsize = textsize - step
        size = measure(align(left, text(textsize)[#name]))
      }
      return align(left, text(textsize)[#name])
    }
  }

  let left_text = [
    *#author* #id
  ]
  let comma = ","
  if lang == "zh" {
    comma = "，"
  }
  let right_text = [*#professor_name*] + [#comma*#semester* ] + [| *截止时间：*#due_time]

  if due_time == none or due_time == "" {
    right_text = [*#professor_name*] + [#comma*#semester* ]
  }

  let link_text = (
    if source_code_link != none and blog_link != none {
      [
        *源代码：*#link(source_code_link) \
        *博客：*#link(blog_link)
      ]
    }
  )


  line(length: 100%)
  make_header[*#course_id* | *#title*]
  left_text
  h(1fr)
  right_text
  linebreak()

  line(length: 100%)
    // linebreak()
  link_text

  linebreak()

  set raw(tab-size: 4)

  show raw: set text(font: (font.mono, font.cjk))
  // Display inline code in a small box
  // that retains the correct baseline.
  show raw.where(block: false): box.with(fill: luma(240), inset: (x: 3pt, y: 0pt), outset: (y: 3pt), radius: 2pt)

  let cjk-markers = regex("[“”‘’．，。、？！：；（）｛｝［］〔〕〖〗《》〈〉「」【】『』─—＿·…\u{30FC}]+")
  show cjk-markers: set text(font: font.cjk)
  show raw: it => {
    show cjk-markers: set text(font: font.cjk)
    it
  }

  // Display block code in a larger block
  // with more padding.
  // and with line numbers.
  // Thank you @Andrew15-5 for the idea and the code!
  // https://github.com/typst/typst/issues/344#issuecomment-2041231063
  let style-number(number) = text(gray)[#number]
  show raw.where(block: true): it => block(
    fill: luma(240),
    inset: 10pt,
    radius: 4pt,
    width: 100%,
  )[#grid(
      columns: (1em, 1fr),
      align: (right, left),
      column-gutter: 0.7em,
      row-gutter: 0.6em,
      ..it.lines.enumerate().map(((i, line)) => (style-number(i + 1), line)).flatten(),
    )]



  body
}
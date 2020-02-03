# Google HTML / CSS 规约指南

## 背景

本文档定义了 HTML 和 CSS 的格式和规约规则。它旨在改善协作，代码质量并支持基础架构。它适用于使用 HTML 和CSS 的原始工作文件，包括 GSS 文件。只要可以保持常规代码的质量，工具就可以自由地进行混淆，最小化和编译。

## 一般

### 一般样式规则

#### 协议

尽可能将 HTTPS 用于嵌入式资源。

除非图像不能通过 HTTPS 获得，否则请始终对图像和其他媒体文件，样式表和脚本使用 HTTPS(`http:`)。

```html
<!-- 不推荐：省略协议 -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>

<!-- 不推荐：使用 `HTTP` -->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>

<!-- 推荐 -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
```

```css
/* 不推荐：使用 HTTP */
@import 'http://fonts.googleapis.com/css?family=Open+Sans';

/* 推荐 */
@import 'https://fonts.googleapis.com/css?family=Open+Sans';
```

## 通用格式规则

### 缩颈

每次缩进2个空格。

不要使用制表符或将制表符和空格混合使用来缩进。

```html
<ul>
  <li>Fantastic
  <li>Great
</ul>
```

```css
.example {
  color: blue;
}
```

### 大小写

仅使用小写字母。

所有代码都必须小写：这适用于HTML元素名称，属性，属性值（除非 `text/CDATA`），CSS 选择器，属性和属性值（字符串除外）。

```html
<!-- 不推荐 -->
<A HREF="/">Home</A>

<!-- 推荐 -->
<img src="google.png" alt="Google">
```

```css
/* 不推荐 */
color: #E5E5E5;

/* 推荐 */
color: #e5e5e5;
```

### 行尾随空格

删除尾随空格。

尾部的空格是不必要的，并且会使差异变得复杂。

```html
<!-- Not recommended -->
<p>What?_

<!-- Recommended -->
<p>Yes please.
```

## 一般元原则

### 编码

使用 UTF-8 (无 BOM).

确保您的编辑器使用UTF-8作为字符编码，并且没有字节顺序标记。

通过指定HTML模板和文档中的编码`<meta charset="utf-8">`。不要指定样式表的编码，因为它们采用UTF-8。

（有关编码以及何时以及如何指定编码的更多信息，请参见 [处理HTML和CSS中的字符编码](https://www.w3.org/International/tutorials/tutorial-char-enc/)）

Specify the encoding in HTML templates and documents via <meta charset="utf-8">. Do not specify the encoding of style sheets as these assume UTF-8.

(More on encodings and when and how to specify them can be found in Handling character encodings in HTML and CSS.)

### 尽可能解释代码

尽可能解释代码。

使用注释来解释代码：它涵盖了什么，出于什么目的，为什么使用或首选各自的解决方案？

（此项目是可选的，因为它并不总是要求完全记录代码的现实期望。对于HTML和CSS代码，注释的必要性可能会有很大差异，并取决于项目的复杂性。）

### 行为项

用标记待办事项和动作项 `TODO`.

`TODO` 仅使用关键字突出显示待办事项，而不使用其他常见格式（如 `@@`）。

与格式一起在括号中添加联系人（用户名或邮件列表） `TODO(contact)`。

在冒号后附加操作项，如中所示 `TODO: 待办事情`。

```html
{# TODO(john.doe): 重新实现居中方法 #}
<center>Test</center>
```

```html
<!-- TODO: 移除可选项元素 -->
<ul>
  <li>Apples</li>
  <li>Oranges</li>
</ul>
```

## HTML

### HTML 规约

#### 文档类型

使用 HTML5

HTML5（HTML语法）是首选的所有HTML文档：<!DOCTYPE html>。

（建议使用 HTML，例如 text/html。不要使用 XHTML。XHTML application/xhtml+xml 既缺乏浏览器基础结构支持，并且也比 HTML 更少的优化。）

尽管 HTML 很好，但不要关闭空元素，例如：写 `<br>`，而不是 `<br/>`。

#### HTML 有效性

尽可能使用有效的HTML。

除非由于文件大小的其他无法达到的性能目标而无法使用，否则请使用有效的HTML代码。

使用 [W3C HTML验证程序之类的工具](https://validator.w3.org/nu/) 进行测试。

使用有效的HTML是可测量的基线质量属性，有助于了解技术要求和约束，并确保正确使用HTML。

```html
<!-- 不推荐 -->
<title>Test</title>
<article>This is only a test.

<!-- 推荐 -->
<!DOCTYPE html>
<meta charset="utf-8">
<title>Test</title>
<article>This is only a test.</article>
```

#### 语义化

根据目的使用 HTML。

使用元素（有时被错误地称为“标签”）为其创建内容。例如，使用`head`元素作为标题，使用`p`作为段落`a`作为锚点元素等。

出于可访问性，重用和代码效率的原因，根据其用途使用HTML至关重要。

```html
<!-- 不推荐 -->
<div onclick="goToRecommendations();">All recommendations</div>

<!-- 推荐 -->
<a href="recommendations/">All recommendations</a>
```

#### 多媒体后备

提供多媒体的替代内容。

对于通过的图像，视频，canvas 动画，确保提供其他访问权限。对于图像，这意味着使用有意义的替代文本（alt），以及对于视频和音频则是字幕（如果有）。

出于可访问性的原因，提供替代内容很重要：除了 `@alt` 盲人用户几乎没有线索可以告诉您图像的含义，而其他用户可能无法理解视频或音频内容的含义。

（对于其alt属性会引入冗余的图像，以及仅出于装饰目的而不能立即使用CSS的图像，请不要使用替代文字，如alt=""。）

```html
<!-- 不推荐 -->
<img src="spreadsheet.png">

<!-- 推荐 -->
<img src="spreadsheet.png" alt="Spreadsheet screenshot.">
```

#### 关注点分离

将结构从表现层和行为中分离。

严格将结构（标记），表示（样式）和行为（脚本）分开，并尝试将三者之间的相互作用保持在最低限度。

也就是说，确保文档和模板仅包含HTML和仅用于结构目的的HTML。将所有表示形式的内容移入样式表，并将所有行为形式的脚本移入脚本。

另外，通过从文档和模板中链接尽可能少的样式表和脚本，使联系区域尽可能小。

出于维护原因，将结构与表示与行为分开很重要。更改HTML文档和模板总是比更新样式表和脚本代价高。

<!-- Not recommended -->
<!DOCTYPE html>
<title>HTML sucks</title>
<link rel="stylesheet" href="base.css" media="screen">
<link rel="stylesheet" href="grid.css" media="screen">
<link rel="stylesheet" href="print.css" media="print">
<h1 style="font-size: 1em;">HTML sucks</h1>
<p>I’ve read about this on a few sites but now I’m sure:
  <u>HTML is stupid!!1</u>
<center>I can’t believe there’s no way to control the styling of
  my website without doing everything all over again!</center>
<!-- Recommended -->
<!DOCTYPE html>
<title>My first CSS-only redesign</title>
<link rel="stylesheet" href="default.css">
<h1>My first CSS-only redesign</h1>
<p>I’ve read about this on a few sites but today I’m actually
  doing it: separating concerns and avoiding anything in the HTML of
  my website that is presentational.
<p>It’s awesome!
3.1.6 Entity References
Do not use entity references.

There is no need to use entity references like &mdash;, &rdquo;, or &#x263a;, assuming the same encoding (UTF-8) is used for files and editors as well as among teams.

The only exceptions apply to characters with special meaning in HTML (like < and &) as well as control or “invisible” characters (like no-break spaces).

<!-- Not recommended -->
The currency symbol for the Euro is &ldquo;&eur;&rdquo;.
<!-- Recommended -->
The currency symbol for the Euro is “€”.
3.1.7 Optional Tags
Omit optional tags (optional).

For file size optimization and scannability purposes, consider omitting optional tags. The HTML5 specification defines what tags can be omitted.

(This approach may require a grace period to be established as a wider guideline as it’s significantly different from what web developers are typically taught. For consistency and simplicity reasons it’s best served omitting all optional tags, not just a selection.)

<!-- Not recommended -->
<!DOCTYPE html>
<html>
  <head>
    <title>Spending money, spending bytes</title>
  </head>
  <body>
    <p>Sic.</p>
  </body>
</html>
<!-- Recommended -->
<!DOCTYPE html>
<title>Saving money, saving bytes</title>
<p>Qed.
3.1.8 type Attributes
Omit type attributes for style sheets and scripts.

Do not use type attributes for style sheets (unless not using CSS) and scripts (unless not using JavaScript).

Specifying type attributes in these contexts is not necessary as HTML5 implies text/css and text/javascript as defaults. This can be safely done even for older browsers.

<!-- Not recommended -->
<link rel="stylesheet" href="https://www.google.com/css/maia.css"
    type="text/css">
<!-- Recommended -->
<link rel="stylesheet" href="https://www.google.com/css/maia.css">
<!-- Not recommended -->
<script src="https://www.google.com/js/gweb/analytics/autotrack.js"
    type="text/javascript"></script>
<!-- Recommended -->
<script src="https://www.google.com/js/gweb/analytics/autotrack.js"></script>
3.2 HTML Formatting Rules
3.2.1 General Formatting
Use a new line for every block, list, or table element, and indent every such child element.

Independent of the styling of an element (as CSS allows elements to assume a different role per display property), put every block, list, or table element on a new line.

Also, indent them if they are child elements of a block, list, or table element.

(If you run into issues around whitespace between list items it’s acceptable to put all li elements in one line. A linter is encouraged to throw a warning instead of an error.)

<blockquote>
  <p><em>Space</em>, the final frontier.</p>
</blockquote>
<ul>
  <li>Moe
  <li>Larry
  <li>Curly
</ul>
<table>
  <thead>
    <tr>
      <th scope="col">Income
      <th scope="col">Taxes
  <tbody>
    <tr>
      <td>$ 5.00
      <td>$ 4.50
</table>
3.2.2 HTML Line-Wrapping
Break long lines (optional).

While there is no column limit recommendation for HTML, you may consider wrapping long lines if it significantly improves readability.

When line-wrapping, each continuation line should be indented at least 4 additional spaces from the original line.

<md-progress-circular md-mode="indeterminate" class="md-accent"
    ng-show="ctrl.loading" md-diameter="35">
</md-progress-circular>
<md-progress-circular
    md-mode="indeterminate"
    class="md-accent"
    ng-show="ctrl.loading"
    md-diameter="35">
</md-progress-circular>
<md-progress-circular md-mode="indeterminate"
                      class="md-accent"
                      ng-show="ctrl.loading"
                      md-diameter="35">
</md-progress-circular>
3.2.3 HTML Quotation Marks
When quoting attributes values, use double quotation marks.

Use double ("") rather than single quotation marks ('') around attribute values.

<!-- Not recommended -->
<a class='maia-button maia-button-secondary'>Sign in</a>
<!-- Recommended -->
<a class="maia-button maia-button-secondary">Sign in</a>
4 CSS
4.1 CSS Style Rules
4.1.1 CSS Validity
Use valid CSS where possible.

Unless dealing with CSS validator bugs or requiring proprietary syntax, use valid CSS code.

Use tools such as the W3C CSS validator to test.

Using valid CSS is a measurable baseline quality attribute that allows to spot CSS code that may not have any effect and can be removed, and that ensures proper CSS usage.

4.1.2 ID and Class Naming
Use meaningful or generic ID and class names.

Instead of presentational or cryptic names, always use ID and class names that reflect the purpose of the element in question, or that are otherwise generic.

Names that are specific and reflect the purpose of the element should be preferred as these are most understandable and the least likely to change.

Generic names are simply a fallback for elements that have no particular or no meaning different from their siblings. They are typically needed as “helpers.”

Using functional or generic names reduces the probability of unnecessary document or template changes.

/* Not recommended: meaningless */
#yee-1901 {}

/* Not recommended: presentational */
.button-green {}
.clear {}
/* Recommended: specific */
#gallery {}
#login {}
.video {}

/* Recommended: generic */
.aux {}
.alt {}
4.1.3 ID and Class Name Style
Use ID and class names that are as short as possible but as long as necessary.

Try to convey what an ID or class is about while being as brief as possible.

Using ID and class names this way contributes to acceptable levels of understandability and code efficiency.

/* Not recommended */
#navigation {}
.atr {}
/* Recommended */
#nav {}
.author {}
4.1.4 Type Selectors
Avoid qualifying ID and class names with type selectors.

Unless necessary (for example with helper classes), do not use element names in conjunction with IDs or classes.

Avoiding unnecessary ancestor selectors is useful for performance reasons.

/* Not recommended */
ul#example {}
div.error {}
/* Recommended */
#example {}
.error {}
4.1.5 Shorthand Properties
Use shorthand properties where possible.

CSS offers a variety of shorthand properties (like font) that should be used whenever possible, even in cases where only one value is explicitly set.

Using shorthand properties is useful for code efficiency and understandability.

/* Not recommended */
border-top-style: none;
font-family: palatino, georgia, serif;
font-size: 100%;
line-height: 1.6;
padding-bottom: 2em;
padding-left: 1em;
padding-right: 1em;
padding-top: 0;
/* Recommended */
border-top: 0;
font: 100%/1.6 palatino, georgia, serif;
padding: 0 1em 2em;
4.1.6 0 and Units
Omit unit specification after “0” values, unless required.

Do not use units after 0 values unless they are required.

flex: 0px; /* This flex-basis component requires a unit. */
flex: 1 1 0px; /* Not ambiguous without the unit, but needed in IE11. */
margin: 0;
padding: 0;
4.1.7 Leading 0s
Omit leading “0”s in values.

Do not put 0s in front of values or lengths between -1 and 1.

font-size: .8em;
4.1.8 Hexadecimal Notation
Use 3 character hexadecimal notation where possible.

For color values that permit it, 3 character hexadecimal notation is shorter and more succinct.

/* Not recommended */
color: #eebbcc;
/* Recommended */
color: #ebc;
4.1.9 Prefixes
Prefix selectors with an application-specific prefix (optional).

In large projects as well as for code that gets embedded in other projects or on external sites use prefixes (as namespaces) for ID and class names. Use short, unique identifiers followed by a dash.

Using namespaces helps preventing naming conflicts and can make maintenance easier, for example in search and replace operations.

.adw-help {} /* AdWords */
#maia-note {} /* Maia */
4.1.10 ID and Class Name Delimiters
Separate words in ID and class names by a hyphen.

Do not concatenate words and abbreviations in selectors by any characters (including none at all) other than hyphens, in order to improve understanding and scannability.

/* Not recommended: does not separate the words “demo” and “image” */
.demoimage {}

/* Not recommended: uses underscore instead of hyphen */
.error_status {}
/* Recommended */
#video-id {}
.ads-sample {}
4.1.11 Hacks
Avoid user agent detection as well as CSS “hacks”—try a different approach first.

It’s tempting to address styling differences over user agent detection or special CSS filters, workarounds, and hacks. Both approaches should be considered last resort in order to achieve and maintain an efficient and manageable code base. Put another way, giving detection and hacks a free pass will hurt projects in the long run as projects tend to take the way of least resistance. That is, allowing and making it easy to use detection and hacks means using detection and hacks more frequently—and more frequently is too frequently.

4.2 CSS Formatting Rules
4.2.1 Declaration Order
Alphabetize declarations.

Put declarations in alphabetical order in order to achieve consistent code in a way that is easy to remember and maintain.

Ignore vendor-specific prefixes for sorting purposes. However, multiple vendor-specific prefixes for a certain CSS property should be kept sorted (e.g. -moz prefix comes before -webkit).

background: fuchsia;
border: 1px solid;
-moz-border-radius: 4px;
-webkit-border-radius: 4px;
border-radius: 4px;
color: black;
text-align: center;
text-indent: 2em;
4.2.2 Block Content Indentation
Indent all block content.

Indent all block content, that is rules within rules as well as declarations, so to reflect hierarchy and improve understanding.

@media screen, projection {

  html {
    background: #fff;
    color: #444;
  }

}
4.2.3 Declaration Stops
Use a semicolon after every declaration.

End every declaration with a semicolon for consistency and extensibility reasons.

/* Not recommended */
.test {
  display: block;
  height: 100px
}
/* Recommended */
.test {
  display: block;
  height: 100px;
}
4.2.4 Property Name Stops
Use a space after a property name’s colon.

Always use a single space between property and value (but no space between property and colon) for consistency reasons.

/* Not recommended */
h3 {
  font-weight:bold;
}
/* Recommended */
h3 {
  font-weight: bold;
}
4.2.5 Declaration Block Separation
Use a space between the last selector and the declaration block.

Always use a single space between the last selector and the opening brace that begins the declaration block.

The opening brace should be on the same line as the last selector in a given rule.

/* Not recommended: missing space */
#video{
  margin-top: 1em;
}

/* Not recommended: unnecessary line break */
#video
{
  margin-top: 1em;
}
/* Recommended */
#video {
  margin-top: 1em;
}
4.2.6 Selector and Declaration Separation
Separate selectors and declarations by new lines.

Always start a new line for each selector and declaration.

/* Not recommended */
a:focus, a:active {
  position: relative; top: 1px;
}
/* Recommended */
h1,
h2,
h3 {
  font-weight: normal;
  line-height: 1.2;
}
4.2.7 Rule Separation
Separate rules by new lines.

Always put a blank line (two line breaks) between rules.

html {
  background: #fff;
}

body {
  margin: auto;
  width: 50%;
}
4.2.8 CSS Quotation Marks
Use single ('') rather than double ("") quotation marks for attribute selectors and property values.

Do not use quotation marks in URI values (url()).

Exception: If you do need to use the @charset rule, use double quotation marks—single quotation marks are not permitted.

/* Not recommended */
@import url("https://www.google.com/css/maia.css");

html {
  font-family: "open sans", arial, sans-serif;
}
/* Recommended */
@import url(https://www.google.com/css/maia.css);

html {
  font-family: 'open sans', arial, sans-serif;
}
4.3 CSS Meta Rules
4.3.1 Section Comments
Group sections by a section comment (optional).

If possible, group style sheet sections together by using comments. Separate sections with new lines.

/* Header */

#adw-header {}

/* Footer */

#adw-footer {}

/* Gallery */

.adw-gallery {}
Parting Words
Be consistent.

If you’re editing code, take a few minutes to look at the code around you and determine its style. If they use spaces around all their arithmetic operators, you should too. If their comments have little boxes of hash marks around them, make your comments have little boxes of hash marks around them too.

The point of having style guidelines is to have a common vocabulary of coding so people can concentrate on what you’re saying rather than on how you’re saying it. We present global style rules here so people know the vocabulary, but local style is also important. If code you add to a file looks drastically different from the existing code around it, it throws readers out of their rhythm when they go to read it. Avoid this.

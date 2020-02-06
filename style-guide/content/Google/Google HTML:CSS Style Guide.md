# Google HTML / CSS 规约指南

- [Google HTML / CSS 规约指南](#google-html--css-%e8%a7%84%e7%ba%a6%e6%8c%87%e5%8d%97)
  - [背景](#%e8%83%8c%e6%99%af)
  - [一般](#%e4%b8%80%e8%88%ac)
    - [一般样式规则](#%e4%b8%80%e8%88%ac%e6%a0%b7%e5%bc%8f%e8%a7%84%e5%88%99)
      - [协议](#%e5%8d%8f%e8%ae%ae)
    - [通用格式规则](#%e9%80%9a%e7%94%a8%e6%a0%bc%e5%bc%8f%e8%a7%84%e5%88%99)
      - [缩进](#%e7%bc%a9%e8%bf%9b)
      - [大小写](#%e5%a4%a7%e5%b0%8f%e5%86%99)
      - [行尾随空格](#%e8%a1%8c%e5%b0%be%e9%9a%8f%e7%a9%ba%e6%a0%bc)
    - [一般元原则](#%e4%b8%80%e8%88%ac%e5%85%83%e5%8e%9f%e5%88%99)
      - [编码](#%e7%bc%96%e7%a0%81)
      - [注释](#%e6%b3%a8%e9%87%8a)
      - [行为项](#%e8%a1%8c%e4%b8%ba%e9%a1%b9)
  - [HTML](#html)
    - [HTML 规约](#html-%e8%a7%84%e7%ba%a6)
      - [文档类型](#%e6%96%87%e6%a1%a3%e7%b1%bb%e5%9e%8b)
      - [HTML 有效性](#html-%e6%9c%89%e6%95%88%e6%80%a7)
      - [语义化](#%e8%af%ad%e4%b9%89%e5%8c%96)
      - [多媒体后备](#%e5%a4%9a%e5%aa%92%e4%bd%93%e5%90%8e%e5%a4%87)
      - [关注点分离](#%e5%85%b3%e6%b3%a8%e7%82%b9%e5%88%86%e7%a6%bb)
      - [实体引用](#%e5%ae%9e%e4%bd%93%e5%bc%95%e7%94%a8)
      - [可选标签](#%e5%8f%af%e9%80%89%e6%a0%87%e7%ad%be)
      - [type 属性](#type-%e5%b1%9e%e6%80%a7)
    - [HTML 格式](#html-%e6%a0%bc%e5%bc%8f)
      - [通用格式](#%e9%80%9a%e7%94%a8%e6%a0%bc%e5%bc%8f)
      - [HTML 换行](#html-%e6%8d%a2%e8%a1%8c)
      - [HTML 引号](#html-%e5%bc%95%e5%8f%b7)
  - [CSS](#css)
    - [CSS 样式规则](#css-%e6%a0%b7%e5%bc%8f%e8%a7%84%e5%88%99)
      - [CSS 有效性](#css-%e6%9c%89%e6%95%88%e6%80%a7)
      - [ID 和 class 命名](#id-%e5%92%8c-class-%e5%91%bd%e5%90%8d)
      - [ID 和 class 命名规则](#id-%e5%92%8c-class-%e5%91%bd%e5%90%8d%e8%a7%84%e5%88%99)
      - [类型选择器](#%e7%b1%bb%e5%9e%8b%e9%80%89%e6%8b%a9%e5%99%a8)
      - [属性缩写](#%e5%b1%9e%e6%80%a7%e7%bc%a9%e5%86%99)
      - [0 和单位](#0-%e5%92%8c%e5%8d%95%e4%bd%8d)
      - [前导 0](#%e5%89%8d%e5%af%bc-0)
      - [十六进制表示法](#%e5%8d%81%e5%85%ad%e8%bf%9b%e5%88%b6%e8%a1%a8%e7%a4%ba%e6%b3%95)
      - [前缀](#%e5%89%8d%e7%bc%80)
      - [ID 和 class 界定符](#id-%e5%92%8c-class-%e7%95%8c%e5%ae%9a%e7%ac%a6)
      - [Hacks](#hacks)
    - [CSS 格式化规则](#css-%e6%a0%bc%e5%bc%8f%e5%8c%96%e8%a7%84%e5%88%99)
      - [声明顺序](#%e5%a3%b0%e6%98%8e%e9%a1%ba%e5%ba%8f)
      - [块内容缩进](#%e5%9d%97%e5%86%85%e5%ae%b9%e7%bc%a9%e8%bf%9b)
      - [声明停止](#%e5%a3%b0%e6%98%8e%e5%81%9c%e6%ad%a2)
      - [属性名停止](#%e5%b1%9e%e6%80%a7%e5%90%8d%e5%81%9c%e6%ad%a2)
      - [声明块分隔](#%e5%a3%b0%e6%98%8e%e5%9d%97%e5%88%86%e9%9a%94)
      - [选择器和声明分隔](#%e9%80%89%e6%8b%a9%e5%99%a8%e5%92%8c%e5%a3%b0%e6%98%8e%e5%88%86%e9%9a%94)
      - [规则分离](#%e8%a7%84%e5%88%99%e5%88%86%e7%a6%bb)
      - [CSS 引号](#css-%e5%bc%95%e5%8f%b7)
    - [CSS 元规则](#css-%e5%85%83%e8%a7%84%e5%88%99)
      - [块注释](#%e5%9d%97%e6%b3%a8%e9%87%8a)
  - [寄语](#%e5%af%84%e8%af%ad)
  - [原文](#%e5%8e%9f%e6%96%87)

## 背景

本文档定义了 HTML 和 CSS 的格式和样式规则。它的目标是提高协作、代码质量和支持基础设备。它适用于包括 GSS 文件在内的使用 HTML 和 CSS 的源文件。只要保持一致的代码质量，工具就可以自由地混淆、缩小和编译源代码。

## 一般

### 一般样式规则

#### 协议

嵌入式资源尽可能使用 HTTPS 协议。

除非图像不能通过 HTTPS 获得，否则请始终对图像和其他媒体文件，样式表和脚本使用 HTTPS(`http:`)。

```html
<!-- 不推荐：省略协议 -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>

<!-- 不推荐：使用 HTTP -->
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

### 通用格式规则

#### 缩进

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

#### 大小写

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

#### 行尾随空格

删除尾随空格。

尾部的空格是不必要的，并且会使差异变得复杂。

```html
<!-- 不推荐 -->
<p>What?_

<!-- 推荐 -->
<p>Yes please.
```

### 一般元原则

#### 编码

使用 UTF-8 (无 BOM).

确保您的编辑器使用UTF-8作为字符编码，并且没有字节顺序标记。

通过 HTML 模板和文档中的编码 `<meta charset="utf-8">` 指定。不要指定样式表的编码，因为它们采用 UTF-8。

（有关编码以及何时以及如何指定编码的更多信息，请参见 [处理HTML和CSS中的字符编码](https://www.w3.org/International/tutorials/tutorial-char-enc/)）

#### 注释

尽可能解释代码。

使用注释来解释代码：它涵盖了什么，出于什么目的，为什么使用或首选各自的解决方案？

（这个选项是可选的，因为总是要求完整的文档化代码是不现实的。对于HTML和CSS代码，可能会有很大的不同，这取决于项目的复杂性。）

#### 行为项

用 `TODO` 标记待办事项和动作项。

使用关键字 `TODO` 突出显示待办事项，而不使用其他常见格式（如 `@@`）。

在括号中添加联系人（用户名或邮件列表） `TODO(contact)`。

在冒号后附加操作项，如 `TODO: 待办事情`。

```html
{# TODO(john.doe): 重新实现居中方法 #}
<center>Test</center>
```

```html
<!-- TODO: 移除选项元素 -->
<ul>
  <li>Apples</li>
  <li>Oranges</li>
</ul>
```

## HTML

### HTML 规约

#### 文档类型

使用 HTML5

HTML5（HTML语法）是首选的所有HTML文档：`<!DOCTYPE html>。`

（建议使用 HTML，例如 `text/html`。不要使用 XHTML。XHTML, `application/xhtml+xml` 既缺乏浏览器基础结构支持，优化空间比 HTML 小。）

尽管编写 HTML 很好，但不要关闭空元素，例如：写 `<br>`，而不是 `<br/>`。

#### HTML 有效性

尽可能使用有效的HTML。

除非由于文件大小的其他无法达到的性能目标而无法使用，否则请使用有效的HTML代码。

使用 [W3C HTML验证程序](https://validator.w3.org/nu/) 之类的工具进行测试。

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

对于多媒体，如图像、视频等通过 `canvas` 生成的动画对象，一定要提供可选的访问方式。对于图像，这意味着使用有意义的替代文本(`alt`)，视频、音频则是显示相应的字幕（如果可用）。

出于可访问性，提供替代内容是很重要的：没有 `@alt` 盲人用户很难知道图像是关于什么的，其他用户可能也无法理解视频或音频内容是关于什么的。

（对于其`alt`属性会引入冗余的图像，以及仅出于装饰目的而不能立即使用CSS的图像，请不要使用替代文字，如`alt=""`。）

```html
<!-- 不推荐 -->
<img src="spreadsheet.png">

<!-- 推荐 -->
<img src="spreadsheet.png" alt="Spreadsheet screenshot.">
```

#### 关注点分离

将结构从表现层和行为中分离。

严格将结构（标记），表示（样式）和行为（脚本）分开，并尝试将三者之间的相互作用保持在最低限度。

也就是说，确保文档和模板仅包含 HTML 和仅用于结构目的的 HTML。将所有表示形式的内容移入样式表，并将所有行为形式的脚本移入脚本。

另外，通过从文档和模板中链接尽可能少的样式表和脚本，使联系区域尽可能小。

出于维护原因，将结构与表示与行为分开很重要。更改HTML文档和模板总是比更新样式表和脚本代价高。

```html
<!-- 不推荐 -->
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

<!-- 推荐 -->
<!DOCTYPE html>
<title>My first CSS-only redesign</title>
<link rel="stylesheet" href="default.css">
<h1>My first CSS-only redesign</h1>
<p>I’ve read about this on a few sites but today I’m actually
  doing it: separating concerns and avoiding anything in the HTML of
  my website that is presentational.
<p>It’s awesome!
```

#### 实体引用

不要使用实体引用。

假设文件，编辑器以及团队之间使用相同的编码（UTF-8），则无需使用诸如 `&mdash;` ，`&rdquo;` 或的 实体引用 `&#x263a;`。

唯一的例外适用于 HTML 中具有特殊含义的字符（如`<` 和`&`）以及控制或“不可见”字符（如不间断空格）。

```html
<!-- 不推荐 -->
The currency symbol for the Euro is &ldquo;&eur;&rdquo;.

<!-- 推荐 -->
The currency symbol for the Euro is “€”.
```

#### 可选标签

省略可选标签（可选）。

出于文件大小优化和可扫描性的目的，请考虑省略可选标签。在 HTML5 规范定义标签可以被省略什么。

（此方法可能需要将宽限期确定为更广泛的准则，因为它与 Web 开发人员通常所教的内容明显不同。出于一致性和简单性的考虑，最好省略所有可选标签，而不仅仅是选择。）

```html
<!-- 不推荐 -->
<!DOCTYPE html>
<html>
  <head>
    <title>Spending money, spending bytes</title>
  </head>
  <body>
    <p>Sic.</p>
  </body>
</html>

<!-- 推荐 -->
<!DOCTYPE html>
<title>Saving money, saving bytes</title>
<p>Qed.
```

#### type 属性

省略样式表和脚本的`type`属性。

不要将`type`属性用于样式表（除非不使用CSS）和脚本（除非不使用JavaScript）。

指定`type`为HTML5意味着在这些背景属性是没有必要的`text/css`，并`text/javascript`为默认值。即使对于较旧的浏览器，也可以安全地完成此操作。

```html
<!-- 不推荐 -->
<link rel="stylesheet" href="https://www.google.com/css/maia.css"
    type="text/css">

<!-- 推荐 -->
<link rel="stylesheet" href="https://www.google.com/css/maia.css">

<!-- 不推荐 -->
<script src="https://www.google.com/js/gweb/analytics/autotrack.js"
    type="text/javascript"></script>

<!-- 推荐 -->
<script src="https://www.google.com/js/gweb/analytics/autotrack.js"></script>
```

### HTML 格式

#### 通用格式

对每个块，列表或表元素使用换行符，并对每个此类子元素缩进。

与元素的样式无关（因为CSS允许每个 `display` 属性承担不同的角色），将每个块，列表或表元素放在新行上。

缩进列表或代码块的子元素。

（如果遇到列表项之间的空格周围的问题，可以将所有 `li` 元素放在一行。通常代码检查器鼓励发出警告而不是错误。）

```html
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
```

#### HTML 换行

中断长行（可选）。

尽管没有针对 HTML 的列限制建议，但是如果可以大大提高可读性，则可以考虑使用长行换行。

换行时，每条连续行应与原始行至少缩进 4 个空格。

```html
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
```

#### HTML 引号

引用属性值时，请使用双引号。

在属性值周围使用双引号（`""`）而不是单引号（`''`）。

```html
<!-- 不推荐 -->
<a class='maia-button maia-button-secondary'>Sign in</a>

<!-- 推荐 -->
<a class="maia-button maia-button-secondary">Sign in</a>
```

## CSS

### CSS 样式规则

#### CSS 有效性

尽可能使用有效的 CSS。

除非处理 CSS 验证程序错误或需要专有语法，否则请使用有效的CSS代码。

使用 [W3C CSS验证器](https://jigsaw.w3.org/css-validator/) 之类的工具进行测试。

使用有效的 CSS 是可测量的基线质量属性，可能发现无效的 CSS 代码并可以将其删除，并确保正确使用 CSS。

#### ID 和 class 命名

使用有意义的或通用的 ID 和 class。

始终使用 ID 和 class 代替反映性或含糊不清的名称，这些 ID 和 class 应反映所讨论元素的用途，或者是通用名称。

最好使用能反映元素目的的特定名称，因为这些名称最容易理解，更改的可能性最小。

通用名称只是与它们的同辈元素没有特殊或没有意义的名称，通常需要它们作为“帮助者”。

使用功能名称或通用名称可以减少不必要的文档或模板更改的可能性。

```css
/* 不推荐：无意义 */
#yee-1901 {}

/* 不推荐：表面的 */
.button-green {}
.clear {}

/* 推荐：具体的 */
#gallery {}
#login {}
.video {}

/* 推荐：归类 */
.aux {}
.alt {}
```

#### ID 和 class 命名规则

使用尽可能短但必要的 ID 和 class 名称。

尽量简短地传达 ID 或 class 的含义。

以这种方式使用 ID 和 class 名称有助于提高可接受的可理解性和代码效率。

```css
/* 不推荐 */
#navigation {}
.atr {}

/* 推荐 */
#nav {}
.author {}
```

#### 类型选择器

避免使用类型选择器来限定 ID 和 class。

除非有必要（例如，使用帮助器类），否则请勿将元素名称与 ID 或 class 一起使用。

出于[性能原因](http://www.stevesouders.com/blog/2009/06/18/simplifying-css-selectors/)，避免使用不必要的祖先选择器很有用。

```css
/* 不推荐 */
ul#example {}
div.error {}

/* 推荐 */
#example {}
.error {}
```

#### 属性缩写

尽可能使用属性缩写。

CSS提供了各种属性缩写（如`font`），即使在仅显式设置一个值的情况下，也应尽可能使用它们。

使用速记属性对于代码效率和易理解性很有用。

```css
/* 不推荐 */
border-top-style: none;
font-family: palatino, georgia, serif;
font-size: 100%;
line-height: 1.6;
padding-bottom: 2em;
padding-left: 1em;
padding-right: 1em;
padding-top: 0;

/* 推荐 */
border-top: 0;
font: 100%/1.6 palatino, georgia, serif;
padding: 0 1em 2em;
```

#### 0 和单位

除非需要，否则在`0`数值之后省略单位规格。

除非需要，否则请勿在`0`数值后使用单位。

```css
flex: 0px; /* flex-basis 组件需要单位 */
flex: 1 1 0px; /* 在没有单位的情况下不是很明确，但是在 IE11 中是必须的 */
margin: 0;
padding: 0;
```

#### 前导 0

省略数值的前导`0`。

不要将`0`放在`-1`和`1`之间的值或长度前面。

```css
font-size: .8em;
```

#### 十六进制表示法

尽可能使用3个字符的十六进制表示法。

对于允许的颜色值，3个字符的十六进制表示法更短，更简洁。

```css
/* 不推荐 */
color: #eebbcc;

/* 推荐 */
color: #ebc;
```

#### 前缀

具有应用程序特定前缀的前缀选择器（可选）。

在大型项目以及嵌入到其他项目或外部站点中的代码中，请使用前缀（作为名称空间）作为 ID 和 class。使用简短的唯一标识符，后接破折号。

使用名称空间有助于防止命名冲突，并可以简化维护，例如在搜索和替换操作中。

```css
.adw-help {} /* AdWords */
#maia-note {} /* Maia */
```

#### ID 和 class 界定符

ID 和 class 中的单词用连字符分隔。

不要将选择器中的单词和缩写用连字符以外的任何字符（包括连字符）连接起来，以提高理解和可扫描性。

```css
/* 不推荐：没有分隔单词“demo” 和 “image” */
.demoimage {}

/* 不推荐：使用下划线而不是连字符 */
.error_status {}

/* 推荐 */
#video-id {}
.ads-sample {}
```

#### Hacks

避免用户代理检测和 CSS hacks 首先尝试其他方法去实现。

试图解决用户代理检测或特殊CSS过滤器，变通办法和 hacks 的样式差异是很诱人的。两种方法都应被视为万不得已，以实现并维护有效且可管理的代码库。换句话说，如果项目倾向于采取阻力最小的方式，从长远来看对检测用户代理和 hacks 手段损害项目。就是说，允许并简单的使用检测用户代理和 hacks 手段意味着以后将更频繁地使用它们。

### CSS 格式化规则

#### 声明顺序

按字母顺序排列声明。

以字母顺序放置声明，以易于记忆和维护的方式获得一致的代码。

忽略供应商特定的前缀以进行排序。但是，应将特定CSS属性的多个特定于供应商的前缀排序（例如-moz前缀位于-webkit之前）。

```css
background: fuchsia;
border: 1px solid;
-moz-border-radius: 4px;
-webkit-border-radius: 4px;
border-radius: 4px;
color: black;
text-align: center;
text-indent: 2em;
```

#### 块内容缩进

缩进所有块内容。

缩进所有块内容，即缩进规则中的规则和声明，以反映层次结构并增进理解。

```css
@media screen, projection {

  html {
    background: #fff;
    color: #444;
  }

}
```

#### 声明停止

每次声明后都使用分号。

出于一致性和可扩展性的原因，请以分号结尾每个声明。

```css
/* 不推荐 */
.test {
  display: block;
  height: 100px
}

/* 推荐 */
.test {
  display: block;
  height: 100px;
}
```

#### 属性名停止

在属性名称的冒号后面使用空格。

出于一致性原因，请始终在属性和值之间使用单个空格（但在属性和冒号之间不要使用空格）。

```css
/* 不推荐 */
h3 {
  font-weight:bold;
}

/* 推荐 */
h3 {
  font-weight: bold;
}
```

#### 声明块分隔

在最后一个选择器和声明块之间使用空格。

在最后一个选择器和[声明块](https://www.w3.org/TR/CSS21/syndata.html#rule-sets)开头的开括号之间始终使用单个空格。

左括号应与给定规则中的最后一个选择器在同一行上。

```css
/* 不推荐：缺少空格 */
#video{
  margin-top: 1em;
}

/* 不推荐：不必要的换行 */
#video
{
  margin-top: 1em;
}

/* 推荐 */
#video {
  margin-top: 1em;
}
```

#### 选择器和声明分隔

用新行将选择器和声明分开。

始终为每个选择器和声明开始新行。

```css
/* 不推荐 */
a:focus, a:active {
  position: relative; top: 1px;
}

/* 推荐 */
h1,
h2,
h3 {
  font-weight: normal;
  line-height: 1.2;
}
```

#### 规则分离

用新行分隔规则。

始终在规则之间放置空白行（两个换行符）。

```css
html {
  background: #fff;
}

body {
  margin: auto;
  width: 50%;
}
```

#### CSS 引号

对于属性选择器和属性值，请使用单引号（`''`）而不是双引号（`""`）。

请勿在URI值（`url()`）中使用引号。

例外：如果确实需要使用`@charset`规则，请使用双引号，不允许使用单引号。

```css
/* 不推荐 */
@import url("https://www.google.com/css/maia.css");

html {
  font-family: "open sans", arial, sans-serif;
}

/* 推荐 */
@import url(https://www.google.com/css/maia.css);

html {
  font-family: 'open sans', arial, sans-serif;
}
```

### CSS 元规则

#### 块注释

通过块注释对块进行分组（可选）。

如果可能，请通过使用注释将样式表的各个部分组合在一起。用新行分隔各部分。

```css
/* Header */

#adw-header {}

/* Footer */

#adw-footer {}

/* Gallery */

.adw-gallery {}
```

## 寄语

始终如一。

如果要编辑代码，请花几分钟时间查看您周围的代码并确定其样式。如果他们在所有算术运算符周围使用空格，您也应该这样做。如果他们的注释周围有小方框，则使您的注释周围也有小方框。

制定样式指南的目的是拥有通用的编码词汇，以便人们可以专注于您在说的而不是在怎么说。我们在这里介绍全局样式规则，以便人们了解词汇表，但是局部样式也很重要。如果您添加到文件中的代码看上去与周围的现有代码完全不同，则当读者阅读文件时，它会使读者失去节奏。避免这种情况。

## 原文

[https://google.github.io/styleguide/htmlcssguide.html](https://google.github.io/styleguide/htmlcssguide.html)

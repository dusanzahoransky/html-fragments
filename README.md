# HTML fragments

HTML fragments is simple static site generator which allows writing reusable HTML files, which can be included in other HTML files. The includes are recursively resolved.

Set recursive = true, to process the input directory recursively.  

## Usage

consider **example files**:

`site/src:`
```
├── index.html
├── partial
│   ├── navbar.html
```

index.html:
```
<header>
    <include src="partial/navbar.html" />
</header>
```

navbar.html:
```
 <nav>...</nav>
```

running the script **results in**:

`site/out:`
```
├── index.html
```

index.html:
```
<header>
    <nav>...</nav>
</header>
```

### npm script

```
  "scripts": {
    "build": "fragments site/src site/out",
  },
```

### programmatically

```
import {HtmlFragments} from "./HtmlFragments";

new HtmlFragments().processDir('site/src', 'site/out')
```


# HTML fragments

HTML fragments is simple static site generator which allows writing reusable HTML files, which can be included in other HTML files. The includes are recursively resolved.

Set recursive = true, to process the input directory recursively.  

## Usage

```processDir(inDir: string, outDir: string, recursive: boolean = false)```

### for example 
```
processDir("site/src", "site/out")
```

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

### results in

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


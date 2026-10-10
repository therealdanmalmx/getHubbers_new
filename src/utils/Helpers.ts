export const langugaesWithNoLogo: any[] = [
  "actionscript",
  "shaderlab",
  "jinja",
  "hcl",
  "openscad",
  "nix",
  "renderscript",
  "scss",
  "ejs",
  "supercollider",
  "mdx",
  "d",
  "dtrace",
  "batchfile",
  "starlark",
  "nsis",
  "assembly",
  "pike",
  "moonscript",
  "shell",
  "jsonnet",
  "makefile",
  "cue",
  "smarty",
  "gdscript",
  "gherkin",
  "meson",
  "verilog",
  "isabelle",
  "agda",
  "plpgsql",
  "cuda",
  "nunjucks",
  "protocol buffer",
  "mustache",
  "systemverilog",
  "typst",
  "blade",
  "nushell",
  "just",
  "reason",
  "autohotkey",
  "qml",
  "nwscript",
  "rpgle",
  "vcl",
  "angelscript",
  "nemerle",
  "antlr",
  "nesc",
  "odin",
  "dm",
  "nimrod",
  "bru",
  "pascal",
  "brainfuck",
  "al",
  "purebasic",
  "glsl",
  "g-code",
  "pddl",
  "monkey c",
  "xslt",
  "grammatical framework",
  "j",
  "hlsl",
  "rich text format",
  "q",
  "scheme",
  "kakounescript",
  "slint",
  "hack",
];

export const switchLanguage = (language: any) => {
  switch (language) {
    case "css":
      language = "css3";
      break;
    case "scss":
    case "sass":
      language = "sass";
      break;
    case "c#":
      language = "csharp";
      break;
    case "c++":
      language = "cplusplus";
      break;
    case "vue":
      language = "vuejs";
      break;
    case "html":
      language = "html5";
      break;
    case "objective-c":
      language = "objectivec";
      break;
    case "jupyter notebook":
      language = "jupyter";
      break;
    case "powershell":
      language = "powershell";
      break;
    case "f#":
      language = "fsharp";
      break;
    case "dockerfile":
      language = "docker";
      break;
    case "vba":
      language = "visualbasic";
      break;
    case "vim script":
    case "vim snippet":
    case "viml":
      language = "vim";
      break;
    case "tsql":
    case "plpgsql":
      language = "azuresqldatabase";
      break;
    case "asp":
    case "visual basic .net":
      language = "dot-net";
      break;
    case "gdshader":
    case "godot":
      language = "godot";
      break;
    case "perl 6":
      language = "perl";
      break;
    default:
      break;
  }

  return language;
};

export const getLanguageName = (language: string) => {
  const name: Record<string, string> = {
    javascript: "JavaScript",
    "c++": "C++",
    php: "PHP",
    html: "HTML",
    python: "Python",
    "vim script": "Vim",
    "c#": "C#",
    c: "C",
    powershell: "Powershell",
    ruby: "Ruby",
    "emacs lisp": "Emacs Lisp",
    haskell: "Haskell",
    java: "Java",
    processing: "Processing",
    godot: "Godot",
    gdshader: "Godot",
    go: "Go",
    llvm: "LLVM",
    rust: "Rust",
    cmake: "CMake",
    typescript: "TypeScript",
    swift: "Swift",
    "objective-c": "Objective-C",
    css: "CSS",
    perl: "Perl",
    groovy: "Groovy",
    docker: "Docker",
    dockerfile: "Docker",
    "jupyter notebook": "Jupyter Notebook",
    kotlin: "Kotlin",
    dart: "Dart",
    r: "R",
    "perl 6": "Perl",
    julia: "Julia",
    ocaml: "OCaml",
    clojure: "Clojure",
    scala: "Scala",
    lua: "Lua",
    coffeescript: "CoffeeScript",
    elixir: "Elixir",
    zig: "Zig",
    fortran: "Fortran",
    tex: "Tex",
    svelte: "Svelte",
    vue: "Vue",
    react: "React",
    angular: "Angular",
    astro: "Astro",
    nim: "Nim",
    matlab: "MATLAB",
    apex: "Apex",
    handlebars: "Handlebars",
  };
  return name[language];
};

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
    "nemerle"
  ];

export const switchLanguage = (language: any) => {
    switch (language) {
    case "css":
        language = "css3"
        break;
    case "c#":
        language = "csharp"
        break;
    case "c++":
        language = "cplusplus"
        break;
    case "vue":
        language = "vuejs"
        break;
    case "html":
        language = "html5"
        break;
    case "objective-c":
        language = "objectivec"
        break;
    case "jupyter notebook":
        language = "jupyter"
        break;
    case "powershell":
        language = "powershell"
        break;
    case "f#":
        language = "fsharp"
        break;
    case "dockerfile":
        language = "docker"
        break;
    case "vba":
        language = "visualbasic"
        break;
    case "vim script":
    case "vim snippet":
    case "viml":
        language = "vim"
        break;
    case "tsql":
    case "plpgsql":
        language = "azuresqldatabase"
    break;
    case "asp":
    case "visual basic .net":
        language = "dot-net"
    break;
    default:
        break;
    }

    return language
}

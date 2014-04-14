// NOTE: I added the .js extension to this gist so it would have syntax highlighting. This file should have NO file extension

{
    // Settings
    "passfail"      : false,  // Stop on first error.
    "maxerr"        : 200,    // Maximum error before stopping.

    // Predefined globals whom JSHint will ignore.
    "browser"       : true,   // Standard browser globals e.g. `window`, `document`.
    "jquery"        : true,
    "node"          : true,
    "debug"         : false,  // Allow debugger statements e.g. browser breakpoints.
    "devel"         : true,   // Allow developments statements e.g. `console.log();`.
    // ECMAScript 5.
    // "es5"           : true,   // Allow ECMAScript 5 syntax.
    "strict"        : true,  // Require `use strict` pragma  in every file.
    "globalstrict"  : true,  // Allow global "use strict" (also enables 'strict').

    // "predef": [
    //   "TableUtil"
    // ],

    // The Good Parts.
    "asi"           : false,  // Tolerate Automatic Semicolon Insertion (no semicolons).
    "laxbreak"      : false,   // Tolerate unsafe line breaks e.g. `return [\n] x` without semicolons.
    "bitwise"       : false,   // Prohibit bitwise operators (&, |, ^, etc.).
    "boss"          : false,  // Tolerate assignments inside if, for & while. Usually conditions & loops are for comparison, not assignments.
    "curly"         : true,   // Require {} for every new block or scope.
    "eqeqeq"        : false,   // Require triple equals i.e. `===`.
    "eqnull"        : true,  // Tolerate use of `== null`.
    "evil"          : false,  // Tolerate use of `eval`.
    "expr"          : false,  // Tolerate `ExpressionStatement` as Programs.
    "forin"         : true,  // Tolerate `for in` loops without `hasOwnPrototype`.
    "immed"         : false,   // Require immediate invocations to be wrapped in parens e.g. `( function(){}() );`
    "latedef"       : true,   // Prohipit variable use before definition.
    "loopfunc"      : false,  // Allow functions to be defined within loops.
    "noarg"         : true,   // Prohibit use of `arguments.caller` and `arguments.callee`.
    "regexp"        : true,   // Prohibit `.` and `[^...]` in regular expressions.
    "regexdash"     : false,  // Tolerate unescaped last dash i.e. `[-...]`.
    "scripturl"     : true,   // Tolerate script-targeted URLs.
    "shadow"        : true,  // Allows re-define variables later in code e.g. `var x=1; x=2;`.
    "supernew"      : false,  // Tolerate `new function () { ... };` and `new Object;`.
    "undef"         : true,   // Require all non-global variables be declared before they are used.


    // Personal styling preferences.
    "newcap"        : true,   // Require capitalization of all constructor functions e.g. `new F()`.
    "noempty"       : true,   // Prohibit use of empty blocks.
    "nonew"         : true,   // Prohibit use of constructors for side-effects.
    "nomen"         : false,   // Prohibit use of initial or trailing underbars in names.
    "onevar"        : false,  // Allow only one `var` statement per function.
    "plusplus"      : false,  // Prohibit use of `++` & `--`.
    "sub"           : true,  // Tolerate all forms of subscript notation besides dot notation e.g. `dict['key']` instead of `dict.key`.
    "trailing"      : true,   // Prohibit trailing whitespaces.
    "white"         : false,  // Check against strict whitespace and indentation rules.
    "indent"        : 2       // Specify indentation spacing
}
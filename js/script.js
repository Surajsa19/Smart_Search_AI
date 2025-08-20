const searchTerms = [
    "JavaScript", "Python", "Java", "C++", "C#", "Ruby", "Go", "Swift", "Kotlin", "TypeScript",
    "PHP", "HTML", "CSS", "SQL", "Perl", "Rust", "Scala", "Haskell", "Lua", "Dart", "Elixir",
    "Clojure", "Groovy", "R", "Assembly", "Objective-C", "Visual Basic", "MATLAB", "PowerShell",
    "F#", "Lisp", "Fortran", "COBOL", "Ada", "Pascal", "Delphi", "Prolog", "Scheme", "Erlang",
    "OCaml", "Racket", "Julia", "Nim", "Crystal", "Reason", "Elm", "PureScript", "Idris",
    "ActionScript", "CoffeeScript", "D", "Dylan", "Eiffel", "Forth", "Factor", "J", "K",
    "LabVIEW", "Logo", "ML", "Modula-2", "Oberon", "PL/I", "REXX", "S", "SAS", "Tcl",
    "VHDL", "Verilog", "Smalltalk", "Apex", "ABAP", "AWK", "Bash", "BCPL", "Ceylon", "Chapel",
    "CLU", "Component Pascal", "Common Lisp", "Curl", "Euphoria", "Gambas", "Gosu", "Hack",
    "Icon", "Io", "JScript", "JScript.NET", "Lasso", "LiveScript", "MUMPS", "NXT-G",
    "OpenEdge ABL", "Oz", "Pike", "PostScript", "Q", "RPG", "S-Lang", "Simula", "SPARK",
    "Standard ML", "Vala", "X++", "X10", "XQuery", "Z shell", "Algol", "APL", "AutoLISP",
    "Ballerina", "BC", "Boo", "Bourne shell", "C Shell", "Clarion", "Clean", "Cobra",
    "ColdFusion", "COMAL", "Cool", "CorVision", "CowScript", "DataFlex", "dBase", "DiBOL",
    "EGL", "EXEC", "Fantom", "Flow-matic", "FOCAL", "Focus", "Genie", "GML", "ICI", "Inform",
    "JASS", "Jovial", "Ladder Logic", "Limbo", "Lingo", "LotusScript", "Maple", "Max",
    "Mercury", "Mirah", "Miva Script", "ML/I", "Mesa", "Nemerle", "NetLogo", "Nial", "OPL",
    "Oxygene", "ParaSail", "PILOT", "POP-11", "Progress 4GL", "ProvideX", "Ratfor", "Sather",
    "SETL", "SIGNAL", "Slate", "SPITBOL", "Squeak", "SR", "SuperCollider", "Turing", "Ubercode",
    "Uniface", "UNITY", "Vala", "VBScript", "Whitespace", "XPL", "Yorick", "ZPL"
];

class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let currentNode = this.root;
        for (const char of word) {
            if (!currentNode.children[char]) {
                currentNode.children[char] = new TrieNode();
            }
            currentNode = currentNode.children[char];
        }
        currentNode.isEndOfWord = true;
    }

    findWordsWithPrefix(prefix) {
        let currentNode = this.root;
        for (const char of prefix) {
            if (!currentNode.children[char]) {
                return [];
            }
            currentNode = currentNode.children[char];
        }
        return this._collectAllWords(currentNode, prefix);
    }

    _collectAllWords(node, currentPrefix) {
        let words = [];
        if (node.isEndOfWord) {
            words.push(currentPrefix);
        }
        for (const char in node.children) {
            words.push(...this._collectAllWords(node.children[char], currentPrefix + char));
        }
        return words;
    }
}

function levenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));

    for (let i = 0; i <= a.length; i++) {
        matrix[0][i] = i;
    }
    for (let j = 0; j <= b.length; j++) {
        matrix[j][0] = j;
    }

    for (let j = 1; j <= b.length; j++) {
        for (let i = 1; i <= a.length; i++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            matrix[j][i] = Math.min(
                matrix[j][i - 1] + 1,
                matrix[j - 1][i] + 1,
                matrix[j - 1][i - 1] + cost
            );
        }
    }

    return matrix[b.length][a.length];
}

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const suggestionsContainer = document.getElementById('suggestions');
    const searchCombobox = document.getElementById('search-combobox');
    let debounceTimer;

    const trie = new Trie();
    searchTerms.forEach(term => trie.insert(term.toLowerCase()));

    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const query = e.target.value.toLowerCase().trim();
            if (query.length > 0) {
                const prefixSuggestions = trie.findWordsWithPrefix(query);
                
                const fuzzySuggestions = searchTerms.filter(term => 
                    levenshteinDistance(query, term.toLowerCase()) <= 2
                );

                const allSuggestions = [...new Set([...prefixSuggestions, ...fuzzySuggestions.map(t => t.toLowerCase())])];
                
                allSuggestions.sort((a, b) => {
                    const aIsPrefix = a.startsWith(query);
                    const bIsPrefix = b.startsWith(query);
                    if (aIsPrefix && !bIsPrefix) return -1;
                    if (!aIsPrefix && bIsPrefix) return 1;
                    return a.localeCompare(b);
                });

                displaySuggestions(allSuggestions.slice(0, 10), query);
            } else {
                hideSuggestions();
            }
        }, 300);
    });

    function displaySuggestions(suggestions, query) {
        if (suggestions.length === 0) {
            hideSuggestions();
            return;
        }
        
        suggestionsContainer.innerHTML = '';
        suggestions.forEach(suggestion => {
            const originalCasing = searchTerms.find(term => term.toLowerCase() === suggestion) || suggestion;
            const li = document.createElement('li');
            li.className = 'px-4 py-2 cursor-pointer hover:bg-gray-200 transition duration-150';
            li.setAttribute('role', 'option');
            
            const regex = new RegExp(`(${query})`, 'gi');
            li.innerHTML = originalCasing.replace(regex, `<strong class="font-bold text-blue-600">$1</strong>`);

            li.addEventListener('click', () => {
                searchInput.value = originalCasing;
                hideSuggestions();
            });
            suggestionsContainer.appendChild(li);
        });

        suggestionsContainer.classList.remove('hidden');
        searchCombobox.setAttribute('aria-expanded', 'true');
    }

    function hideSuggestions() {
        suggestionsContainer.classList.add('hidden');
        searchCombobox.setAttribute('aria-expanded', 'false');
    }

    document.addEventListener('click', (e) => {
        if (!searchCombobox.contains(e.target)) {
            hideSuggestions();
        }
    });
});

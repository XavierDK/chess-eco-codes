const fs = require('fs'),
    path = require('path'),
    Chess = require('chess.js').Chess,
    inputFiles = ["./eco/a.tsv",
                    "./eco/b.tsv",
                    "./eco/c.tsv",
                    "./eco/d.tsv",
                    "./eco/e.tsv"
]

let codes = {}
inputFiles.forEach ((file) => {
    let input = fs.readFileSync(file, "utf-8")
    let inputLines = input.split("\n");
    inputLines.forEach((line)=>{
        let values = line.split("\t")

        if (values.length != 4 || values[0]==="eco") {
            return
        }
        const eco = values[0],
            name = values[1],
            moves = values[3],
            chess = new Chess()
        chess.load_pgn(moves,{sloppy:true})
        let opening = {}
        opening.code = eco
        opening.name = name
        codes[chess.fen()] = opening
    })
})

fs.writeFileSync(path.join(__dirname, 'codes.json'), JSON.stringify(codes))
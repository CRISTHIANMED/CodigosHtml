const curso = require('./curso.json');
console.log(curso.temas);

let infoCurso = {
    "titulo": "Curso de Node.js",
    "numVistas": 45642,
    "numLikes": 21123,
    "temas":
        [
            "JavaScript",
            "Node.js"
        ],
    "esPublico": true
}
console.log(typeof infoCurso); // object

let infoCursoJson = JSON.stringify(infoCurso); // Convertir objeto a JSON
console.log(typeof infoCursoJson);

let infoCursoObjeto = JSON.parse(infoCursoJson); // Convertir JSON a objeto
console.log(typeof infoCursoObjeto.titulo);


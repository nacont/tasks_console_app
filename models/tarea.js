const { v4: uuidv4} = require('uuid');

class Tarea {
    
    id = '';
    desc = '';
    completadoEn = null;

    // ES LO QUE SE EJECUTA CUANDO CREAMOS UNA NUEVA INSTANCIA DE NUESTRA CLASE
    constructor( desc ) {

        this.id = uuidv4();
        this.desc = desc;
        this.completadoEn = null

    }

}

module.exports = Tarea;
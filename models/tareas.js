const Tarea = require('./tarea');
class Tareas {

    _listado = {};

    get listadoArr() {

        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        });
        return listado;
    }

    constructor() {
        
        this._listado = {}; 
    }

    borrarTarea( id = '' ) {

        if(this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasDesdeArr( tareas = [] ) {

        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea( desc = '' ) {

        const tarea = new Tarea( desc );
        this._listado[tarea.id] = tarea; 

    }

    listadoCompleto( tareas ) {
        
        // let i = 1;
        // tareas.forEach( tarea => {
        //     console.log(`${'\i'.green}. ${tarea.desc} :: ${tarea.completadoEn ? 'Completada'.green : 'Pendiente'.red}`);
        //     i++;
        // });
        console.log();
        this.listadoArr.forEach( (tarea, index) => {
            const idx = `${++index}.`.green;
            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn ) 
                                ? 'Completada'.green
                                : 'Pendiente'.red;
            console.log(`${ idx } ${ desc } :: ${ estado }`);
            // console.log(`${idx} ${desc} :: ${completadoEn ? 'Completada'.green : 'Pendiente'.red}`);
        });

    }

    listarCompletadasPendientes( completadas = true ) {

        console.log();
        let contador = 0;
        this.listadoArr.forEach( (tarea, index) => {
            
            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn ) 
                                ? 'Completada'.green
                                : 'Pendiente'.red;
            if( completadas ) {
                if( completadoEn ) {
                    contador += 1;
                    console.log(`${ (contador+'.').green } ${ desc } :: ${ completadoEn.green }`);
                }

            } else {
                if( !completadoEn ) {
                    contador += 1;
                    console.log(`${ contador.toString().green } ${ desc } :: ${ estado }`);
                }
            }
            
        });
    }

    toogleCompletadas( ids ) {

        ids.forEach( id => {

            const tarea = this._listado[id];
            if( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString();
            }

        });

        this.listadoArr.forEach( tarea => {

            if( !ids.includes( tarea.id ) ) {
                this._listado[tarea.id].completadoEn = null;   
            };

        });
    }
}

module.exports = Tareas;
// LOS PAQUETES DE TERCEROS VAN PRIMEROS
require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquiererMenu, 
        pausa, 
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoCheckList
} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');


const main = async () => {
    
    let opt = '';
    
    const tareas = new Tareas();
    
    const tareasDB = leerDB();

    if( tareasDB ) {
        tareas.cargarTareasDesdeArr( tareasDB );
    }
    
    do {
        
        opt = await inquiererMenu();        
        
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea( desc );
                break;
            case '2':
                tareas.listadoCompleto( tareas.listadoArr ); 
                break;
            case '3':
                tareas.listarCompletadasPendientes();
                break;
            case '4':
                tareas.listarCompletadasPendientes( false );
                break; 
            case '5':
                const ids = await mostrarListadoCheckList( tareas.listadoArr );  
                tareas.toogleCompletadas( ids );
                break;
            case '6':
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if( id !== '0') {
                    const ok = await confirmar('¿Estás seguro?');
                    if( ok ) {
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada');
                    }
                }
                break;
            case '0':
                console.log('salir');
                break;            
        }

        guardarDB( tareas.listadoArr );
        
        await pausa();

    } while (opt !== '0');

}

main();
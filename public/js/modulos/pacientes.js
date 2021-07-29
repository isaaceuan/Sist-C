import Swal from 'sweetalert2';
import axios from 'axios';


const btnEliminar = document.querySelector('#eliminar-proyecto');
if(btnEliminar){
    btnEliminar.addEventListener('click', e =>{
        const urlPaciente = e.target.dataset.proyectoUrl;
        //console.log(urlProyecto);

        Swal.fire({
            title: 'Deseas borrar este paciente',
            text: "No podras rehacer este cambio",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar',
            cancelButtonText: 'No, cancelar'
          }).then((result) => {
            if (result.value) {
                //peticion axios
                const url = `${location.origin}/pacientes/${urlPaciente}`;
               axios.delete (url, {params: {urlPaciente}})
                    .then(function(respuesta){
                         console.log(respuesta)
                         Swal.fire(
                            ' Paciente Eliminado!',
                            respuesta.data,
                            'success'
                          );
                
                          setTimeout(()=>{
                            window.location.href= '/'
                          },3000);
               })
               .catch(()=>{
                  Swal.fire ({
                      title:'Hubo un error',
                      icon:'error',
                      text: 'No se pudo eliminar el paciente'
                  }) 
               })

               
              
               
            }
          })
    })
}
export default btnEliminar;


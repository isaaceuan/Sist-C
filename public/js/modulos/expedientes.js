const expedientes = document.querySelector('.cointainer-fluid');
import Swal from 'sweetalert2';
import axios from 'axios';


if(expedientes) {
    
    expedientes.addEventListener('click', e =>{
        if(e.target.classList.contains('fa-file-pdf')){
            const icono = e.target;
            const idExpediente= icono.parentElement.parentElement.dataset.expediente;
            console.log(idExpediente);
        }
        
if (e.target.classList.contains('fa-trash-alt')){
    const expedientHtml = e.target.parentElement.parentElement.parentElement.parentElement,
        idExpediente = expedientHtml.dataset.expediente;

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
                //ENVIAR DELE POR MEDIO DE AXXIOS
                const url=`${location.origin}/expedientes/${idExpediente}`;
                axios.delete(url, {params:{idExpediente}} )
                .then(function(respuesta){
                    expedientHtml.parentElement.removeChild(expedientHtml);
                    //alerta
                    Swal.fire(
                        'expediente eliminada',
                        respuesta.data,
                        'success',
                        setTimeout(()=>{
                            window.location.href= `${location.pathname}`
                          },1000)
                    )
                });
            }
        })
}
    });
}

export default expedientes;
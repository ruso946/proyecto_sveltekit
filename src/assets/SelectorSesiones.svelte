<script>
  /*
Lo que hay que traer:
 - array sesiones ==> como prop que viene desde padre (export let)
 - $idPacienteSeleccionado ==> import desde el store
 - mesSeleccionado ==> como prop (export let)
 - funcion handle_onChange_select_sesiones ==> se usa en el on:change ///Hay que generar un evento que burbujee a CRUDSesiones para que dispare esa funcion
 - selectedSessionId ==> se usa en el bind:group 
*/
  import VisualizarRegistros from "./VisualizarRegistros.svelte";
  import { createEventDispatcher } from "svelte";
  import { idPacienteSeleccionado, selectedSessionId } from "../store";
  
  export let mesSeleccionado;
  export let sesiones;
  export let cambioEnSesiones;

  let varSumaValorPagoPorPaciente;
  let varSumaValorSesionPorPaciente;

  const dispatch = createEventDispatcher();
  const handle_onChange_select_sesiones = (e) => {
    console.log(selectedSessionId, e.target.value);
    dispatch("cambioSelectorSesion", e.target.value);
    //$selectedSessionId = e.target.value;
  };
  const calcularValoresPorPaciente = (paciente)=>{
    varSumaValorPagoPorPaciente = 0;
    varSumaValorSesionPorPaciente = 0;
    sesiones.forEach(sesion => {
      if (Object.values(sesion).includes(paciente) && parseInt(sesion.diaSesion.slice(5, 7)) == mesSeleccionado){
        varSumaValorPagoPorPaciente += sesion.valorPago;
        varSumaValorSesionPorPaciente += sesion.valorSesion;
      }      
    });
  };

  $: {$idPacienteSeleccionado;
    console.log(`cambio id paciente ${$idPacienteSeleccionado}`);
    calcularValoresPorPaciente($idPacienteSeleccionado);
  };

  $: {
    console.log(`cambioEnSesiones ${cambioEnSesiones}`);      
      calcularValoresPorPaciente($idPacienteSeleccionado);
    }

  $: {
    $selectedSessionId;
    dispatch("cambioSelectorSesion", $selectedSessionId);    
  }
</script>

<div class="selectorSesiones">
  <ul class="sinPunto">
    {#each sesiones as sesion}
      {#if Object.values(sesion).includes($idPacienteSeleccionado) && parseInt(sesion.diaSesion.slice(5, 7)) == mesSeleccionado}
        <li>
          <input
            type="radio"
            id={sesion.id}
            on:change={handle_onChange_select_sesiones}
            bind:group={$selectedSessionId}
            name="sesiones"
            value={sesion.id}
          />
          <label for={sesion.id}
            >{`${sesion.diaSesion.slice(8, 10)} -sesion: $${
              sesion.valorSesion
            }-pago: ${sesion.fechaPago.slice(5, 10)} $${
              sesion.valorPago
            }`}</label
          >
        </li>
      {/if}
    {/each}
  </ul>
  <VisualizarRegistros {varSumaValorPagoPorPaciente} {varSumaValorSesionPorPaciente} />
</div>

<style>
  #select-sesiones {
    max-width: 100%;
    min-width: 100%;
    font-size: x-small;
  }
  .sinPunto {
    list-style: none;
    overflow-x: hidden;
  }

  .selectorSesiones {
    font-family: "Courier New", Courier, monospace;
    text-align: start;
    height: 10em;
    overflow-y: auto;
    background-color: rgb(28, 27, 27);
    color: blanchedalmond;
    max-width: 100%;
    width: 100%;
    margin: 0;
    font-size: small;
    white-space: pre;
    overflow-x: hidden;
  }

  input[type="radio"] {
    display: none;
  }

  /* Estilos personalizados para los botones de opción */
  input[type="radio"] + label {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid rgb(9, 63, 45);
    border-radius: 4px;
    cursor: pointer;
  }

  /* Estilo para el botón seleccionado */
  input[type="radio"]:checked + label {
    background-color: rgb(61, 30, 44);
    color: #ebdada;
  }

  /* Cambiar el estilo de la barra de desplazamiento */
  ::-webkit-scrollbar {
    width: 3px; /* Ancho de la barra de desplazamiento */
  }

  ::-webkit-scrollbar-track {
    background: rgb(
      41,
      39,
      39
    ); /* Color del fondo de la pista de la barra de desplazamiento */
  }

  ::-webkit-scrollbar-thumb {
    background: #888; /* Color del pulgar de la barra de desplazamiento */
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555; /* Color del pulgar de la barra de desplazamiento en estado de hover */
  }
</style>

<script>
  import { createEventDispatcher } from "svelte";
  export let pacientesFiltrada;
  export let planSelect; // estado que tambien va a pasarse en el evento cambioSelectPaciente
  let i = 0; // indice que se entrega con el evento cambioSelectPaciente
  let pacienteId; // id del paciente seleccionado que se entrega con el evento cambioSelectPaciente
  const dispatch = createEventDispatcher();

  const handleSelect = (event) => {
    const indiceSelectPaciente = event.target.value;
    planSelect = pacientesFiltrada[indiceSelectPaciente].plan;
    pacienteId = pacientesFiltrada[indiceSelectPaciente].id;
    dispatch("cambioSelectPaciente", [
      indiceSelectPaciente,
      planSelect,
      pacienteId,
    ]);

    console.log(
      `dispatch cambioSelectPaciente, idPaciente ${pacienteId} valorindiceSelectPaciente: 
      ${indiceSelectPaciente}, planSelect ${
        planSelect.plan ? planSelect.plan : "particular"
      }`
    );
    /*con este evento cambioSelectPaciente que se dispara al cambiar de eleccion de paciente
     en el select de pacientes se entrega el valor de ese select, y tambien el id de paciente
     y el plan correspondiente
    */
  };

  const handleListaPacientes = (e) => {   
    console.log(e) ;
    const pacienteObj = e.target.value;
    console.log(pacienteObj);
    const indiceSelectPaciente = e.target.value.indice;
    console.log(indiceSelectPaciente);
    pacienteId = e.target.value.paciente.id;
    planSelect = e.target.value.paciente.plan;    
    dispatch("cambioSelectPaciente", [
      indiceSelectPaciente,
      planSelect,
      pacienteId,
    ]);
    console.log(
      `dispatch cambioSelectPaciente, idPaciente ${pacienteId} valorindiceSelectPaciente: 
      ${indiceSelectPaciente}, planSelect ${
        planSelect.plan ? planSelect.plan : "particular"
      }`
    );
    /*con este evento cambioSelectPaciente que se dispara al cambiar de eleccion de paciente
     en el select de pacientes se entrega el valor de ese select, y tambien el id de paciente
     y el plan correspondiente
    */
  }
</script>

{#if pacientesFiltrada.length > 0}  
  <div class="listadoPacientes">
    <ul class="sinPunto">
      {#each pacientesFiltrada as person, j}
        <li>
          <input 
            bind:group={i}
            on:change={handleSelect}
            type="radio" id={person.id} name="pacientes" value={j} />
          <label for={person.id}
            >{`${person.apellido}, ${person.nombre}`.slice(0,20).padEnd(21, " ")+`${
              person.plan == "particular"
                ? ""
                : person.nroSocio + "   plan " + person.plan.plan
            }`}
          </label>
        </li>
      {/each}
    </ul>
  </div>
{/if}

<style>
  .listadoPacientes {
    font-family: 'Courier New', Courier, monospace;
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
  }

  .sinPunto {
    list-style: none;
  }

  input[type="radio"] {
    display: none;
  }

  /* Estilos personalizados para los botones de opción */
  input[type="radio"] + label {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid  rgb(9, 63, 45);
    border-radius: 4px;
    
    cursor: pointer;
    width: 95%;
  }

  /* Estilo para el botón seleccionado */
  input[type="radio"]:checked + label {
    background-color: rgb(61, 30, 44) ;
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

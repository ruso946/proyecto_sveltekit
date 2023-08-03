<script>
  export let planes;
  export let planSeleccionado;
  export let SelectPlanVisible;
  export let indicePlan;
  import { createEventDispatcher, onMount } from "svelte";
  let SelectPlanHidden;  
  

  $: SelectPlanHidden = !SelectPlanVisible;

  const manejaVisibilidadSelectPlan = (verSelectPlan) => {
    SelectPlanVisible = verSelectPlan;
  };

  const modificaLabelPlan = () => {
    dispatch("clickCheckPlan", { valor: { SelectPlanVisible } });
  };

  const clickCheckPlan = (event) => {
    // en esta funcion se verifica que al clickear en el checkbox de OS/particular
    var verSelectPlan = event.target.checked; // se haga o no visible el selector de planes
    manejaVisibilidadSelectPlan(verSelectPlan); // y tambien se llama a la funcion que dispara el evento que modifica el label
    modificaLabelPlan(); // del select plan
  };
  const dispatch = createEventDispatcher();
  const cambioPlan = (event) => {    
    indicePlan = parseInt(event.target.value);
    console.log(`tipo de dato indicePlan: ${typeof indicePlan}, indicePlan ${indicePlan}`)
    // console.log(`planSeleccionado antes de modificarlo en cambioPlan${planSeleccionado}`)//acá es un objeto
    // console.log(`planes, es lista de obj? ${planes}`);
    // console.log(`planes[0] ${planes[0]}`);
    // console.log(`planes[1] ${planes[1]}`);
    // console.log(`planes[indicePlan] ${planes[indicePlan]}`);
    console.log(`planSeleccionado.plan antes de modificarlo${planSeleccionado.plan}, indicePlan ${indicePlan}`);
    planSeleccionado = planes[indicePlan];
    console.log(`planSeleccionado.plan despues de modificarlo${planSeleccionado.plan}, indicePlan ${indicePlan}`);
    dispatch("cambioPlan", planSeleccionado );
  };

  //$: planSeleccionado = planes[indicePlan];
</script>

<!--
  si SelectPlanVisible=true entonces, se muestra el SelectPlan, o sea, estaría indicando que no es particular el paciente
  y por lo tanto, debería allí mostrar el label "plan"
  si SelectPlanVisible=false entonces, no se muestra el SelectPlan, o sea, estaría indicando que es particular el paciente
  y por lo tanto, debería allí mostrar el label "particular".
-->
<div id="selectPlanContainer">
  <input
    bind:checked={SelectPlanVisible}
    on:change={clickCheckPlan}
    type="checkbox"
    name="CheckBoxParticular"
    id="CheckBoxParticular"
  />
  <select
    class:SelectPlanVisible
    class:SelectPlanHidden
    name="plan"
    id="plan"
    bind:value={indicePlan}
    on:change={cambioPlan}
    >
    {#each planes as plan, index}
      <option value={index}>{plan.plan}</option>
    {/each}
  </select>  
</div>

<style>
  #selectPlanContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    flex-grow: 1;
  }

  select {
    width: 100%;
    max-width: 100%;
    text-align: end;
  }

  .SelectPlanVisible {
    visibility: visible;
  }

  .SelectPlanHidden {
    visibility: hidden;
  }
</style>

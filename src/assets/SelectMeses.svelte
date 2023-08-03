<script>
  import { createEventDispatcher } from "svelte";  

    let mesActual =  new Date().getMonth() + 1;

  let meses = [
    {
      nro: 1,
      nombre: "enero",
    },
    {
      nro: 2,
      nombre: "febrero",
    },
    {
      nro: 3,
      nombre: "marzo",
    },
    {
      nro: 4,
      nombre: "abri",
    },
    {
      nro: 5,
      nombre: "mayo",
    },
    {
      nro: 6,
      nombre: "junio",
    },
    {
      nro: 7,
      nombre: "julio",
    },
    {
      nro: 8,
      nombre: "agosto",
    },
    {
      nro: 9,
      nombre: "setiembre",
    },
    {
      nro: 10,
      nombre: "octubre",
    },
    {
      nro: 11,
      nombre: "noviembre",
    },
    {
      nro: 12,
      nombre: "diciembre",
    },
  ];

  const dispatch = createEventDispatcher();

  const handleCambioMes = (mes) => {
    dispatch("cambioMes", mes);
  };
</script>
<main>
  <select
  on:change={(e)=>handleCambioMes(e.target.value)}
  on:dblclick={(e)=>handleCambioMes(e.target.value)}
  bind:value={mesActual}
  name="mes"
  id="mesRegistro"
>
  {#each meses as mes}
    <option value={mes.nro}
      >{`listar ${mes.nombre}`}</option
    >
  {/each}
</select>
</main>
<style>
  main{    
    background-color: rgb(58, 78, 78);
    padding: 5px;
  }

  select{
    padding: 3px;
    background-color: rgb(42, 40, 40);
    color: #8C8C8C;
  }
  
</style>
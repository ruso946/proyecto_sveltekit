<script>  
  export let varSumaValorPagoPorPaciente;
  export let varSumaValorSesionPorPaciente;
</script>

<div class="row">
  <div class="col-6 d-flex justify-content-end">
    <p class="text-left">total pagos:</p>
  </div>
  <div class="col-2 d-flex justify-content-start">
    <p class="text-right">${varSumaValorPagoPorPaciente}</p>
  </div>
</div>
<div class="row piso">
  <div class="col-6 d-flex justify-content-end">
    <p class="text-left">total sesiones:</p>
  </div>
  <div class="col-6 d-flex justify-content-start">
    <p class="text-right">${varSumaValorSesionPorPaciente}</p>
  </div>
</div>



<style>
  p{
    margin: 0;
    padding-left: 1em;
    padding: 0;
  }

  .piso{
    padding-bottom: 1em;
  }
</style>
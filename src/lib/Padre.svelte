<script>
  import { devuelveFechaActual } from "./modulos/moduloSesiones";
  import CRUDPacientes from "./CRUDPacientes.svelte";
  import CRUDSesiones from "./CRUDSesiones.svelte";
  import { onMount } from "svelte";
  import { db } from "./configFirebase/firebasePacientes";
  import {
    collection,
    query,
    onSnapshot,
    setDoc,    
    doc,
    orderBy,    
  } from "firebase/firestore";
  
  let sesiones = [];
  let pacientes = [];
  let planes = [];
  let optionsPlan = [];
  let planSeleccionado = "particular";
  //este onMount hace una suscripcion a las db "Pacientes", "planes" y "sesiones"
  onMount(() => {
    const unsubscribeFunctions = [];
    const sesionesRef = collection(db, "sesiones");
    const pacientesRef = collection(db, "Pacientes");
    const planesRef = collection(db, "planes");
    const qs = query(sesionesRef, orderBy("diaSesion"));
    const qp = query(pacientesRef, orderBy("apellido"));
    const qplanes = query(planesRef, orderBy("plan"));

    //hacer una consulta de suscripcion por mes para sacar el total por mes
    //por paciente y por todas las sesiones del mes

    const unsubscribeSesiones = onSnapshot(qs, (snapshot) => {
      sesiones = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });

    console.log("desde onMount CRUDSesiones", sesiones);
    unsubscribeFunctions.push(unsubscribeSesiones);

    const unsubscribePacientes = onSnapshot(qp, (snapshot) => {
      pacientes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });
    unsubscribeFunctions.push(unsubscribePacientes);

    const unsubscribePlanes = onSnapshot(qplanes, (snapshot) => {
      planes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });
    unsubscribeFunctions.push(unsubscribePlanes);

    return () => {
      unsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
    };
  });

  $: {
    if (planes.length != 0) {
      // este bloque reactivo detecta cuando está cargado el array optionsPlan
      console.log(planes); // para agregarle el valor "particular" y ordenarlo alfabéticamente.
      optionsPlan = planes.map((plan) => plan.plan); // Después será pasado a CRUDPacientes y a SelectPlan sucesivamente como prop
      optionsPlan.push("particular");
      optionsPlan.sort();
      console.log(optionsPlan);
    } else {
      console.log("no hay planes");
    }
  }

  ////////////////////////////////////////////////////////////////////////
  /// Para hacer un backup de sesiones, Pacientes y planes en firestore///
  ////////////////////////////////////////////////////////////////////////

  const backupColeccionesFirestore = () => {
    const SesionesfechaActual = "sesiones" + devuelveFechaActual().toString()+"BU";
    // Obtener una referencia a la colección sesionesBackup
    const collectionSesionesBU = collection(db, (SesionesfechaActual));

    // Iterar sobre los datos del objeto 'sesiones' y guardarlos en la colección
    sesiones.forEach(async (sesion) => {
      // Generar un ID único para cada documento en la colección sesionesBackup
      const documentSesionesBU = doc(collectionSesionesBU);

      // Crear el documento con los datos correspondientes
      try {
        await setDoc(documentSesionesBU, sesion);
        console.log("Documento sesion creado exitosamente");
      } catch (error) {
        console.error("Error al crear el documento sesion:", error);
      }
    });

    const PlanesfechaActual = "planes" + devuelveFechaActual().toString()+"BU";
    // Obtener una referencia a la colección planesBackup
    const collectionPlanesBU = collection(db, PlanesfechaActual);

    // Iterar sobre los datos del objeto 'sesiones' y guardarlos en la colección
    planes.forEach(async (plan) => {
      // Generar un ID único para cada documento en la colección planesBackup
      const documentPlanesBU = doc(collectionPlanesBU);

      // Crear el documento con los datos correspondientes
      try {
        await setDoc(documentPlanesBU, plan);
        console.log("Documento plan creado exitosamente");
      } catch (error) {
        console.error("Error al crear el documento plan:", error);
      }
    });

    const PacientesfechaActual = "Pacientes" + devuelveFechaActual().toString()+"BU";
    // Obtener una referencia a la colección PacientesBackup        
    const collectionPacientesBU = collection(db, PacientesfechaActual);

    // Iterar sobre los datos del objeto 'pacientes' y guardarlos en la colección
    pacientes.forEach(async (paciente) => {
      // Generar un ID único para cada documento en la colección planesBackup
      const documentPacienteBU = doc(collectionPacientesBU);

      // Crear el documento con los datos correspondientes
      try {
        await setDoc(documentPacienteBU, paciente);
        console.log("Documento paciente creado exitosamente");
      } catch (error) {
        console.error("Error al crear el documento paciente:", error);
      }
    });
  };
</script>

<body>
  <button on:click={backupColeccionesFirestore}>generar backup firestore</button>  
  <div class="contenedor-pacientes" id="contenedorPacientes">
    <h5>Listados de Pacientes</h5>
    <CRUDPacientes
      {sesiones}
      {pacientes}
      {planes}      
      {planSeleccionado}
    />
  </div>

  <div class="contenedor-sesiones">
    <CRUDSesiones {sesiones} {pacientes} {planes} {planSeleccionado}/>
  </div>
</body>

<style>
  body {
    max-width: 100vh;
    margin: auto;
  }

  .contenedor-pacientes,
  .contenedor-sesiones {
    display: flex;
    max-width: 100vh;
    flex-direction: column;
    border: 0.2em solid black;
    padding: 3px;
    background-color: rgb(58, 78, 78);
    margin-bottom: 3px;
    text-align: center;
  }

  h5{
    color: blanchedalmond;
  }
</style>

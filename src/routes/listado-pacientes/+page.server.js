import {collection, getDocs, query, orderBy, onSnapshot} from "firebase/firestore";
import {db} from "$lib/firebasePacientes"
import { auth } from "$lib/firebasePacientes"; // Asegúrate de importar la instancia de autenticación desde firebaseConfig.js

let instantaneaPacientes = [];
let suscripcionPacientes = [];

try {
  const pacientesRef = collection(db, 'Pacientes');

  const qp = query(pacientesRef, orderBy('apellido'));
  console.log(auth.user);
  if (auth.currentUser) {
  const consultaPacientes = await getDocs(qp);
  instantaneaPacientes = consultaPacientes.docs.map((paciente) => ({
      id: paciente.id,
      ...paciente.data(),
    }));
  
  const unsubPacientes = onSnapshot(qp, (querySnapshot) => {
      suscripcionPacientes = [];
      querySnapshot.forEach((paciente) => {
      suscripcionPacientes.push({id: paciente.id, ...paciente.data()});
    });    
  });
  }  
} catch (error) {
  console.error(error)
}



//unsubPacientes();

export async function load(){    
  if (!auth.currentUser) {
    return {
        Pacientes: instantaneaPacientes.map((paciente) => ({
            id: paciente.id,
            ... paciente,
        })),
    }
};}
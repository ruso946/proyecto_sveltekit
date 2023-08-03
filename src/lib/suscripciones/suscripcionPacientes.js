import { onSnapshot } from 'firebase/firestore';

export function subscribeToPacientes(query, onData) {
	return onSnapshot(query, (querySnapshot) => {
		const pacientes = [];
		querySnapshot.forEach((paciente) => {
			pacientes.push({ id: paciente.id, ...paciente.data() });
		});
		onData(pacientes);
	});
}

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth} from '../auth/authProvider';
import { API_url } from '../auth/const';

const PedidoItem = ({
	_id,
	title,
	completed,
	pago,
	cuantos,
	recibio_pago,
	expiredate,
	onUpdateCompleted,
	onDeletePedido,
	onUpdatePedidos
}) => {
	const [ isUpdating, setIsUpdating ] = useState(false);
	const [ isDeleting, setIsDeleting ] = useState(false);

	const { getAccessToken } = useAuth();
	const currentAccessToken = getAccessToken();
	const handleDeletePedido = async () => {
		if (window.confirm('¿Estás seguro de que deseas eliminar este pedido?')) {
			try {
				setIsDeleting(true);
				const authToken = 'Bearer ' + currentAccessToken; // Ajusta esta línea según cómo obtienes el token en tu aplicación

				// Send a request to the backend to delete the pedido
				const response = await fetch(`${API_url}/pedidos/${_id}`, {
					method: 'DELETE',
					headers: {
						Authorization: authToken, // Agregar el token al encabezado

						'Content-Type': 'application/json'
					}
				});

				if (response.ok) {
					// If the deletion is successful, trigger the callback to update the state in the parent component
					onDeletePedido(_id);onUpdatePedidos();
				} else {
					console.error('Error deleting pedido:', response.statusText);
				}
			} catch (error) {
				console.error('Error deleting pedido:', error);
			} finally {
				// Reset the deleting state
				setIsDeleting(false);onUpdatePedidos();
			}
		}
	};

	const handleUpdateCompleted = async () => {
		try {
			// Obtener el token de tu sistema de autenticación (asegúrate de ajustar esto según tu implementación)
			const authToken = 'Bearer ' + currentAccessToken; // Ajusta esta línea según cómo obtienes el token en tu aplicación

			// Enviar una solicitud al backend para actualizar el campo 'completed'
			const response = await fetch(`${API_url}/pedidos/${_id}/toggle-completed`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: authToken // Agregar el token al encabezado
				},
				body: JSON.stringify({
					completed: !completed
				})
			});

			if (response.ok) {
				// Si la actualización es exitosa, activa la devolución de llamada para actualizar el estado en el componente principal
				onUpdateCompleted(_id, !completed); onUpdatePedidos();
			} else {
				console.error('Error updating completed status:', response.statusText);
			}
		} catch (error) {
			console.error('Error updating completed status:', error);
		} finally {
			// Reiniciar el estado de actualización
			setIsUpdating(false);onUpdatePedidos();
		}
	};

	const formatExpireDate = (expiredate) => {
		const date = new Date(expiredate);
		const day = date.getDate();
		const month = date.toLocaleString('default', { month: 'long' });
		const year = date.getFullYear();

		return `${day} ${month} ${year}`;
	};

	return (
		<div className="pedido-item flex flex-row flex-wrap border bg-red-400 m-2 shadow text-center rounded items-align-center">
			<p className="m-2 p-2 border"> Comprador: {title} </p>
			<p className="m-2 p-2 border"> Completed: {completed ? 'Entregado' : 'No entregado'} </p>
			<p className="m-2 p-2 border"> Pago: {pago ? 'Si' : 'No'} </p>
			<p className="m-2 p-2 border"> Cuantos: {cuantos ? cuantos : 'ningun'	}  </p>
			<p className="m-2 p-2 border"> Recibio Pago: {recibio_pago ? 'Si' : 'No'} </p>
			<p className="m-2 p-2 border"> Dia de entrega: {formatExpireDate(expiredate)} </p>

			{/* Botones de acción */}
			<button
				className={`m-2 bg-green-300 rounded-xl m-2 p-2 ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
				onClick={handleUpdateCompleted}
				disabled={isUpdating || isDeleting}
			>
				{isUpdating ? 'Updating...' : 'Entregado'}
			</button>
			<button
				className={` rounded bg-white m-2 p-2 ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
				onClick={handleDeletePedido}
				disabled={isDeleting || isUpdating}
			>
				{isDeleting ? 'Deleting...' : 'Delete Pedido'}
			</button>
		</div>
	);
};

PedidoItem.propTypes = {
	_id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	completed: PropTypes.bool.isRequired,
	pago: PropTypes.bool.isRequired,
	cuantos: PropTypes.number.isRequired,
	recibio_pago: PropTypes.bool.isRequired,
	expiredate: PropTypes.instanceOf(Date).isRequired,
	onUpdateCompleted: PropTypes.func.isRequired,
	onDeletePedido: PropTypes.func.isRequired
};

export default PedidoItem;
		
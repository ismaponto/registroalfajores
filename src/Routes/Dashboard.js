import { useAuth } from '../auth/authProvider';
import Logout from '../Components/LogOut';
import { API_url } from '../auth/const';
import { useEffect, useState, useCallback } from 'react';
import PedidosComp from '../Components/PedidosComp';

export default function Dashboard() {
  const { getUser, getAccessToken } = useAuth();
  const currentUser = getUser();
  const currentAccessToken = getAccessToken();
  const [accessToken, setAccessToken] = useState(currentAccessToken);
  const [user] = useState(currentUser);
  const [pedidos, setPedidos] = useState([]);
  const [newPedido, setNewPedido] = useState({
    title: '',
    cuantos: 0, // Assuming 'cuantos' is a numeric field
    recibio_pago: false, // Assuming 'recibio_pago' is a boolean field
    expiredate: '',
  });
  const [unsavedPedidos, setUnsavedPedidos] = useState([]);
  const [emailError, setEmailError] = useState(false);
  const [messageError, setMessageError] = useState(null);

  const memoizedFetchPedidos = useCallback(fetchPedidos, [getAccessToken]);

  useEffect(() => {
    memoizedFetchPedidos();
  }, [memoizedFetchPedidos]);

  async function fetchPedidos() {
    try {
      let sAccessToken = getAccessToken();

      if (sAccessToken.accessToken) {
        sAccessToken = getAccessToken().accessToken;
        setAccessToken(sAccessToken);
      }

      const response = await fetch(`${API_url}/pedidos`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sAccessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const dataJson = data.body;
        setPedidos(dataJson);
      } else {
        setEmailError('aca hay un'
        );
        throw new Error('Something went wrong');
      }
    } catch (error) {
      console.error('Error fetching pedidos:', error);
    }
  }

  async function handleNewPedidoSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${API_url}/pedidos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newPedido),
      });
      if (response.ok) {
        console.log('Nuevo Objetivo incluido correctamente');
        fetchPedidos();
        setNewPedido({
          title: '',
          cuantos: 0, // Assuming 'cuantos' is a numeric field
          recibio_pago: false, // Assuming 'recibio_pago' is a boolean field
          expiredate: '',
        });

        const createdPedido = await response.json();
        setUnsavedPedidos([...unsavedPedidos, createdPedido]);
      } else {
        throw new Error('Error saving new pedido');
        setMessageError('Error saving new pedido');

      }
    } catch (error) {

      console.error('Error saving new pedido:', error);
    }
  }



  

  
    return (
      <div className="center shadow">
        <h1>Hola de nuevo {user.user.name} {user.user.surname}</h1>
        <form className="rounded-xl shadow text-center bg-red-400 w-40 m-1 p-4 border" onSubmit={handleNewPedidoSubmit}>  
        {messageError && <span style={{ color: 'red' }}>{messageError}</span>}

  <label>
    <input
      className="border-none shadow rounded-xl bg-yellow-100 w-40"
      placeholder="Comprador"
      type="text"
      value={newPedido.title}
      onChange={(e) => setNewPedido({ ...newPedido, title: e.target.value })}
    />
  </label>
  <label>
    <input
      className="border-none shadow rounded-xl text-sm bg-yellow-100 border m-1 w-40"
      placeholder="Cantidad"
      type="number"  // Assuming 'cuantos' is a numeric field
      value={newPedido.cuantos}
      onChange={(e) => setNewPedido({ ...newPedido, cuantos: e.target.value })}
    />
  </label>
  <label className='border-none shadow rounded-xl text-sm bg-yellow-100 border m-1 w-40'>Fue pago?
    <input
      className="border-none shadow rounded-xl text-sm bg-red-500 border m-1 w-40"
      placeholder="Recibió Pago"
      type="checkbox"  // Use a checkbox for boolean
      checked={newPedido.recibio_pago}
      onChange={(e) => setNewPedido({ ...newPedido, recibio_pago: e.target.checked })}
    /> 
  </label>
  <label>
    <input
      className="border-none shadow rounded-xl text-sm bg-yellow-100 border m-1 w-40"
      placeholder="Fecha de vencimiento"
      type="date"
      value={newPedido.expiredate}
      onChange={(e) => setNewPedido({ ...newPedido, expiredate: e.target.value })}
    />
  </label>
  <button type="submit">Agregar Nuevo Pedido</button>
</form>
      
        <PedidosComp  pedidos={pedidos}  accessToken={accessToken} fetchPedidos={memoizedFetchPedidos} />
        <Logout />

      </div>
    );
  }


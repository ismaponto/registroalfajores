import React from 'react';
import PedidoItem from './PedidoItem'; // Assuming you have a component named PedidoItem

const PedidosComponent = ({ pedidos, onDeletePedido, accessToken, fetchPedidos }) => {
  return (
    <div className="flex flex-wrap max-w-full">
      {Array.isArray(pedidos) && pedidos.length > 0 ? (
        pedidos.map((pedido) => (
          <PedidoItem
            key={pedido._id} // Add a 'key' prop for React list items
            _id={pedido._id}
            idUser={pedido.idUser}
            title={pedido.title}
            cuantos={pedido.cuantos}
            completed={pedido.completed}
            expiredate={pedido.expiredate}
            accessToken={accessToken}
            onUpdatePedidos={fetchPedidos}
            onDelete={() => onDeletePedido(pedido._id)}
          />
        ))
      ) : (
        <div>No pedidos available.</div>
      )}
    </div>
  );
};

export default PedidosComponent;

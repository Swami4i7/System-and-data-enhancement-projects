export function OrdersTable({ orders }: { orders: any[] }) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <div>
          {orders.map((order:any) => (
            <div key={order.id}>
              <h3>{order.customerName}</h3>
              <p>{order.type}</p>
              <p>{order.status}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
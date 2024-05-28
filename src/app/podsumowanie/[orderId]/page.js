const getOrderSummary = async (orderId) => {
  const response = await fetch(`http://localhost:3000/api/order/${orderId}`);
  return response.json();
};

const OrderSummary = async ({ params }) => {
  const { data } = await getOrderSummary(params.orderId);
  console.log(data);
  return (
    <div>
      <h1>OrderSummary</h1>
    </div>
  );
};

export default OrderSummary;

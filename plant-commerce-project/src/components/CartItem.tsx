import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../store/reducers/CartSlice';
import { Item } from '../store/reducers/CartSlice';
import { RootState } from '../store';

import '../styles/dist/css/CartItem.css';

interface CartItemProps {
  onContinueShopping: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const CartItem: React.FC<CartItemProps> = ({ onContinueShopping }) => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = (): number => {
    return cart.reduce(
      (total: number, item: Item) =>
        total + parseFloat(item.cost.replace('$', '')) * (item.quantity ?? 1),
      0
    );
  };

  const handleContinueShopping = (
    e: React.MouseEvent<HTMLButtonElement>
  ): void => {
    onContinueShopping(e);
  };

  const handleIncrement = (item: Item): void => {
    dispatch(
      updateQuantity({ name: item.name, quantity: (item.quantity ?? 0) + 1 })
    );
  };

  const handleDecrement = (item: Item): void => {
    const currentQuantity = item.quantity ?? 0;
    if (currentQuantity > 1) {
      dispatch(
        updateQuantity({ name: item.name, quantity: currentQuantity - 1 })
      );
    }
  };

  const handleRemove = (item: Item): void => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item: Item): number => {
    const numericCost = parseFloat(item.cost.replace('$', ''));
    return numericCost * (item.quantity ?? 1);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>
      <div>
        {cart.map((item: Item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">
                  {item.quantity}
                </span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{ marginTop: '20px', color: 'black' }}
        className="total_cart_amount"
      ></div>
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;

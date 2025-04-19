import { useNavigate, useParams } from 'react-router-dom';
import WelcomeFunc from '../components/WelcomeFunc';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { CartItem } from '../types/Cartitem';

function DonatePage() {
  const navigate = useNavigate();
  const { projectName, projectID: projectID } = useParams();
  const { addToCart } = useCart();
  const [donationAmount, setDonationAmount] = useState<number>(0);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      projectID: Number(projectID),
      projectName: projectName || 'No Project Found',
      donationAmount,
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <WelcomeFunc />
      <br />
      <h2>Donate to {projectName}</h2>
      <div>
        <input
          type="number"
          placeholder="Enter donation amount"
          value={donationAmount}
          onChange={(x) => setDonationAmount(Number(x.target.value))}
        />
        <br />
        <br />
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
      <br />
      <button onClick={() => navigate(-1)}>Go Back</button>
      {/* Could use '/projects' instead of -1 tooo */}
    </>
  );
}

export default DonatePage;

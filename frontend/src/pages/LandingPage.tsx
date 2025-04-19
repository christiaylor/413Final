import { useNavigate, useParams } from 'react-router-dom';

import WelcomeFunc from '../components/WelcomeFunc';



function LandingPage() {

  const navigate = useNavigate();

  return (
    <>
      <WelcomeFunc />
      <button onClick={() => navigate('/entertainers')}>See Entertainers</button>
    </>
  );
}

export default LandingPage;

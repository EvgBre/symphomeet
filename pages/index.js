import Image from 'next/image';
import { useAuth } from '../utils/context/authContext';
import SymphoMeet from '../images/SymphoMeet.png';

function Home() {
  const { user } = useAuth();

  return (
    <div
      className="d-flex flex-column justify-content-center align-content-center"
      style={{
        padding: '30px',
        margin: '0 auto',
      }}
    >
      <h1 style={{ fontSize: '1.5rem' }}>
        Hello {user.displayName}! Welcome to{' '}
        <div style={{ maxWidth: '100%', marginRight: '20px' }}>
          <Image src={SymphoMeet} alt="SymphoMeet logo" width={1000} height={450} />
        </div>
      </h1>
      <h1 style={{ fontSize: '1.5rem' }}>Your journey for exploring Nashville&apos;s Classical Music Scene begins here...</h1>
    </div>
  );
}

export default Home;

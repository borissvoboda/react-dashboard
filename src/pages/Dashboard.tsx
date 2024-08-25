import { useState } from 'react';
import lipsum from '../assets/lipsum.json';

function Header() {
  return (
    <nav className='pt-4 pb-4 sticky backdrop-blur top-0 bg-white supports-backdrop-blur:bg-white/95 shadow-lg'>
      <div className='container mx-auto'>
        <h1>My Dashboard</h1>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <nav className='pt-4 pb-4 backdrop-blur top-0 bg-white supports-backdrop-blur:bg-white/95 shadow-lg'>
      <div className='container mx-auto'>
        <h1>Footer</h1>
      </div>
    </nav>
  );
}

function Dashboard() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />

      <div className='container mx-auto'>
        <p>{lipsum.longText}</p>
        <p>{lipsum.longText}</p>
        <p>{lipsum.longText}</p>
        <p>{lipsum.longText}</p>
        <p>{lipsum.longText}</p>
        <p>{lipsum.longText}</p>
      </div>

      <Footer />
    </>
  );
}

export default Dashboard;

import Hero from '@components/Sections/Hero';
import AboutUs from '@components/Sections/AboutUs';
import type { NextPage } from 'next';
import Bottom from '@components/Sections/Bottom';

const Home: NextPage = () => {
  return (
    <>
      <Hero />
      <AboutUs />
      <Bottom />
    </>
  );
};

export default Home;

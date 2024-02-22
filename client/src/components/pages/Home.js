import React from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';
import DTF from '../DTF';
import Cards from '../Cards';
import FormSection from '../FormSection';
import { useRef, useState } from 'react';

function Home() {
  const scrollRef = useRef()
  const [freeSamplePack, setFreeSamplePack] = useState(false);
  return (
    <>
      <HeroSection 
      scrollRef={scrollRef}
      freeSamplePack={freeSamplePack}
      setFreeSamplePack={setFreeSamplePack}
      />
      <DTF/>
      <Cards/>
      <div ref={scrollRef}>
      <FormSection
      freeSamplePack={freeSamplePack}
      setFreeSamplePack={setFreeSamplePack}
      />
      </div>
    </>
  );
}

export default Home;
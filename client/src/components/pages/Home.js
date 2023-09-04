import React from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';
import DTF from '../DTF';
import Cards from '../Cards';
import FormSection from '../FormSection';
import { useRef } from 'react';

function Home() {
  const scrollRef = useRef()
  return (
    <>
      <HeroSection scrollRef={scrollRef}/>
      <DTF/>
      <Cards/>
      <div ref={scrollRef}>
      <FormSection/>
      </div>
    </>
  );
}

export default Home;
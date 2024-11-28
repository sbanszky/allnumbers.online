import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import IntroText from './components/IntroText';
import FeatureSection from './components/FeatureSection';
import SubnettingTest from './components/SubnettingTest';
import SubnetCalculator from './components/SubnetCalculator';
import IPv6SubnettingTest from './components/IPv6SubnettingTest';
import IPv6SubnetCalculator from './components/IPv6SubnetCalculator';
import EmailContact from './components/EmailContact';
import WhoAmI from './components/WhoAmI';
import IPv4Architecture from './components/IPv4Architecture';
import InternetEvolution from './components/InternetEvolution';
import IPv6NextGen from './components/IPv6NextGen';
import LOStory from './components/LOStory';
import Protocols from './components/Protocols';
import Standards from './components/Standards';

function App() {
  return (
    <Router>
      <div className="min-h-screen cyber-grid">
        <div className="relative overflow-hidden">
          <div className="flex flex-col min-h-screen">
            <HeroSection />
            <Navigation />
            <Routes>
              <Route path="/whoami" element={<WhoAmI />} />
              <Route path="/lo" element={<LOStory />} />
              <Route path="/internet-evolution" element={<InternetEvolution />} />
              <Route path="/protocols" element={<Protocols />} />
              <Route path="/standards" element={<Standards />} />
              <Route path="/ipv4-architecture" element={<IPv4Architecture />} />
              <Route path="/ipv4-subnetting" element={<SubnettingTest />} />
              <Route path="/subnet-calculator" element={<SubnetCalculator />} />
              <Route path="/ipv6-subnetting" element={<IPv6SubnettingTest />} />
              <Route path="/ipv6-subnet-calculator" element={<IPv6SubnetCalculator />} />
              <Route path="/ipv6-next-gen" element={<IPv6NextGen />} />
              <Route path="/contact" element={<EmailContact />} />
              <Route path="/" element={
                <>
                  <IntroText />
                  <FeatureSection />
                </>
              } />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
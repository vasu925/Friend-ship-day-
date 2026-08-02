/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ScrapbookData } from './types';
import { loadScrapbookData, saveScrapbookData, DEFAULT_SCRAPBOOK_DATA } from './utils/storage';
import { FloatingParticles } from './components/FloatingParticles';
import { AudioPlayer } from './components/AudioPlayer';
import { Navigation } from './components/Navigation';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Page1_FriendshipDef } from './components/Page1_FriendshipDef';
import { Page2_BestieAwardLoading } from './components/Page2_BestieAwardLoading';
import { Page3_CertificateAward } from './components/Page3_CertificateAward';
import { Page4_YouAreMy } from './components/Page4_YouAreMy';
import { Page5_MomentsOfUs } from './components/Page5_MomentsOfUs';
import { Page6_EnvelopeLetter } from './components/Page6_EnvelopeLetter';
import { Page7_CatchHeartsGame } from './components/Page7_CatchHeartsGame';
import { Page8_QuestionPage } from './components/Page8_QuestionPage';
import { Page9_FinalDiaryLetter } from './components/Page9_FinalDiaryLetter';
import { SecretEasterEggModal } from './components/SecretEasterEggModal';
import { soundFx } from './utils/audio';

export default function App() {
  const [data, setData] = useState<ScrapbookData>(loadScrapbookData);
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [unlockedMaxPage, setUnlockedMaxPage] = useState(9); // Allow exploring pages
  const [titleClickCount, setTitleClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  // Smooth scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Global protection: Prevent saving, right-clicking, and dragging images
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'IMG' || target.closest('img'))) {
        e.preventDefault();
      }
    };
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'IMG' || target.closest('img'))) {
        e.preventDefault();
      }
    };
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    saveScrapbookData(data);
  }, [data]);

  const handleTitleClick = () => {
    setTitleClickCount((prev) => {
      const next = prev + 1;
      if (next >= 5) {
        setShowEasterEgg(true);
        return 0;
      }
      return next;
    });
  };

  return (
    <div
      className="min-h-screen bg-pastel-stripes text-slate-800 relative overflow-x-hidden font-poppins selection:bg-pink-200 selection:text-pink-900 pb-16 pt-12"
    >
      {/* Background Floating Stars, Hearts, Flowers Particles */}
      <FloatingParticles />

      {/* Persistent Audio Controls */}
      <AudioPlayer />

      {/* Navigation Header */}
      {!showWelcome && (
        <Navigation
          currentPage={currentPage}
          totalPages={9}
          onPageChange={(page) => setCurrentPage(page)}
          onTitleClick={handleTitleClick}
          unlockedMaxPage={unlockedMaxPage}
        />
      )}

      {/* Welcome Notification Modal */}
      {showWelcome && (
        <WelcomeScreen
          onStart={() => {
            setShowWelcome(false);
            setCurrentPage(1);
          }}
        />
      )}

      {/* MAIN STORYBOOK CONTENT PAGES */}
      {!showWelcome && (
        <main className="relative z-10 transition-all duration-500 animate-in fade-in">
          {currentPage === 1 && (
            <Page1_FriendshipDef
              photoUrl={data.userPhotoUrl}
              definition={data.dictionaryDefinition}
              isLocked={true}
              onUpdatePhoto={(url) => setData({ ...data, userPhotoUrl: url })}
              onUpdateDefinition={(def) => setData({ ...data, dictionaryDefinition: def })}
              onNext={() => setCurrentPage(2)}
            />
          )}

          {currentPage === 2 && (
            <Page2_BestieAwardLoading
              onReveal={() => setCurrentPage(3)}
            />
          )}

          {currentPage === 3 && (
            <Page3_CertificateAward
              bestieName={data.bestieName}
              awardMessage={data.awardMessage}
              isLocked={true}
              onUpdateName={(name) => setData({ ...data, bestieName: name })}
              onUpdateMessage={(msg) => setData({ ...data, awardMessage: msg })}
              onNext={() => setCurrentPage(4)}
            />
          )}

          {currentPage === 4 && (
            <Page4_YouAreMy
              labels={data.mindmapLabels}
              isLocked={true}
              onUpdateLabels={(labels) => setData({ ...data, mindmapLabels: labels })}
              onNext={() => setCurrentPage(5)}
            />
          )}

          {currentPage === 5 && (
            <Page5_MomentsOfUs
              photos={data.photos}
              isLocked={true}
              onUpdatePhotos={(photos) => setData({ ...data, photos })}
              onNext={() => setCurrentPage(6)}
            />
          )}

          {currentPage === 6 && (
            <Page6_EnvelopeLetter
              letterText={data.envelopeLetterText}
              isLocked={true}
              onUpdateLetterText={(text) => setData({ ...data, envelopeLetterText: text })}
              onNext={() => setCurrentPage(7)}
            />
          )}

          {currentPage === 7 && (
            <Page7_CatchHeartsGame
              onUnlockNextPage={() => setUnlockedMaxPage(9)}
              onNext={() => setCurrentPage(8)}
            />
          )}

          {currentPage === 8 && (
            <Page8_QuestionPage
              onNext={() => setCurrentPage(9)}
            />
          )}

          {currentPage === 9 && (
            <Page9_FinalDiaryLetter
              finalDiaryText={data.finalDiaryText}
              isLocked={true}
              onUpdateFinalDiaryText={(text) => setData({ ...data, finalDiaryText: text })}
              onRestart={() => setCurrentPage(1)}
            />
          )}
        </main>
      )}

      {/* Secret Easter Egg Surprise Modal */}
      <SecretEasterEggModal
        isOpen={showEasterEgg}
        onClose={() => setShowEasterEgg(false)}
      />
    </div>
  );
}

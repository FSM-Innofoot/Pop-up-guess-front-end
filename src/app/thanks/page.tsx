'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Card from '@/components/Card';
import styles from './page.module.css';

export default function ThanksPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      // 4 april 2026 om 20:00 CET (Brusselse tijd)
      const targetDate = new Date('2026-04-04T20:00:00+02:00').getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.page}>
      <Card className={styles.card}>
        {/* Logo */}
        <div className={styles.logoWrap}>
          <Image
            src="/fsm-logo.png"
            alt="Football Shirt Market"
            width={220}
            height={99}
            priority
            className={styles.logo}
          />
        </div>

        <h1 className={styles.headline}>Thank you!</h1>
        <p className={styles.body}>Your guess has been registered.</p>

        {/* Prominent auction announcement */}
        <div className={styles.auctionBanner}>
          <span className={styles.auctionLabel}>Coming up</span>
          <p className={styles.auctionText}>
            The auction ends on <strong>4th&nbsp;of&nbsp;April&nbsp;at&nbsp;20:00.</strong>
          </p>
          <div className={styles.countdown}>
            <div className={styles.countdownItem}>
              <div className={styles.countdownValue}>{String(timeLeft.days).padStart(2, '0')}</div>
              <div className={styles.countdownLabel}>Days</div>
            </div>
            <div className={styles.countdownItem}>
              <div className={styles.countdownValue}>{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className={styles.countdownLabel}>Hours</div>
            </div>
            <div className={styles.countdownItem}>
              <div className={styles.countdownValue}>
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <div className={styles.countdownLabel}>Minutes</div>
            </div>
            <div className={styles.countdownItem}>
              <div className={styles.countdownValue}>
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <div className={styles.countdownLabel}>Seconds</div>
            </div>
          </div>
        </div>

        <div className={styles.socialLinks}>
          <a
            href="https://www.instagram.com/footballshirt.market"
            className={styles.socialBtn}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Volg ons op Instagram (opent in nieuw tabblad)"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            @footballshirt.market
          </a>
          <a
            href="https://www.tiktok.com/@innofoot"
            className={styles.socialBtn}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Volg ons op TikTok (opent in nieuw tabblad)"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
            </svg>
            @innofoot
          </a>
        </div>
      </Card>
    </div>
  );
}

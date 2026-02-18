'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Input from '@/components/Input';
import styles from './PredictionForm.module.css';

interface FormErrors {
  teamA?: string;
  teamB?: string;
  firstGoalMinute?: string;
  email?: string;
  general?: string;
}

export default function PredictionForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<FormErrors>({});
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const rawEmail = (data.get('email') as string).trim();
    const rawTeamA = (data.get('teamA') as string).trim();
    const rawTeamB = (data.get('teamB') as string).trim();
    const rawFirstGoalMinute = (data.get('firstGoalMinute') as string).trim();
    const honeypot = (data.get('website') as string | null) ?? '';

    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!rawEmail || !emailRegex.test(rawEmail)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    const teamA = parseInt(rawTeamA, 10);
    const teamB = parseInt(rawTeamB, 10);
    const firstGoalMinute = rawFirstGoalMinute ? parseInt(rawFirstGoalMinute, 10) : undefined;
    if (isNaN(teamA) || teamA < 0 || teamA > 20) {
      newErrors.teamA = 'Score must be between 0 and 20.';
    }
    if (isNaN(teamB) || teamB < 0 || teamB > 20) {
      newErrors.teamB = 'Score must be between 0 and 20.';
    }
    if (
      rawFirstGoalMinute &&
      (isNaN(firstGoalMinute) || firstGoalMinute < 0 || firstGoalMinute > 120)
    ) {
      newErrors.firstGoalMinute = 'Minute must be between 0 and 120.';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setIsPending(true);

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: rawEmail, teamA, teamB, firstGoalMinute, website: honeypot }),
      });

      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        setErrors({ general: json?.error ?? 'Something went wrong. Please try again.' });
        setIsPending(false);
        return;
      }

      router.push('/thanks');
    } catch {
      setErrors({ general: 'Network error. Please check your connection and try again.' });
      setIsPending(false);
    }
  }

  return (
    <Card>
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

      {/* Match pairing */}
      <div className={styles.matchBadge} aria-label="Match: Team A versus Team B">
        <span className={styles.teamName}>RSC Anderlecht</span>
        <span className={styles.vs}>vs</span>
        <span className={styles.teamName}>OH Leuven</span>
      </div>

      {/* Headline */}
      <h1 className={styles.headline}>Guess the score.</h1>
      <p className={styles.subtitle}>Submit your final score prediction to enter.</p>

      <form
        onSubmit={handleSubmit}
        noValidate
        className={styles.form}
        aria-label="Score prediction form"
      >
        {/* Honeypot - hidden from real users, bots fill it in */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ display: 'none' }}
        />

        {/* Score row */}
        <fieldset className={styles.scoreFieldset}>
          <legend className={styles.scoreLabel}>Final score</legend>
          <div className={styles.scoreRow}>
            <Input
              id="teamA"
              name="teamA"
              label="RSC Anderlecht"
              type="number"
              inputMode="numeric"
              min={0}
              max={20}
              error={errors.teamA}
              required
            />
            <span className={styles.scoreDash} aria-hidden="true">
              &mdash;
            </span>
            <Input
              id="teamB"
              name="teamB"
              label="OH Leuven"
              type="number"
              inputMode="numeric"
              min={0}
              max={20}
              error={errors.teamB}
              required
            />
          </div>
        </fieldset>

        {/* First goal minute */}
        <Input
          id="firstGoalMinute"
          name="firstGoalMinute"
          label="In welke minuut valt de eerste goal?"
          type="number"
          inputMode="numeric"
          min={0}
          max={120}
          error={errors.firstGoalMinute}
        />

        {/* Email */}
        <Input
          id="email"
          name="email"
          label="Email address"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="your@email.com"
          error={errors.email}
          required
        />
        <p className={styles.consent} id="email-consent">
          We&apos;ll only use your email to share the auction announcement.
        </p>

        {errors.general && (
          <p role="alert" className={styles.generalError}>
            {errors.general}
          </p>
        )}

        <Button type="submit" disabled={isPending} aria-busy={isPending}>
          {isPending ? 'Submitting...' : 'Submit my guess'}
        </Button>
        <p className={styles.terms}>
          By submitting, you agree to the{' '}
          <a
            href="https://www.innofoot.be/policies/terms-of-service"
            className={styles.termsLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            terms and conditions
          </a>
          .
        </p>
      </form>
    </Card>
  );
}

'use client';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations();
  return (
    <div>
      <h2>{t('aboutTitle')}</h2>
      <div
        style={{
          position: 'relative',
          height: '16vw',
          width: '22vw',
          paddingLeft: '40%',
        }}
      >
        <Image
          src="/photo_2025-07-26_16-06-02.jpg"
          alt="My photo"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div
        style={{
          padding: '2vw',
        }}
      >
        <p> {t('aboutIntro')} </p>
        <p>{t('aboutEducation')}</p>

        <p>{t('aboutCodingExperience')}</p>

        <p>{t('aboutCourseExperience')}</p>

        <p>{t('aboutHobbies')}</p>

        <p>{t('aboutGoals')}</p>
      </div>
    </div>
  );
}

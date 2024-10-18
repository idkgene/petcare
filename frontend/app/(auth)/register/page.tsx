'use client'

import { useState } from 'react'
import { Metadata } from 'next'

import { RegisterForm, SuccessMessage } from '../../../widgets/Register'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Page Title',
    description: 'Page description',
    openGraph: {
      title: 'Open Graph Title',
      description: 'Open Graph Description',
      url: 'https://www.example.com/page',
      siteName: 'Site Name',
      images: [
        {
          url: 'https://www.example.com/og-image.jpg',
          width: 800,
          height: 600,
          alt: 'Og Image Alt',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Twitter Title',
      description: 'Twitter Description',
      creator: '@username',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default function RegisterPage() {
  const [registrationSuccess, setRegistrationSuccess] = useState(false)

  if (registrationSuccess) {
    return <SuccessMessage />
  }

  return <RegisterForm onSuccess={() => setRegistrationSuccess(true)} />
}

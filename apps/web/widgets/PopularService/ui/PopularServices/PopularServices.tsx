'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from '@pc/ui/components/ui/Card'
import { Button } from '@pc/ui/components/ui/Button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@pc/ui/components/ui/Tooltip'
import { InfoIcon } from 'lucide-react'
import Image from 'next/image'

interface Service {
  id: number
  name: string
  description: string
  price: number
  info: string
}

const featuredServices: Service[] = [
  {
    id: 1,
    name: 'Ветеринарный осмотр',
    description: 'Комплексный осмотр вашего питомца',
    price: 1500,
    info: 'Включает проверку общего состояния здоровья, вакцинацию и консультацию.',
  },
  {
    id: 2,
    name: 'Стрижка собак',
    description: 'Профессиональный груминг для вашего друга',
    price: 2000,
    info: 'Стрижка, мытье, сушка и укладка шерсти вашего питомца.',
  },
  {
    id: 3,
    name: 'Вакцинация',
    description: 'Защитите вашего питомца от болезней',
    price: 1000,
    info: 'Вакцинация против распространенных заболеваний собак.',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function PopularServices() {
  const [dogImages, setDogImages] = useState<string[]>([])

  useEffect(() => {
    const fetchDogImages = async () => {
      try {
        const images = await Promise.all(
          featuredServices.map(async () => {
            const response = await fetch(
              'https://dog.ceo/api/breeds/image/random',
            )
            const data = await response.json()
            return data.message
          }),
        )
        setDogImages(images)
      } catch (error) {
        console.error('Error fetching dog images:', error)
      }
    }

    fetchDogImages()
  }, [])

  return (
    <section
      className="w-full py-16 md:py-24 bg-gradient-to-b from-background to-muted"
      aria-labelledby="popular-services-title"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <h2
          id="popular-services-title"
          className="text-3xl font-semibold tracking-tight mb-8 text-center"
        >
          Популярные услуги
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service, index) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col overflow-hidden shadow-sm transition-shadow duration-300 hover:shadow-md">
                <CardHeader className="p-0">
                  <div className="relative w-full pt-[56.25%] overflow-hidden">
                    {dogImages[index] && (
                      <Image
                        width={400}
                        height={225}
                        src={dogImages[index]}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <CardTitle className="absolute bottom-4 left-4 text-white text-xl font-medium">
                      {service.name}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {service.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-2xl font-semibold text-primary">
                      {service.price} ₽
                    </p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Дополнительная информация"
                          >
                            <InfoIcon className="h-5 w-5 text-gray-400" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{service.info}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardContent>
                <CardFooter className="p-4">
                  <Button
                    className="w-full"
                    variant="default"
                  >
                    Записаться
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

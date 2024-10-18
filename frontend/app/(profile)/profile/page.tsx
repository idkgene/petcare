'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../../../../shared/ui/button'
import { Input } from '../../../../shared/ui/input'
import { Label } from '../../../../shared/ui/label'
import { Textarea } from '../../../../shared/ui/textarea'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../../shared/ui/card'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../../../shared/ui/avatar'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../../shared/ui/tabs'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../../../shared/ui/select'
import { Switch } from '../../../../shared/ui/switch'
import { Badge } from '../../../../shared/ui/badge'
import { Progress } from '../../../../shared/ui/progress'
import { Calendar } from '../../../../shared/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../../shared/ui/popover'
import { ScrollArea } from '../../../../shared/ui/scroll-area'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../../../shared/ui/alert-dialog'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../../../shared/ui/accordion'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import {
  CalendarIcon,
  PlusCircle,
  Trash2,
  Edit,
  Save,
  X,
  Camera,
  Lock,
  Mail,
  Phone,
  Calendar as CalendarIcon2,
  Activity,
  Award,
  Heart,
} from 'lucide-react'
import { Metadata } from 'next'

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

// Type for user profile data
type UserProfileData = {
  name: string
  email: string
  avatar: string
  phone: string
  address: string
  bio: string
  memberSince: string
  totalAppointments: number
  loyaltyPoints: number
}

// Type for pet data
type PetData = {
  id: number
  name: string
  type: string
  breed: string
  age: number | string // Age can be entered as a string (e.g., from form input) or stored as a number
  avatar: string
  health: number
  lastCheckup: string
}

// Type for appointment data
type AppointmentData = {
  id: number
  service: string
  date: string
  time: string
  status: string
  pet: string
}

// Type for new pet form (age might be initially an empty string)
type NewPetData = {
  name: string
  type: string
  breed: string
  age: string
}

// Мок-данные для демонстрации
const user = {
  name: 'Анна Петрова',
  email: 'anna@example.com',
  avatar: '/placeholder.svg?height=100&width=100',
  phone: '+7 (999) 123-45-67',
  address: 'г. Москва, ул. Пушкина, д. 10',
  bio: 'Любительница животных и природы. Счастливая хозяйка двух собак и кошки.',
  memberSince: '2021-03-15',
  totalAppointments: 15,
  loyaltyPoints: 250,
}

const pets = [
  {
    id: 1,
    name: 'Барсик',
    type: 'Кот',
    breed: 'Сибирская кошка',
    age: 3,
    avatar: '/placeholder.svg?height=50&width=50',
    health: 95,
    lastCheckup: '2024-05-01',
  },
  {
    id: 2,
    name: 'Рекс',
    type: 'Собака',
    breed: 'Немецкая овчарка',
    age: 5,
    avatar: '/placeholder.svg?height=50&width=50',
    health: 88,
    lastCheckup: '2024-04-15',
  },
]

const appointments = [
  {
    id: 1,
    service: 'Ветеринарный осмотр',
    date: '2024-06-15',
    time: '10:00',
    status: 'Предстоит',
    pet: 'Барсик',
  },
  {
    id: 2,
    service: 'Стрижка',
    date: '2024-06-10',
    time: '14:30',
    status: 'Завершено',
    pet: 'Рекс',
  },
]

const recentActivities = [
  {
    id: 1,
    type: 'appointment',
    description: 'Запись на прием',
    date: '2024-06-01',
  },
  { id: 2, type: 'purchase', description: 'Покупка корма', date: '2024-05-28' },
  { id: 3, type: 'review', description: 'Оставлен отзыв', date: '2024-05-25' },
]

export default function UserProfile() {
  const [userData, setUserData] = useState<UserProfileData>(user)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [userPets, setUserPets] = useState<PetData[]>(pets)
  const [userAppointments, setUserAppointments] =
    useState<AppointmentData[]>(appointments)
  const [newPet, setNewPet] = useState<NewPetData>({
    name: '',
    type: '',
    breed: '',
    age: '',
  })
  const [editMode, setEditMode] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isAvatarHovered, setIsAvatarHovered] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = () => {
    // Здесь будет логика сохранения данных на сервере
    setEditMode(false)
  }

  const handleAddPet = () => {
    if (newPet.name && newPet.type) {
      setUserPets([
        ...userPets,
        {
          ...newPet,
          id: userPets.length + 1,
          avatar: '/placeholder.svg?height=50&width=50',
          health: 100,
          lastCheckup: format(new Date(), 'yyyy-MM-dd'),
        },
      ])
      setNewPet({ name: '', type: '', breed: '', age: '' })
    }
  }

  const handleDeletePet = (id: number) => {
    setUserPets(userPets.filter((pet) => pet.id !== id))
  }

  const handleDeleteAppointment = (id: number) => {
    setUserAppointments(userAppointments.filter((app) => app.id !== id))
  }

  const calculateLoyaltyLevel = (points: number) => {
    if (points < 100) return 'Бронзовый'
    if (points < 250) return 'Серебряный'
    if (points < 500) return 'Золотой'
    return 'Платиновый'
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <h1 className="text-4xl font-bold">
          Добро пожаловать, {userData.name}!
        </h1>
        <Badge
          variant="secondary"
          className="text-lg px-3 py-1"
        >
          {calculateLoyaltyLevel(userData.loyaltyPoints)} уровень
        </Badge>
      </motion.div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-5">
          <TabsTrigger value="dashboard">Обзор</TabsTrigger>
          <TabsTrigger value="personal">Профиль</TabsTrigger>
          <TabsTrigger value="pets">Питомцы</TabsTrigger>
          <TabsTrigger value="appointments">Записи</TabsTrigger>
          <TabsTrigger
            value="settings"
            className="hidden lg:block"
          >
            Настройки
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TabsContent value="dashboard">
              <Card>
                <CardHeader>
                  <CardTitle>Панель управления</CardTitle>
                  <CardDescription>
                    Обзор вашей активности и статистики
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Всего записей
                        </CardTitle>
                        <CalendarIcon2 className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {userData.totalAppointments}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Баллы лояльности
                        </CardTitle>
                        <Award className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {userData.loyaltyPoints}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Питомцы
                        </CardTitle>
                        <Heart className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {userPets.length}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          С нами с
                        </CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {format(new Date(userData.memberSince), 'MMM yyyy', {
                            locale: ru,
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Card className="col-span-1">
                      <CardHeader>
                        <CardTitle>Ближайшие записи</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-[200px]">
                          {userAppointments
                            .filter((app) => app.status === 'Предстоит')
                            .map((app) => (
                              <div
                                key={app.id}
                                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                              >
                                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                                <div className="space-y-1">
                                  <p className="text-sm font-medium leading-none">
                                    {app.service}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {format(new Date(app.date), 'dd MMM yyyy', {
                                      locale: ru,
                                    })}
                                    , {app.time}
                                  </p>
                                  <Badge variant="outline">{app.pet}</Badge>
                                </div>
                              </div>
                            ))}
                        </ScrollArea>
                      </CardContent>
                    </Card>
                    <Card className="col-span-1">
                      <CardHeader>
                        <CardTitle>Недавняя активность</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-[200px]">
                          {recentActivities.map((activity) => (
                            <div
                              key={activity.id}
                              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                            >
                              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-green-500" />
                              <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                  {activity.description}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {format(
                                    new Date(activity.date),
                                    'dd MMM yyyy',
                                    { locale: ru },
                                  )}
                                </p>
                              </div>
                            </div>
                          ))}
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Личная информация</CardTitle>
                  <CardDescription>
                    Управляйте вашей личной информацией и данными профиля
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="relative">
                      <Avatar className="w-24 h-24">
                        <AvatarImage
                          src={userData.avatar}
                          alt={userData.name}
                        />
                        <AvatarFallback>{userData.name[0]}</AvatarFallback>
                      </Avatar>
                      {editMode && (
                        <div
                          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full cursor-pointer transition-opacity duration-200"
                          onMouseEnter={() => setIsAvatarHovered(true)}
                          onMouseLeave={() => setIsAvatarHovered(false)}
                        >
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isAvatarHovered ? 1 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Camera className="text-white" />
                          </motion.div>
                        </div>
                      )}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{userData.name}</h2>
                      <p className="text-muted-foreground">{userData.email}</p>
                    </div>
                    {!editMode && (
                      <Button
                        variant="outline"
                        onClick={() => setEditMode(true)}
                      >
                        <Edit className="mr-2 h-4 w-4" /> Редактировать
                      </Button>
                    )}
                  </div>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Имя</Label>
                        <Input
                          id="name"
                          name="name"
                          value={userData.name}
                          onChange={handleInputChange}
                          disabled={!editMode}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={userData.email}
                          onChange={handleInputChange}
                          disabled={!editMode}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Телефон</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={userData.phone}
                          onChange={handleInputChange}
                          disabled={!editMode}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Адрес</Label>
                        <Input
                          id="address"
                          name="address"
                          value={userData.address}
                          onChange={handleInputChange}
                          disabled={!editMode}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">О себе</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={userData.bio}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        rows={4}
                      />
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  {editMode && (
                    <div className="flex space-x-2">
                      <Button onClick={handleSaveProfile}>
                        <Save className="mr-2 h-4 w-4" /> Сохранить
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setEditMode(false)}
                      >
                        <X className="mr-2 h-4 w-4" /> Отмена
                      </Button>
                    </div>
                  )}
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="pets">
              <Card>
                <CardHeader>
                  <CardTitle>Мои питомцы</CardTitle>
                  <CardDescription>
                    Управляйте информацией о ваших питомцах
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {userPets.map((pet) => (
                      <Accordion
                        type="single"
                        collapsible
                        key={pet.id}
                      >
                        <AccordionItem value={`pet-${pet.id}`}>
                          <AccordionTrigger>
                            <div className="flex items-center space-x-4">
                              <Avatar>
                                <AvatarImage
                                  src={pet.avatar}
                                  alt={pet.name}
                                />
                                <AvatarFallback>{pet.name[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold">{pet.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {pet.type}, {pet.breed}
                                </p>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="pt-4 space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Возраст</Label>
                                  <p>{pet.age} лет</p>
                                </div>
                                <div>
                                  <Label>Последний осмотр</Label>
                                  <p>
                                    {format(
                                      new Date(pet.lastCheckup),
                                      'dd MMM yyyy',
                                      { locale: ru },
                                    )}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <Label>Состояние здоровья</Label>
                                <div className="flex items-center space-x-2">
                                  <Progress
                                    value={pet.health}
                                    className="w-full"
                                  />
                                  <span>{pet.health}%</span>
                                </div>
                              </div>
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline">Редактировать</Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="destructive">
                                      Удалить
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Вы уверены?
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Это действие нельзя отменить. Вы
                                        действительно хотите удалить информацию
                                        о питомце {pet.name}?
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        Отмена
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleDeletePet(pet.id)}
                                      >
                                        Удалить
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ))}
                  </div>
                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">
                      Добавить нового питомца
                    </h3>
                    <div className="space-y-2">
                      <Input
                        placeholder="Имя питомца"
                        value={newPet.name}
                        onChange={(e) =>
                          setNewPet({ ...newPet, name: e.target.value })
                        }
                      />
                      <Select
                        value={newPet.type}
                        onValueChange={(value) =>
                          setNewPet({ ...newPet, type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите тип" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Выберите тип</SelectLabel>
                            <SelectItem value="Кот">Кот</SelectItem>
                            <SelectItem value="Собака">Собака</SelectItem>
                            <SelectItem value="Птица">Птица</SelectItem>
                            <SelectItem value="Грызун">Грызут</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Порода"
                        value={newPet.breed}
                        onChange={(e) =>
                          setNewPet({ ...newPet, breed: e.target.value })
                        }
                      />
                      <Input
                        placeholder="Возраст"
                        type="number"
                        value={newPet.age}
                        onChange={(e) =>
                          setNewPet({ ...newPet, age: e.target.value })
                        }
                      />
                      <Button onClick={handleAddPet}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Добавить питомца
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appointments">
              <Card>
                <CardHeader>
                  <CardTitle>Мои записи</CardTitle>
                  <CardDescription>
                    Управляйте вашими записями на услуги
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-center justify-between p-4 bg-muted rounded-lg"
                      >
                        <div>
                          <h3 className="font-semibold">
                            {appointment.service}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {format(
                              new Date(appointment.date),
                              'dd MMMM yyyy',
                              { locale: ru },
                            )}
                            , {appointment.time}
                          </p>
                          <Badge
                            variant="outline"
                            className="mt-1"
                          >
                            {appointment.pet}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={
                              appointment.status === 'Предстоит'
                                ? 'default'
                                : 'secondary'
                            }
                          >
                            {appointment.status}
                          </Badge>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="destructive"
                                size="icon"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Это действие нельзя отменить. Вы действительно
                                  хотите удалить запись на {appointment.service}
                                  ?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Отмена</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    handleDeleteAppointment(appointment.id)
                                  }
                                >
                                  Удалить
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">
                      Запланировать новую запись
                    </h3>
                    <div className="space-y-2">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите услугу" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Выберите услугу</SelectLabel>
                            <SelectItem value="Ветеринарный осмотр">
                              Ветеринарный осмотр
                            </SelectItem>
                            <SelectItem value="Стрижка">Стрижка</SelectItem>
                            <SelectItem value="Вакцинация">
                              Вакцинация
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите питомца" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Выберите питомца</SelectLabel>
                            {userPets.map((pet) => (
                              <SelectItem
                                key={pet.id}
                                value={pet.name}
                              >
                                {pet.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? (
                              format(selectedDate, 'PPP', { locale: ru })
                            ) : (
                              <span>Выберите дату</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите время" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Выберите время</SelectLabel>
                            <SelectItem value="09:00">09:00</SelectItem>
                            <SelectItem value="10:00">10:00</SelectItem>
                            <SelectItem value="11:00">11:00</SelectItem>
                            <SelectItem value="12:00">12:00</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <Button className="w-full">
                        <PlusCircle className="mr-2 h-4 w-4" /> Запланировать
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Настройки аккаунта</CardTitle>
                  <CardDescription>
                    Управляйте настройками вашего аккаунта
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="notifications">Уведомления</Label>
                        <p className="text-sm text-muted-foreground">
                          Получать уведомления о новых сообщениях и записях
                        </p>
                      </div>
                      <Switch id="notifications" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="newsletter">Рассылка</Label>
                        <p className="text-sm text-muted-foreground">
                          Подписаться на нашу еженедельную рассылку
                        </p>
                      </div>
                      <Switch id="newsletter" />
                    </div>
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full"
                    >
                      <AccordionItem value="security">
                        <AccordionTrigger>Безопасность</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            <Button
                              variant="outline"
                              className="w-full justify-start"
                            >
                              <Lock className="mr-2 h-4 w-4" /> Изменить пароль
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full justify-start"
                            >
                              <Mail className="mr-2 h-4 w-4" /> Изменить email
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full justify-start"
                            >
                              <Phone className="mr-2 h-4 w-4" /> Двухфакторная
                              аутентификация
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="privacy">
                        <AccordionTrigger>Конфиденциальность</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="profile-visibility">
                                Видимость профиля
                              </Label>
                              <Switch id="profile-visibility" />
                            </div>
                            <div className="flex items-center justify-between">
                              <Label htmlFor="data-sharing">
                                Обмен данными
                              </Label>
                              <Switch id="data-sharing" />
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    <div className="pt-4">
                      <h3 className="font-semibold mb-2">Удаление аккаунта</h3>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive">Удалить аккаунт</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Это действие нельзя отменить. Оно навсегда удалит
                              ваш аккаунт и всю связанную с ним информацию.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Отмена</AlertDialogCancel>
                            <AlertDialogAction>
                              Удалить аккаунт
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </div>
  )
}
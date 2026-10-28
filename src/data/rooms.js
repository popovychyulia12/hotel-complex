
export const rooms = [
  {
    id: 1,
    name: 'Стандарт двомісний',
    price: 1800,
    guests: 2,
    status: 'Доступний',
    quantity: 6,
    roomNumbers: [109, 110, 111, 112, 113, 114],

    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=85',

    gallery: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=85',
    ],

    description:
      'Затишний двомісний номер із комфортним ліжком та всім необхідним для приємного відпочинку.',
  },

  {
    id: 2,
    name: 'Люкс',
    price: 3200,
    guests: 2,
    status: 'Доступний',
    quantity: 4,
    roomNumbers: [205, 206, 207, 208],

    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=85',

    gallery: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=85',
    ],

    description:
      'Просторий номер підвищеного комфорту з елегантним інтер’єром для особливого відпочинку.',
  },

  {
    id: 3,
    name: 'Сімейний',
    price: 4000,
    guests: 4,
    status: 'Доступний',
    quantity: 3,
    roomNumbers: [301, 302, 303],

    image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=85',

    gallery: [
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=85',
    ],

    description:
      'Просторий сімейний номер для комфортного проживання до чотирьох гостей.',
  },

  {
    id: 4,
    name: 'Стандарт одномісний',
    price: 1200,
    guests: 1,
    status: 'Доступний',
    quantity: 8,
    roomNumbers: [101, 102, 103, 104, 105, 106, 107, 108],

    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=85',

    gallery: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=85',
    ],

    description:
      'Компактний та затишний номер для одного гостя. Ідеальний для коротких подорожей.',
  },

  {
    id: 5,
    name: 'Покращений двомісний',
    price: 2400,
    guests: 2,
    status: 'Доступний',
    quantity: 4,
    roomNumbers: [201, 202, 203, 204],

    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=85',

    gallery: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=85',
    ],

    description:
      'Більше простору, стильний інтер’єр і додатковий комфорт для відпочинку вдвох.',
  },

  {
    id: 6,
    name: 'Люкс Преміум',
    price: 4500,
    guests: 2,
    status: 'Доступний',
    quantity: 2,
    roomNumbers: [209, 210],

    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=85',

    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=85',
    ],

    description:
      'Преміальний номер із вишуканим дизайном та особливою атмосферою затишку.',
  },

  {
    id: 7,
    name: 'Сімейні апартаменти',
    price: 5500,
    guests: 5,
    status: 'Доступний',
    quantity: 2,
    roomNumbers: [304, 305],

    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=85',

    gallery: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1000&q=85',
    ],

    description:
      'Просторі апартаменти для великої родини або компанії до п’яти гостей.',
  },

  {
    id: 8,
    name: 'Президентський люкс',
    price: 8000,
    guests: 4,
    status: 'Доступний',
    quantity: 1,
    roomNumbers: [401],

    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=85',

    gallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=85',
    ],

    description:
      'Ексклюзивний люкс із просторим інтер’єром для незабутнього відпочинку.',
  },
]

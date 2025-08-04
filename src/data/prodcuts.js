// src/data/products.js

export const sampleProducts = [
  // Categoría 1: Electrónicos
  {
    id: '1',
    name: 'Laptop Gamer',
    description: 'Potente laptop para juegos con tarjeta gráfica dedicada',
    price: 1299.99,
    imageUrl: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '1',
    stock: 10,
    rating: 4.5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Smartphone Pro',
    description: 'Último modelo con cámara de 108MP',
    price: 899.99,
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '1',
    stock: 15,
    rating: 4.8,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: 'Smart TV 65"',
    description: 'Televisor inteligente 4K con HDR y streaming integrado',
    price: 799.99,
    imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '1',
    stock: 8,
    rating: 4.6,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Categoría 2: Accesorios
  {
    id: '4',
    name: 'Auriculares Inalámbricos',
    description: 'Sonido envolvente con cancelación de ruido',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '2',
    stock: 25,
    rating: 4.7,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '5',
    name: 'Cargador Inalámbrico',
    description: 'Carga rápida compatible con todos los dispositivos Qi',
    price: 39.99,
    imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '2',
    stock: 50,
    rating: 4.3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '6',
    name: 'Cable USB-C Premium',
    description: 'Cable de alta velocidad con transferencia de datos ultrarrápida',
    price: 24.99,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '2',
    stock: 75,
    rating: 4.4,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Categoría 3: Computación
  {
    id: '7',
    name: 'Monitor Gaming 27"',
    description: 'Monitor curvo 144Hz con tecnología FreeSync',
    price: 349.99,
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '3',
    stock: 12,
    rating: 4.6,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '8',
    name: 'Teclado Mecánico RGB',
    description: 'Switches Cherry MX con iluminación personalizable',
    price: 129.99,
    imageUrl: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '3',
    stock: 20,
    rating: 4.8,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '9',
    name: 'Mouse Gaming Inalámbrico',
    description: 'Sensor óptico de alta precisión con 7 botones programables',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '3',
    stock: 30,
    rating: 4.5,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Categoría 4: Smartphones
  {
    id: '10',
    name: 'iPhone Pro Max',
    description: 'Smartphone premium con chip A17 Pro y cámara de 48MP',
    price: 1199.99,
    imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '4',
    stock: 18,
    rating: 4.9,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '11',
    name: 'Samsung Galaxy Ultra',
    description: 'Android flagship con S Pen y zoom 100x',
    price: 1099.99,
    imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '4',
    stock: 22,
    rating: 4.7,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '12',
    name: 'Google Pixel Pro',
    description: 'Experiencia Android pura con IA avanzada en fotografía',
    price: 899.99,
    imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '4',
    stock: 15,
    rating: 4.6,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Categoría 5: Audio
  {
    id: '13',
    name: 'Altavoz Bluetooth Premium',
    description: 'Sonido 360° resistente al agua con 20h de batería',
    price: 149.99,
    imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '5',
    stock: 35,
    rating: 4.4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '14',
    name: 'Auriculares Studio',
    description: 'Audifonos profesionales para producción musical',
    price: 299.99,
    imageUrl: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '5',
    stock: 18,
    rating: 4.8,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '15',
    name: 'Micrófono USB Podcast',
    description: 'Micrófono de condensador para streaming y grabación',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '5',
    stock: 25,
    rating: 4.5,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Categoría 6: Gaming
  {
    id: '16',
    name: 'PlayStation 5',
    description: 'Consola de nueva generación con gráficos 4K y ray tracing',
    price: 499.99,
    imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '6',
    stock: 5,
    rating: 4.9,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '17',
    name: 'Xbox Series X',
    description: 'La consola Xbox más potente con retrocompatibilidad',
    price: 499.99,
    imageUrl: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '6',
    stock: 7,
    rating: 4.8,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '18',
    name: 'Silla Gaming Ergonómica',
    description: 'Silla profesional con soporte lumbar y reposabrazos 4D',
    price: 299.99,
    imageUrl: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '6',
    stock: 12,
    rating: 4.6,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Categoría 7: Tablets
  {
    id: '19',
    name: 'iPad Pro 12.9"',
    description: 'Tablet profesional con chip M2 y pantalla Liquid Retina XDR',
    price: 1099.99,
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '7',
    stock: 14,
    rating: 4.8,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '20',
    name: 'Samsung Galaxy Tab S9',
    description: 'Tablet Android premium con S Pen incluido',
    price: 799.99,
    imageUrl: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '7',
    stock: 20,
    rating: 4.6,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '21',
    name: 'Microsoft Surface Pro',
    description: 'Tablet 2 en 1 con Windows 11 y teclado desmontable',
    price: 999.99,
    imageUrl: 'https://images.unsplash.com/photo-1585695817290-0fe2b42be051?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '7',
    stock: 16,
    rating: 4.5,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Categoría 8: Smartwatch
  {
    id: '22',
    name: 'Apple Watch Ultra',
    description: 'Reloj inteligente resistente con GPS y monitoreo de salud',
    price: 799.99,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '8',
    stock: 25,
    rating: 4.7,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '23',
    name: 'Samsung Galaxy Watch',
    description: 'Smartwatch con Wear OS y monitoreo de actividad 24/7',
    price: 329.99,
    imageUrl: 'https://images.unsplash.com/photo-1579586337278-3f436f25d4d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '8',
    stock: 30,
    rating: 4.4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '24',
    name: 'Fitbit Versa',
    description: 'Pulsera fitness con GPS y análisis del sueño',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '8',
    stock: 40,
    rating: 4.3,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Categoría 9: Cámaras
  {
    id: '25',
    name: 'Canon EOS R5',
    description: 'Cámara mirrorless profesional con video 8K',
    price: 3899.99,
    imageUrl: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '9',
    stock: 6,
    rating: 4.9,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '26',
    name: 'Sony Alpha A7 IV',
    description: 'Cámara full-frame con estabilización de imagen en 5 ejes',
    price: 2499.99,
    imageUrl: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '9',
    stock: 8,
    rating: 4.8,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '27',
    name: 'GoPro Hero 12',
    description: 'Cámara de acción 4K ultracompacta y resistente',
    price: 399.99,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '9',
    stock: 22,
    rating: 4.6,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Categoría 10: Televisores
  {
    id: '28',
    name: 'LG OLED 55"',
    description: 'TV OLED 4K con Dolby Vision y webOS inteligente',
    price: 1299.99,
    imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '10',
    stock: 10,
    rating: 4.8,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '29',
    name: 'Samsung QLED 65"',
    description: 'Smart TV con tecnología Quantum Dot y HDR10+',
    price: 1599.99,
    imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '10',
    stock: 8,
    rating: 4.7,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '30',
    name: 'Sony Bravia XR 75"',
    description: 'TV premium con procesador cognitivo XR y Google TV',
    price: 2299.99,
    imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '10',
    stock: 5,
    rating: 4.9,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Categoría 11: Hogar Inteligente
  {
    id: '31',
    name: 'Amazon Echo Dot',
    description: 'Altavoz inteligente con Alexa y control por voz',
    price: 49.99,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-a0a5c3988c1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '11',
    stock: 60,
    rating: 4.4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '32',
    name: 'Philips Hue Kit',
    description: 'Kit de bombillas inteligentes RGB con control remoto',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-a0a5c3988c1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '11',
    stock: 35,
    rating: 4.6,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '33',
    name: 'Ring Video Doorbell',
    description: 'Timbre inteligente con cámara HD y detección de movimiento',
    price: 99.99,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-a0a5c3988c1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '11',
    stock: 28,
    rating: 4.3,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Categoría 12: Almacenamiento
  {
    id: '34',
    name: 'SSD Samsung 1TB',
    description: 'Disco sólido interno con velocidades de hasta 7000 MB/s',
    price: 149.99,
    imageUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '12',
    stock: 45,
    rating: 4.7,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '35',
    name: 'Disco Duro Externo 2TB',
    description: 'HDD portátil USB 3.0 con cifrado por hardware',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '12',
    stock: 32,
    rating: 4.5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '36',
    name: 'Memoria USB 128GB',
    description: 'USB 3.1 de alta velocidad con diseño metálico',
    price: 24.99,
    imageUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '12',
    stock: 80,
    rating: 4.2,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Categoría 13: Redes
  {
    id: '37',
    name: 'Router WiFi 6 Mesh',
    description: 'Sistema mesh tri-banda con cobertura de hasta 500m²',
    price: 299.99,
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '13',
    stock: 18,
    rating: 4.6,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '38',
    name: 'Switch Gigabit 8 Puertos',
    description: 'Switch no administrado con puertos Gigabit Ethernet',
    price: 59.99,
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '13',
    stock: 25,
    rating: 4.4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '39',
    name: 'Cable Ethernet CAT 8',
    description: 'Cable de red de 3 metros con blindaje SFTP',
    price: 19.99,
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '13',
    stock: 50,
    rating: 4.3,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Categoría 14: Impresoras
  {
    id: '40',
    name: 'Impresora Láser Color',
    description: 'Impresora multifunción con WiFi y impresión duplex',
    price: 349.99,
    imageUrl: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '14',
    stock: 12,
    rating: 4.5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '41',
    name: 'Impresora Fotográfica',
    description: 'Impresora inkjet para fotografías con 6 colores',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '14',
    stock: 15,
    rating: 4.4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '42',
    name: 'Escáner Documentos',
    description: 'Escáner de alimentación automática con OCR integrado',
    price: 299.99,
    imageUrl: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '14',
    stock: 8,
    rating: 4.6,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Categoría 15: Componentes PC
  {
    id: '43',
    name: 'Procesador Intel i9',
    description: 'CPU de 16 núcleos para gaming y creación de contenido',
    price: 589.99,
    imageUrl: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '15',
    stock: 15,
    rating: 4.8,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '44',
    name: 'Tarjeta Gráfica RTX 4070',
    description: 'GPU con ray tracing y DLSS 3.0 para 4K gaming',
    price: 799.99,
    imageUrl: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '15',
    stock: 10,
    rating: 4.9,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '45',
    name: 'Memoria RAM 32GB DDR5',
    description: 'Kit de memoria de alta velocidad para gaming extremo',
    price: 299.99,
    imageUrl: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    categoryId: '15',
    stock: 20,
    rating: 4.7,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];
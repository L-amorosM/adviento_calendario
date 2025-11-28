// Advent Calendar Messages - Romantic & Elegant
// Each day contains a heartfelt message, image, and optional gift

export interface AdventDay {
  day: number;
  title: string;
  message: string;
  image: string;
  gift?: string;
}

export const adventMessages: AdventDay[] = [
  {
    day: 1,
    title: "El Comienzo de Algo Mágico",
    message: "Como la primera nevada del invierno, así llegaste tú a mi vida: silenciosamente, transformándolo todo en belleza.",
    image: "/src/assets/day-1.jpg",
    gift: "Una promesa: cada día de diciembre será especial contigo."
  },
  {
    day: 2,
    title: "La Luz en la Oscuridad",
    message: "En las noches más largas del año, tu sonrisa es la luz más cálida que existe.",
    image: "/src/assets/day-2.jpg",
  },
  {
    day: 3,
    title: "Café y Conversaciones",
    message: "Me enamoré de ti en los pequeños momentos: el café de las mañanas, tus historias, tu risa.",
    image: "/src/assets/day-3.jpg",
    gift: "Te prometo mil desayunos más juntos."
  },
  {
    day: 4,
    title: "Regalo Inesperado",
    message: "El mejor regalo que he recibido nunca vino envuelto en papel: fuiste tú.",
    image: "/src/assets/day-4.jpg",
  },
  {
    day: 5,
    title: "Poesía Sin Palabras",
    message: "Hay poemas que no necesitan ser escritos. Los leo cada vez que te miro.",
    image: "/src/assets/day-5.jpg",
  },
  {
    day: 6,
    title: "El Abrazo Perfecto",
    message: "En tus brazos encontré el hogar que no sabía que estaba buscando.",
    image: "/src/assets/day-1.jpg",
    gift: "Un abrazo eterno, siempre que lo necesites."
  },
  {
    day: 7,
    title: "Nuestro Secreto",
    message: "Tenemos un idioma que solo nosotros entendemos: miradas, silencios, sonrisas cómplices.",
    image: "/src/assets/day-2.jpg",
  },
  {
    day: 8,
    title: "La Calma que Traes",
    message: "Contigo el mundo se detiene. En el caos diario, tú eres mi paz.",
    image: "/src/assets/day-3.jpg",
  },
  {
    day: 9,
    title: "Detalles que Enamoran",
    message: "Me enamoro de ti en los detalles: cómo te ríes, cómo piensas, cómo me miras.",
    image: "/src/assets/day-4.jpg",
  },
  {
    day: 10,
    title: "Canciones que Nos Definen",
    message: "Hay canciones que ahora son nuestras. Cada nota me recuerda a ti.",
    image: "/src/assets/day-5.jpg",
    gift: "Nuestra playlist especial para las noches de invierno."
  },
  {
    day: 11,
    title: "Mañanas Contigo",
    message: "Despertar a tu lado es mi forma favorita de comenzar el día.",
    image: "/src/assets/day-1.jpg",
  },
  {
    day: 12,
    title: "Tu Risa",
    message: "Tu risa es el sonido más hermoso que conozco. Podría escucharla eternamente.",
    image: "/src/assets/day-2.jpg",
  },
  {
    day: 13,
    title: "Recuerdos de Oro",
    message: "Cada momento contigo se convierte en un recuerdo dorado que atesoro.",
    image: "/src/assets/day-3.jpg",
  },
  {
    day: 14,
    title: "Conexión Profunda",
    message: "Contigo descubrí que el amor verdadero es cuando dos almas se reconocen.",
    image: "/src/assets/day-4.jpg",
  },
  {
    day: 15,
    title: "Mitad de Camino",
    message: "Ya vamos por la mitad de diciembre, pero mi amor por ti sigue creciendo infinitamente.",
    image: "/src/assets/day-5.jpg",
    gift: "Una promesa: lo mejor está por venir."
  },
  {
    day: 16,
    title: "El Tiempo Contigo",
    message: "Las horas a tu lado vuelan, pero cada segundo vale oro.",
    image: "/src/assets/day-1.jpg",
  },
  {
    day: 17,
    title: "Sueños Compartidos",
    message: "Contigo aprendí que los sueños son más bonitos cuando se sueñan en pareja.",
    image: "/src/assets/day-2.jpg",
  },
  {
    day: 18,
    title: "Tu Mirada",
    message: "En tus ojos encuentro respuestas que ni siquiera sabía que estaba buscando.",
    image: "/src/assets/day-3.jpg",
  },
  {
    day: 19,
    title: "Aventuras Juntos",
    message: "Cada día contigo es una nueva aventura, incluso en la rutina más simple.",
    image: "/src/assets/day-4.jpg",
  },
  {
    day: 20,
    title: "Gracias por Ser Tú",
    message: "Gracias por ser exactamente quien eres. No cambiaría nada de ti.",
    image: "/src/assets/day-5.jpg",
    gift: "Mi amor incondicional, hoy y siempre."
  },
  {
    day: 21,
    title: "La Magia del Invierno",
    message: "El invierno es mágico, pero nada comparado con la magia que hay entre nosotros.",
    image: "/src/assets/day-1.jpg",
  },
  {
    day: 22,
    title: "Última Semana",
    message: "Quedan pocos días para Navidad, pero mi amor por ti no tiene fin.",
    image: "/src/assets/day-2.jpg",
  },
  {
    day: 23,
    title: "Nochebuena de Amor",
    message: "Mañana es Navidad, pero el mejor regalo ya lo tengo: a ti.",
    image: "/src/assets/day-3.jpg",
  },
  {
    day: 24,
    title: "Navidad Juntos",
    message: "Feliz Navidad, mi amor. Que esta sea la primera de muchas que pasemos juntos. Te amo con todo mi corazón.",
    image: "/src/assets/day-4.jpg",
    gift: "Mi corazón, hoy y todos los días del año."
  },
  {
    day: 25,
    title: "El Día Más Especial",
    message: "Hoy es Navidad, y quiero que sepas que eres el regalo más hermoso que la vida me ha dado. Cada momento a tu lado es un tesoro, cada sonrisa tuya ilumina mi mundo, y cada día contigo es una bendición. Este calendario fue solo una pequeña forma de demostrarte lo mucho que significas para mí. Gracias por existir, por amarme, por ser tú. Eres mi hogar, mi paz, mi todo. Te amo infinitamente, hoy y siempre. Feliz Navidad, amor mío.",
    image: "/src/assets/day-5.jpg",
    gift: "Un año entero de amor, sorpresas y momentos inolvidables juntos."
  },
];

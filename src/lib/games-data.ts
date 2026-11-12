export type Tone = "pink" | "sky" | "sun" | "grape" | "leaf" | "cyan" | "sos" | "coral";

/** Paint colors for the drawing board (crayons, not theme colors). */
export const PAINT_COLORS = [
  "#ef4444", "#f97316", "#facc15", "#22c55e", "#06b6d4",
  "#3b82f6", "#a855f7", "#ec4899", "#78350f", "#0f172a",
];

export const LOGIC_LEVELS = [
  { sequence: ["⭐", "❤️", "⭐", "❤️", "⭐"], missing: "❤️", options: ["❤️", "⭐", "🌈", "🎈"] },
  { sequence: ["😊", "😌", "😊", "😌", "😊"], missing: "😌", options: ["😮", "😌", "😡", "😊"] },
  { sequence: ["🎈", "🎈", "🎁", "🎈", "🎈"], missing: "🎁", options: ["⭐", "🎈", "🎁", "🤝"] },
  { sequence: ["🟢", "🟡", "🔴", "🟢", "🟡"], missing: "🔴", options: ["🔵", "🟢", "🔴", "🟣"] },
  { sequence: ["🤝", "👂", "🤝", "👂", "🤝"], missing: "👂", options: ["👂", "👟", "🤝", "👀"] },
  { sequence: ["☀️", "🌧️", "🌈", "☀️", "🌧️"], missing: "🌈", options: ["⚡", "🌈", "☀️", "🌧️"] },
];

export const POSITIVE_WORDS: { text: string; emoji: string; tone: Tone }[] = [
  { text: "Empatía", emoji: "💖", tone: "pink" },
  { text: "Respeto", emoji: "🤝", tone: "sky" },
  { text: "Sonrisa", emoji: "😊", tone: "coral" },
  { text: "Abrazo", emoji: "🧸", tone: "grape" },
  { text: "Paz", emoji: "🕊️", tone: "leaf" },
  { text: "Gratitud", emoji: "🎁", tone: "cyan" },
];

export type Light = "verde" | "amarillo" | "rojo";

export const SEMAFORO_SCENARIOS: { emoji: string; badge: string; text: string; color: Light; feedback: string }[] = [
  { emoji: "🎨", badge: "Solidaridad en el salón", text: "Prestar mis colores a un compañero que olvidó su cartuchera en casa.", color: "verde", feedback: "¡Excelente! La amabilidad y el trabajo en equipo crean un salón alegre y feliz." },
  { emoji: "🏃💨", badge: "Recreo seguro", text: "Empujar en la fila del refrigerio para comprar primero.", color: "rojo", feedback: "¡Alto! Empujar puede lastimar a un amigo. Esperar con calma cuida la armonía." },
  { emoji: "🤐", badge: "Cuidado de emociones", text: "Sentirme triste o preocupado por algo y no contárselo a nadie.", color: "amarillo", feedback: "¡Cuidado! Si algo te pone triste, es genial conversar con tu orientadora escolar o profesores." },
  { emoji: "👂", badge: "Respeto mutuo", text: "Escuchar en silencio cuando un compañero o la maestra está hablando.", color: "verde", feedback: "¡Brillante! Escuchar con el corazón es el mayor gesto de respeto y aprendizaje." },
  { emoji: "🗣️💥", badge: "Resolución pacífica", text: "Burlarme o gritarle a un amigo porque se equivocó en un juego.", color: "rojo", feedback: "¡Detente! Todos estamos aprendiendo y equivocarse es natural. Debemos apoyarnos con cariño." },
  { emoji: "🧹", badge: "Responsabilidad", text: "Dejar los papeles en el suelo porque 'alguien más los recogerá'.", color: "amarillo", feedback: "¡Piénsalo bien! Cuidar nuestro espacio y botar la basura en su lugar ayuda a todo el colegio." },
  { emoji: "🤝", badge: "Humildad y perdón", text: "Pedir disculpas sinceras cuando sin querer tropiezo o incomodo a alguien.", color: "verde", feedback: "¡Magnífico! Decir 'lo siento' demuestra valentía, madurez y empatía." },
];

export const CAR_ITEMS: { text: string; good: boolean; tone: Tone }[] = [
  { text: "Empatía", good: true, tone: "leaf" },
  { text: "Calma", good: true, tone: "cyan" },
  { text: "Respeto", good: true, tone: "grape" },
  { text: "Gritos", good: false, tone: "sos" },
  { text: "Burlas", good: false, tone: "pink" },
];

export const TRAFFIC_STEPS = {
  red: {
    head: "ROJO: Me Detengo",
    desc: "¡Freno de mano! Antes de decir algo impulsivo, respiro hondo y doy una pausa breve.",
    example: "Ejemplo: Si pierdo en un juego, no tiro las piezas; me quedo quieto un momento.",
  },
  yellow: {
    head: "AMARILLO: Pienso",
    desc: "Me pregunto: ¿Cómo se sentirá mi compañero si digo esto? ¿Hay una forma constructiva de pedirlo?",
    example: "Ejemplo: En vez de decir \"¡Qué dibujo tan feo!\", pienso en reconocer su esfuerzo.",
  },
  green: {
    head: "VERDE: Expreso con Amabilidad",
    desc: "¡Adelante! Me comunico con claridad, asertividad y empatía.",
    example: "Ejemplo: \"Yo tengo una idea diferente, ¿podemos probarla juntos?\"",
  },
} as const;

export const PHRASES = [
  { text: "“¡Ese dibujo está horrible, no sabes pintar!”", kind: false, alt: "Mejor decir: “No es mi estilo favorito, pero veo que te esforzaste mucho”." },
  { text: "“¿Me prestas tu borrador por favor al terminar?”", kind: true, alt: "¡Excelente! Pides con cortesía y respetas turnos." },
  { text: "“¡Siempre te equivocas en matemáticas!”", kind: false, alt: "Mejor decir: “Ese ejercicio es retador, ¿lo revisamos juntos?”." },
  { text: "“Me divertí jugando contigo, ¡gracias!”", kind: true, alt: "¡Gran trabajo! Fortaleces la amistad con amabilidad." },
];

export const KIND_CARDS = [
  "“¡Qué bonito te quedó!”",
  "“Me gusta cómo lo hiciste.”",
  "“¿Quieres jugar conmigo?”",
  "“Muchas gracias por tu ayuda.”",
  "“¿En qué te puedo colaborar hoy?”",
  "“¡Buen intento, tú puedes lograrlo!”",
];

/** Random element from a non-empty list. */
export function pick<T>(list: readonly T[]): T {
  return list[Math.floor(Math.random() * list.length)] as T;
}

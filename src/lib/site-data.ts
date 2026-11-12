export type Pillar = { title: string; items: { label: string; text: string }[] };
export type Stage = {
  pill: string;
  title: string;
  intro: string;
  emo: Pillar;
  ins: Pillar;
  att: Pillar;
};

export const STAGES: Stage[] = [
  {
    pill: "🧸 Preescolar (3 a 5 años)",
    title: "Etapa Preescolar (3 a 5 años): Inicio del Autocontrol",
    intro: "Transición activa del control guiado por el adulto al florecimiento del autocontrol y la seguridad afectiva.",
    emo: { title: "Regulación Emocional", items: [
      { label: "Identificación verbal", text: "Nombrar emociones en el instante (\"Estoy enojado\", \"Tengo miedo\")." },
      { label: "Uso de co-regulación", text: "Aceptar el abrazo o guía del adulto en lugar de extender el desborde." },
      { label: "Técnicas corporales lúdicas", text: "Soplar una \"vela mágica\" o inflar el \"globo en la panza\" para disminuir la agitación motora." },
    ] },
    ins: { title: "Instrucciones", items: [
      { label: "Comandos de dos pasos", text: "Órdenes consecutivas (ej: \"Quítate los zapatos y ponlos en la caja\")." },
      { label: "Contacto visual previo", text: "Mirar y asentir antes de arrancar la labor encomendada." },
      { label: "Pictogramas visibles", text: "Guía de tres dibujos consecutivos para aseo o guardar juguetes." },
    ] },
    att: { title: "Focos Atencionales", items: [
      { label: "Atención sostenida inicial", text: "Enfoque guiado de 5 a 10 minutos (rompecabezas, cuentos)." },
      { label: "Filtro de distractores", text: "Mantener el dibujo o juego aun con música suave o juego cercano." },
    ] },
  },
  {
    pill: "🎨 Primaria Baja (6 a 8 años)",
    title: "Primaria Baja (6 a 8 años): Convivencia y Normas Grupales",
    intro: "Integración a la vida académica formal, mayor autonomía individual y respeto constructivo de las normas del aula.",
    emo: { title: "Regulación Emocional", items: [
      { label: "El Semáforo Emocional", text: "Distinguir la luz amarilla (frustración) y tomar pausa antes de la luz roja (ira)." },
      { label: "Tolerancia a la frustración", text: "Aceptar perder en juegos de mesa sin patear ni romper reglas." },
      { label: "Asertividad directa", text: "Decir \"No me gusta que hagas eso, me incomoda\" sin golpear ni empujar." },
    ] },
    ins: { title: "Instrucciones", items: [
      { label: "Comandos de tres pasos", text: "Secuencias escolares (\"Abran cuaderno, copien fecha y saquen lápiz rojo\")." },
      { label: "Parafraseo de chequeo", text: "Repetir en voz alta con sus palabras lo ordenado antes de empezar." },
    ] },
    att: { title: "Focos Atencionales", items: [
      { label: "Atención selectiva", text: "Filtrar el murmullo de pares durante lectura silenciosa." },
      { label: "Alternancia ágil", text: "Pasar la vista y foco del pizarrón al cuaderno con fluidez." },
    ] },
  },
  {
    pill: "🚀 Primaria Alta (9 a 11 años)",
    title: "Primaria Alta (9 a 11 años): Pensamiento Lógico y Empatía",
    intro: "Consolidación de las operaciones lógicas, resolución negociada de conflictos y autoevaluación guiada.",
    emo: { title: "Regulación Emocional", items: [
      { label: "Autoinstrucciones de poder", text: "Cambiar \"no puedo\" por \"es difícil, pero iré paso a paso\"." },
      { label: "Diferenciación anímica", text: "Distinguir tristeza, desilusión y enojo aplicando vías específicas." },
      { label: "Mediación pacífica", text: "Dialogar y llegar a acuerdos ante diferencias en el patio escolar." },
    ] },
    ins: { title: "Instrucciones", items: [
      { label: "Instrucciones escritas densas", text: "Resolver recetas o rúbricas sin lectura del adulto." },
      { label: "Autocorrección con checklist", text: "Cotejar entregas con rúbricas de verificación." },
    ] },
    att: { title: "Focos Atencionales", items: [
      { label: "Atención sostenida extendida", text: "De 20 a 30 minutos de trabajo ininterrumpido en proyectos." },
      { label: "Planificación por bloques", text: "Fragmentar entregas grandes en tareas manejables." },
    ] },
  },
  {
    pill: "🎧 Secundaria (12 a 15 años)",
    title: "Secundaria / Adolescencia Temprana (12 a 15 años): Gestión de Impulsos",
    intro: "Maduración socioafectiva, gestión de la reputación digital, autocontrol y manejo saludable de tensiones.",
    emo: { title: "Regulación Emocional", items: [
      { label: "Freno digital previo", text: "Evaluar consecuencias antes de enviar un mensaje en redes o responder con hostilidad." },
      { label: "Descarga productiva", text: "Practicar deportes, arte o bitácoras para procesar la ansiedad." },
      { label: "Validación interior", text: "Entender que un tropiezo escolar no destruye el valor propio." },
    ] },
    ins: { title: "Instrucciones", items: [
      { label: "Consignas abiertas", text: "Diseñar investigación y cronograma autónomo ante proyectos amplios." },
      { label: "Gestión de plazos", text: "Cumplir entregas escalonadas semanales sin procrastinación." },
    ] },
    att: { title: "Focos Atencionales", items: [
      { label: "Aislamiento de distractores digitales", text: "Celular en cajón o modo estudio sin notificaciones." },
      { label: "Concentración en temas abstractos", text: "Sostener foco de 40 a 45 minutos en clases teóricas." },
    ] },
  },
  {
    pill: "🎓 Bachillerato (16 a 18 años)",
    title: "Bachillerato (16 a 18 años): Metacognición y Proyección Adulta",
    intro: "Autonomía ejecutiva plena, orientación vocacional, templanza ante exámenes y proyectos de vida.",
    emo: { title: "Regulación Emocional", items: [
      { label: "Manejo de la ansiedad futura", text: "Respiración diafragmática, mindfulness y reencuadre cognitivo ante el ICFES y la universidad." },
      { label: "Propósito a largo plazo", text: "Tolerar el esfuerzo presente en aras de la graduación y sueños vocacionales." },
      { label: "Responsabilidad ética", text: "Reparar errores honestamente sin victimismo ni evasión." },
    ] },
    ins: { title: "Instrucciones", items: [
      { label: "Navegación institucional", text: "Acatar normas APA, inscripciones universitarias y convocatorias." },
      { label: "Adaptabilidad inmediata", text: "Ajustar estrategias cuando las directrices cambian imprevistamente." },
    ] },
    att: { title: "Focos Atencionales", items: [
      { label: "Metacognición activa", text: "Detectar dispersión mental y regresar por decisión propia al foco." },
      { label: "Bloques Pomodoro (45-60 min)", text: "Estudio profundo combinado con descansos no tecnológicos." },
    ] },
  },
];

export const FAMILY_TIPS: { title: string; items: string[]; link?: boolean }[] = [
  { title: "1. Control de Impulsos y Regulación", items: [
    "Jugar al Semáforo: rojo detenerse, amarillo pensar y verde actuar serenamente.",
    "Practicar juegos de \"Simón dice\" y \"Estatuas\" (bailar y quedar congelado al cortar la melodía).",
    "Enseñar la técnica de calma: oler una flor imaginaria y soplar la vela suavemente.",
    "Reconocer verbalmente de inmediato cuando logra esperar su turno o refrenar un impulso.",
  ] },
  { title: "2. Focos Atencionales y Concentración", items: [
    "Actividades acotadas de 10 a 15 minutos alternadas con descansos activos.",
    "Juego de \"¿Qué cambió?\": poner objetos en la mesa, tapar los ojos y mover uno de lugar.",
    "Disminuir distractores directos (televisión apagada, celular guardado en la hora de estudio).",
    "Uso de banda elástica en las patas de la silla durante comidas o tareas para autorregulación cinestésica.",
  ] },
  { title: "3. Seguimiento de Instrucciones y Tareas", items: [
    "Instrucciones cortas y progresivas: empezar con una pauta directa y elevar gradualmente a dos o tres.",
    "Parafraseo de chequeo: pedir al estudiante que repita con sus palabras la meta antes de arrancar.",
    "Realizar búsquedas del tesoro con pistas secuenciales y recetas de cocina en familia.",
  ] },
  { title: "4. Límites Claros, Respeto y Convivencia", link: true, items: [
    "Reglas visibles: cartel ilustrado con 3 a 5 acuerdos básicos en casa.",
    "No negociar en crisis: cuando hay desborde emocional, recuperar primero la calma y dialogar solo después.",
    "Resolver conflictos mediante tres pasos respetuosos: escuchar, expresar el sentir propio y proponer solución.",
  ] },
];

export const EVENTIFICA_URL = "https://app.eventifica.com/inicio";

export const COUNSELORS = [
  { name: "Diego Alejandro Tello Briceño", role: "Orientador Escolar y Psicosocial CEDAM", tone: "pink" as const },
  { name: "Lina Sofía Ortiz Ramirez", role: "Orientadora Escolar y Pedagógica CEDAM", tone: "sky" as const },
];

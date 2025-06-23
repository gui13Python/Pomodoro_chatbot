// --- Global Elements ---
const currentTimeElement = document.getElementById('current-time');
const navButtons = document.querySelectorAll('.nav-button');
const tabContents = document.querySelectorAll('.tab-content');

// --- Top Modules Elements ---
const dailyGoalProgressBar = document.querySelector('.module-goal .progress-bar');
const dailyGoalPercentage = document.querySelector('.module-goal .progress-percentage');
const streakDaysElement = document.querySelector('.module-streak .streak-days'); // Adicionado para demonstração
const focusTimeElement = document.querySelector('.module-focus .focus-time'); // Adicionado para demonstração


// --- Pomodoro Elements ---
const pomodoroTimerDisplay = document.getElementById('pomodoro-timer');
const startPomodoroBtn = document.getElementById('start-pomodoro');
const pausePomodoroBtn = document.getElementById('pause-pomodoro');
const resetPomodoroBtn = document.getElementById('reset-pomodoro');
const pomodoroDurationInput = document.getElementById('pomodoro-duration');
const breakDurationInput = document.getElementById('break-duration');

let timer;
let timeLeft;
let isRunning = false;
let isBreak = false;
let currentDuration = 25 * 60; // Default to 25 minutes in seconds

// --- Vocabulary Elements ---
const vocabularyCard = document.querySelector('.vocabulary-card');
const englishWordElement = document.getElementById('english-word');
const englishSentenceElement = document.getElementById('english-sentence');
const portugueseTranslationElement = document.getElementById('portuguese-translation');
const spanishTranslationElement = document.getElementById('spanish-translation');
const flipCardBtn = document.getElementById('flip-card');
const nextCardBtn = document.getElementById('next-card');

let currentCardIndex = 0;
const vocabularyData = [
    // --- Pessoas e Relações ---
    {
        word: "Family",
        sentence: "My family is very important to me.",
        portuguese: "Família",
        spanish: "Familia",
        translation_pt: "Minha família é muito importante para mim.",
        translation_es: "Mi familia es muy importante para mí."
    },
    {
        word: "Friend",
        sentence: "He is my best friend from school.",
        portuguese: "Amigo/a",
        spanish: "Amigo/a",
        translation_pt: "Ele é meu melhor amigo da escola.",
        translation_es: "Él es mi mejor amigo de la escuela."
    },
    {
        word: "Mother",
        sentence: "My mother is a great cook.",
        portuguese: "Mãe",
        spanish: "Madre",
        translation_pt: "Minha mãe é uma ótima cozinheira.",
        translation_es: "Mi madre es una gran cocinera."
    },
    {
        word: "Father",
        sentence: "My father works in an office.",
        portuguese: "Pai",
        spanish: "Padre",
        translation_pt: "Meu pai trabalha em um escritório.",
        translation_es: "Mi padre trabaja en una oficina."
    },
    {
        word: "Brother",
        sentence: "My brother is older than me.",
        portuguese: "Irmão",
        spanish: "Hermano",
        translation_pt: "Meu irmão é mais velho que eu.",
        translation_es: "Mi hermano es mayor que yo."
    },
    {
        word: "Sister",
        sentence: "My sister lives in another city.",
        portuguese: "Irmã",
        spanish: "Hermana",
        translation_pt: "Minha irmã mora em outra cidade.",
        translation_es: "Mi hermana vive en otra ciudad."
    },
    {
        word: "Child",
        sentence: "The child is playing in the park.",
        portuguese: "Criança",
        spanish: "Niño/a",
        translation_pt: "A criança está brincando no parque.",
        translation_es: "El niño/la niña está jugando en el parque."
    },
    {
        word: "Man",
        sentence: "That man is very tall.",
        portuguese: "Homem",
        spanish: "Hombre",
        translation_pt: "Aquele homem é muito alto.",
        translation_es: "Ese hombre es muy alto."
    },
    {
        word: "Woman",
        sentence: "The woman smiled kindly.",
        portuguese: "Mulher",
        spanish: "Mujer",
        translation_pt: "A mulher sorriu gentilmente.",
        translation_es: "La mujer sonrió amablemente."
    },
    {
        word: "People",
        sentence: "Many people enjoy going to the beach.",
        portuguese: "Pessoas",
        spanish: "Gente/Personas",
        translation_pt: "Muitas pessoas gostam de ir à praia.",
        translation_es: "Mucha gente disfruta ir a la playa."
    },

    // --- Ações e Verbos Comuns ---
    {
        word: "Go",
        sentence: "I need to go to the store.",
        portuguese: "Ir",
        spanish: "Ir",
        translation_pt: "Eu preciso ir à loja.",
        translation_es: "Necesito ir a la tienda."
    },
    {
        word: "Come",
        sentence: "Please come to my party.",
        portuguese: "Vir",
        spanish: "Venir",
        translation_pt: "Por favor, venha para minha festa.",
        translation_es: "Por favor, ven a mi fiesta."
    },
    {
        word: "Eat",
        sentence: "I want to eat pizza tonight.",
        portuguese: "Comer",
        spanish: "Comer",
        translation_pt: "Eu quero comer pizza hoje à noite.",
        translation_es: "Quiero comer pizza esta noche."
    },
    {
        word: "Drink",
        sentence: "Would you like to drink some water?",
        portuguese: "Beber",
        spanish: "Beber",
        translation_pt: "Você gostaria de beber um pouco de água?",
        translation_es: "¿Te gustaría beber un poco de agua?"
    },
    {
        word: "Sleep",
        sentence: "I need to sleep early tonight.",
        portuguese: "Dormir",
        spanish: "Dormir",
        translation_pt: "Eu preciso dormir cedo hoje à noite.",
        translation_es: "Necesito dormir temprano esta noche."
    },
    {
        word: "Work",
        sentence: "He works very hard every day.",
        portuguese: "Trabalhar",
        spanish: "Trabajar",
        translation_pt: "Ele trabalha muito duro todos os dias.",
        translation_es: "Él trabaja muy duro todos los días."
    },
    {
        word: "Study",
        sentence: "I study English for an hour every morning.",
        portuguese: "Estudar",
        spanish: "Estudiar",
        translation_pt: "Eu estudo inglês por uma hora toda manhã.",
        translation_es: "Estudio inglés durante una hora todas las mañanas."
    },
    {
        word: "Talk",
        sentence: "Let's talk about your plans.",
        portuguese: "Conversar",
        spanish: "Hablar",
        translation_pt: "Vamos conversar sobre seus planos.",
        translation_es: "Hablemos de tus planes."
    },
    {
        word: "Listen",
        sentence: "Please listen to the instructions carefully.",
        portuguese: "Ouvir",
        spanish: "Escuchar",
        translation_pt: "Por favor, ouça as instruções com atenção.",
        translation_es: "Por favor, escucha las instrucciones con atención."
    },
    {
        word: "See",
        sentence: "Did you see the new movie?",
        portuguese: "Ver",
        spanish: "Ver",
        translation_pt: "Você viu o novo filme?",
        translation_es: "¿Viste la nueva película?"
    },
    {
        word: "Buy",
        sentence: "I need to buy some groceries.",
        portuguese: "Comprar",
        spanish: "Comprar",
        translation_pt: "Eu preciso comprar alguns mantimentos.",
        translation_es: "Necesito comprar algunos comestibles."
    },
    {
        word: "Sell",
        sentence: "They sell fresh fruit at the market.",
        portuguese: "Vender",
        spanish: "Vender",
        translation_pt: "Eles vendem frutas frescas no mercado.",
        translation_es: "Venden fruta fresca en el mercado."
    },
    {
        word: "Read",
        sentence: "I love to read books in my free time.",
        portuguese: "Ler",
        spanish: "Leer",
        translation_pt: "Eu amo ler livros no meu tempo livre.",
        translation_es: "Me encanta leer libros en mi tiempo libre."
    },
    {
        word: "Write",
        sentence: "Can you write your name here?",
        portuguese: "Escrever",
        spanish: "Escribir",
        translation_pt: "Você pode escrever seu nome aqui?",
        translation_es: "¿Puedes escribir tu nombre aquí?"
    },
    {
        word: "Think",
        sentence: "What do you think about this idea?",
        portuguese: "Pensar",
        spanish: "Pensar",
        translation_pt: "O que você pensa sobre essa ideia?",
        translation_es: "¿Qué piensas sobre esta idea?"
    },
    {
        word: "Make",
        sentence: "Can you make a cup of tea?",
        portuguese: "Fazer/Preparar",
        spanish: "Hacer/Preparar",
        translation_pt: "Você pode fazer uma xícara de chá?",
        translation_es: "¿Puedes hacer una taza de té?"
    },
    {
        word: "Do",
        sentence: "What do you want to do today?",
        portuguese: "Fazer",
        spanish: "Hacer",
        translation_pt: "O que você quer fazer hoje?",
        translation_es: "¿Qué quieres hacer hoy?"
    },
    {
        word: "Get",
        sentence: "I need to get some rest.",
        portuguese: "Conseguir/Obter",
        spanish: "Obtener/Conseguir",
        translation_pt: "Eu preciso descansar um pouco.",
        translation_es: "Necesito descansar un poco."
    },

    // --- Lugares e Objetos Comuns ---
    {
        word: "House",
        sentence: "My house has a big garden.",
        portuguese: "Casa",
        spanish: "Casa",
        translation_pt: "Minha casa tem um grande jardim.",
        translation_es: "Mi casa tiene un jardín grande."
    },
    {
        word: "Car",
        sentence: "He drives a red car.",
        portuguese: "Carro",
        spanish: "Coche",
        translation_pt: "Ele dirige um carro vermelho.",
        translation_es: "Él conduce un coche rojo."
    },
    {
        word: "Book",
        sentence: "This book is very interesting.",
        portuguese: "Livro",
        spanish: "Libro",
        translation_pt: "Este livro é muito interessante.",
        translation_es: "Este libro es muy interesante."
    },
    {
        word: "Table",
        sentence: "Put the keys on the table.",
        portuguese: "Mesa",
        spanish: "Mesa",
        translation_pt: "Coloque as chaves na mesa.",
        translation_es: "Pon las llaves en la mesa."
    },
    {
        word: "Chair",
        sentence: "Please sit on the chair.",
        portuguese: "Cadeira",
        spanish: "Silla",
        translation_pt: "Por favor, sente-se na cadeira.",
        translation_es: "Por favor, siéntate en la silla."
    },
    {
        word: "Phone",
        sentence: "My phone battery is low.",
        portuguese: "Telefone",
        spanish: "Teléfono",
        translation_pt: "A bateria do meu telefone está baixa.",
        translation_es: "La batería de mi teléfono está baja."
    },
    {
        word: "Computer",
        sentence: "I use my computer for work.",
        portuguese: "Computador",
        spanish: "Computadora",
        translation_pt: "Eu uso meu computador para trabalhar.",
        translation_es: "Uso mi computadora para trabajar."
    },
    {
        word: "Food",
        sentence: "What kind of food do you like?",
        portuguese: "Comida",
        spanish: "Comida",
        translation_pt: "Que tipo de comida você gosta?",
        translation_es: "¿Qué tipo de comida te gusta?"
    },
    {
        word: "Water",
        sentence: "I need a glass of water.",
        portuguese: "Água",
        spanish: "Agua",
        translation_pt: "Eu preciso de um copo de água.",
        translation_es: "Necesito un vaso de agua."
    },
    {
        word: "School",
        sentence: "Children go to school to learn.",
        portuguese: "Escola",
        spanish: "Escuela",
        translation_pt: "Crianças vão à escola para aprender.",
        translation_es: "Los niños van a la escuela para aprender."
    },
    {
        word: "Workplace",
        sentence: "My workplace is close to my house.",
        portuguese: "Local de trabalho",
        spanish: "Lugar de trabajo",
        translation_pt: "Meu local de trabalho é perto da minha casa.",
        translation_es: "Mi lugar de trabajo está cerca de mi casa."
    },
    {
        word: "Store",
        sentence: "I need to go to the store to buy milk.",
        portuguese: "Loja",
        spanish: "Tienda",
        translation_pt: "Eu preciso ir à loja comprar leite.",
        translation_es: "Necesito ir a la tienda a comprar leche."
    },

    // --- Adjetivos e Advérbios Comuns ---
    {
        word: "Good",
        sentence: "That's a very good idea.",
        portuguese: "Bom/Boa",
        spanish: "Bueno/a",
        translation_pt: "Essa é uma ideia muito boa.",
        translation_es: "Esa es una muy buena idea."
    },
    {
        word: "Bad",
        sentence: "The weather is really bad today.",
        portuguese: "Ruim",
        spanish: "Malo/a",
        translation_pt: "O tempo está muito ruim hoje.",
        translation_es: "El clima está muy malo hoy."
    },
    {
        word: "Happy",
        sentence: "She looks very happy today.",
        portuguese: "Feliz",
        spanish: "Feliz",
        translation_pt: "Ela parece muito feliz hoje.",
        translation_es: "Ella se ve muy feliz hoy."
    },
    {
        word: "Sad",
        sentence: "He was sad after losing the game.",
        portuguese: "Triste",
        spanish: "Triste",
        translation_pt: "Ele ficou triste depois de perder o jogo.",
        translation_es: "Él estaba triste después de perder el partido."
    },
    {
        word: "Big",
        sentence: "They live in a big house.",
        portuguese: "Grande",
        spanish: "Grande",
        translation_pt: "Eles moram em uma casa grande.",
        translation_es: "Ellos viven en una casa grande."
    },
    {
        word: "Small",
        sentence: "I prefer small dogs.",
        portuguese: "Pequeno/a",
        spanish: "Pequeño/a",
        translation_pt: "Eu prefiro cachorros pequenos.",
        translation_es: "Prefiero los perros pequeños."
    },
    {
        word: "New",
        sentence: "I bought a new phone.",
        portuguese: "Novo/a",
        spanish: "Nuevo/a",
        translation_pt: "Eu comprei um telefone novo.",
        translation_es: "Compré un teléfono nuevo."
    },
    {
        word: "Old",
        sentence: "This is an old movie, but still good.",
        portuguese: "Velho/a",
        spanish: "Viejo/a",
        translation_pt: "Este é um filme antigo, mas ainda bom.",
        translation_es: "Esta es una película vieja, pero aún buena."
    },
    {
        word: "Fast",
        sentence: "A cheetah is a very fast animal.",
        portuguese: "Rápido/a",
        spanish: "Rápido/a",
        translation_pt: "Um guepardo é um animal muito rápido.",
        translation_es: "Un guepardo es un animal muy rápido."
    },
    {
        word: "Slow",
        sentence: "The internet connection is very slow.",
        portuguese: "Lento/a",
        spanish: "Lento/a",
        translation_pt: "A conexão de internet está muito lenta.",
        translation_es: "La conexión a internet es muy lenta."
    },
    {
        word: "Always",
        sentence: "She always arrives on time.",
        portuguese: "Sempre",
        spanish: "Siempre",
        translation_pt: "Ela sempre chega na hora.",
        translation_es: "Ella siempre llega a tiempo."
    },
    {
        word: "Never",
        sentence: "I never eat fast food.",
        portuguese: "Nunca",
        spanish: "Nunca",
        translation_pt: "Eu nunca como fast food.",
        translation_es: "Nunca como comida rápida."
    },
    {
        word: "Often",
        sentence: "He often visits his grandparents.",
        portuguese: "Frequentemente",
        spanish: "A menudo",
        translation_pt: "Ele frequentemente visita seus avós.",
        translation_es: "Él a menudo visita a sus abuelos."
    },
    {
        word: "Now",
        sentence: "I need to leave now.",
        portuguese: "Agora",
        spanish: "Ahora",
        translation_pt: "Eu preciso sair agora.",
        translation_es: "Necesito irme ahora."
    },
    {
        word: "Later",
        sentence: "Let's talk about it later.",
        portuguese: "Depois",
        spanish: "Más tarde",
        translation_pt: "Vamos conversar sobre isso mais tarde.",
        translation_es: "Hablemos de eso más tarde."
    },

    // --- Outros termos comuns e essenciais ---
    {
        word: "Time",
        sentence: "What time is it?",
        portuguese: "Tempo/Hora",
        spanish: "Tiempo/Hora",
        translation_pt: "Que horas são?",
        translation_es: "¿Qué hora es?"
    },
    {
        word: "Day",
        sentence: "Have a nice day!",
        portuguese: "Dia",
        spanish: "Día",
        translation_pt: "Tenha um bom dia!",
        translation_es: "¡Que tengas un buen día!"
    },
    {
        word: "Night",
        sentence: "Good night, sleep well.",
        portuguese: "Noite",
        spanish: "Noche",
        translation_pt: "Boa noite, durma bem.",
        translation_es: "Buenas noches, duerme bien."
    },
    {
        word: "Morning",
        sentence: "I like to drink coffee in the morning.",
        portuguese: "Manhã",
        spanish: "Mañana",
        translation_pt: "Eu gosto de tomar café pela manhã.",
        translation_es: "Me gusta tomar café por la mañana."
    },
    {
        word: "Evening",
        sentence: "We'll meet in the evening.",
        portuguese: "Noite (final da tarde)",
        spanish: "Tarde/Noche",
        translation_pt: "Nós nos encontraremos à noite.",
        translation_es: "Nos encontraremos por la tarde."
    },
    {
        word: "Week",
        sentence: "The project will take a week to complete.",
        portuguese: "Semana",
        spanish: "Semana",
        translation_pt: "O projeto levará uma semana para ser concluído.",
        translation_es: "El proyecto tardará una semana en completarse."
    },
    {
        word: "Month",
        sentence: "Next month, I'm going on vacation.",
        portuguese: "Mês",
        spanish: "Mes",
        translation_pt: "No próximo mês, vou tirar férias.",
        translation_es: "El próximo mes, me voy de vacaciones."
    },
    {
        word: "Year",
        sentence: "Happy New Year!",
        portuguese: "Ano",
        spanish: "Año",
        translation_pt: "Feliz Ano Novo!",
        translation_es: "¡Feliz Año Nuevo!"
    },
    {
        word: "Money",
        sentence: "I need to save more money.",
        portuguese: "Dinheiro",
        spanish: "Dinero",
        translation_pt: "Eu preciso economizar mais dinheiro.",
        translation_es: "Necesito ahorrar más dinero."
    },
    {
        word: "Love",
        sentence: "Love is a beautiful feeling.",
        portuguese: "Amor",
        spanish: "Amor",
        translation_pt: "O amor é um sentimento lindo.",
        translation_es: "El amor es un sentimiento hermoso."
    },
    {
        word: "Help",
        sentence: "Can you help me with this task?",
        portuguese: "Ajuda/Ajudar",
        spanish: "Ayuda/Ayudar",
        translation_pt: "Você pode me ajudar com esta tarefa?",
        translation_es: "¿Puedes ayudarme con esta tarea?"
    },
    {
        word: "Question",
        sentence: "I have a question for you.",
        portuguese: "Pergunta",
        spanish: "Pregunta",
        translation_pt: "Eu tenho uma pergunta para você.",
        translation_es: "Tengo una pregunta para ti."
    },
    {
        word: "Answer",
        sentence: "Please give me an answer soon.",
        portuguese: "Resposta/Responder",
        spanish: "Respuesta/Responder",
        translation_pt: "Por favor, me dê uma resposta em breve.",
        translation_es: "Por favor, dame una respuesta pronto."
    },
    {
        word: "Home",
        sentence: "I'm going home after work.",
        portuguese: "Casa (lar)",
        spanish: "Hogar",
        translation_pt: "Vou para casa depois do trabalho.",
        translation_es: "Me voy a casa después del trabajo."
    },
    {
        word: "City",
        sentence: "New York is a very big city.",
        portuguese: "Cidade",
        spanish: "Ciudad",
        translation_pt: "Nova York é uma cidade muito grande.",
        translation_es: "Nueva York es una ciudad muy grande."
    },
    {
        word: "Country",
        sentence: "Brazil is a beautiful country.",
        portuguese: "País",
        spanish: "País",
        translation_pt: "O Brasil é um país lindo.",
        translation_es: "Brasil es un país hermoso."
    },



    // --- Palavras de uso cotidiano (com foco em COZINHA) ---

    // Utensílios e Aparelhos
    {
        word: "Kitchen",
        sentence: "We spent hours talking in the kitchen.",
        portuguese: "Cozinha",
        spanish: "Cocina",
        translation_pt: "Passamos horas conversando na cozinha.",
        translation_es: "Pasamos horas hablando en la cocina."
    },
    {
        word: "Stove",
        sentence: "Be careful, the stove is hot.",
        portuguese: "Fogão",
        spanish: "Estufa",
        translation_pt: "Cuidado, o fogão está quente.",
        translation_es: "Cuidado, la estufa está caliente."
    },
    {
        word: "Oven",
        sentence: "The cake is baking in the oven.",
        portuguese: "Forno",
        spanish: "Horno",
        translation_pt: "O bolo está assando no forno.",
        translation_es: "El pastel se está horneando en el horno."
    },
    {
        word: "Refrigerator",
        sentence: "Please put the milk back in the refrigerator.",
        portuguese: "Geladeira",
        spanish: "Refrigerador",
        translation_pt: "Por favor, coloque o leite de volta na geladeira.",
        translation_es: "Por favor, vuelve a poner la leche en el refrigerador."
    },
    {
        word: "Microwave",
        sentence: "I'll heat up the food in the microwave.",
        portuguese: "Micro-ondas",
        spanish: "Microondas",
        translation_pt: "Vou esquentar a comida no micro-ondas.",
        translation_es: "Calentaré la comida en el microondas."
    },
    {
        word: "Pan",
        sentence: "Use a non-stick pan for the eggs.",
        portuguese: "Frigideira",
        spanish: "Sartén",
        translation_pt: "Use uma frigideira antiaderente para os ovos.",
        translation_es: "Usa una sartén antiadherente para los huevos."
    },
    {
        word: "Pot",
        sentence: "The soup is cooking in a large pot.",
        portuguese: "Panela",
        spanish: "Olla",
        translation_pt: "A sopa está cozinhando em uma panela grande.",
        translation_es: "La sopa se está cocinando en una olla grande."
    },
    {
        word: "Knife",
        sentence: "Be careful when using a sharp knife.",
        portuguese: "Faca",
        spanish: "Cuchillo",
        translation_pt: "Tenha cuidado ao usar uma faca afiada.",
        translation_es: "Ten cuidado al usar un cuchillo afilado."
    },
    {
        word: "Fork",
        sentence: "I need a fork to eat my salad.",
        portuguese: "Garfo",
        spanish: "Tenedor",
        translation_pt: "Eu preciso de um garfo para comer minha salada.",
        translation_es: "Necesito un tenedor para comer mi ensalada."
    },
    {
        word: "Spoon",
        sentence: "Could you pass me a spoon for my soup?",
        portuguese: "Colher",
        spanish: "Cuchara",
        translation_pt: "Você poderia me passar uma colher para minha sopa?",
        translation_es: "¿Podrías pasarme una cuchara para mi sopa?"
    },
    {
        word: "Plate",
        sentence: "Put the food on the plate.",
        portuguese: "Prato",
        spanish: "Plato",
        translation_pt: "Coloque a comida no prato.",
        translation_es: "Pon la comida en el plato."
    },
    {
        word: "Glass",
        sentence: "She filled the glass with water.",
        portuguese: "Copo",
        spanish: "Vaso",
        translation_pt: "Ela encheu o copo com água.",
        translation_es: "Ella llenó el vaso con agua."
    },
    {
        word: "Cup",
        sentence: "Would you like a cup of coffee?",
        portuguese: "Xícara",
        spanish: "Taza",
        translation_pt: "Você gostaria de uma xícara de café?",
        translation_es: "¿Te gustaría una taza de café?"
    },
    {
        word: "Bowl",
        sentence: "I ate a big bowl of cereal for breakfast.",
        portuguese: "Tigela",
        spanish: "Tazón/Bol",
        translation_pt: "Eu comi uma tigela grande de cereal no café da manhã.",
        translation_es: "Comí un tazón grande de cereal para el desayuno."
    },
    {
        word: "Cutting board",
        sentence: "Chop the vegetables on the cutting board.",
        portuguese: "Tábua de corte",
        spanish: "Tabla de cortar",
        translation_pt: "Pique os vegetais na tábua de corte.",
        translation_es: "Corta las verduras en la tabla de cortar."
    },

    // Alimentos e Ingredientes Básicos
    {
        word: "Bread",
        sentence: "I usually eat bread and butter for breakfast.",
        portuguese: "Pão",
        spanish: "Pan",
        translation_pt: "Eu geralmente como pão com manteiga no café da manhã.",
        translation_es: "Normalmente como pan con mantequilla para el desayuno."
    },
    {
        word: "Milk",
        sentence: "Could you buy some milk from the store?",
        portuguese: "Leite",
        spanish: "Leche",
        translation_pt: "Você poderia comprar um pouco de leite na loja?",
        translation_es: "¿Podrías comprar un poco de leche en la tienda?"
    },
    {
        word: "Egg",
        sentence: "I like to eat a fried egg in the morning.",
        portuguese: "Ovo",
        spanish: "Huevo",
        translation_pt: "Eu gosto de comer um ovo frito de manhã.",
        translation_es: "Me gusta comer un huevo frito por la mañana."
    },
    {
        word: "Cheese",
        sentence: "Do you want some cheese with your pasta?",
        portuguese: "Queijo",
        spanish: "Queso",
        translation_pt: "Você quer um pouco de queijo com sua massa?",
        translation_es: "¿Quieres un poco de queso con tu pasta?"
    },
    {
        word: "Meat",
        sentence: "He prefers red meat over chicken.",
        portuguese: "Carne",
        spanish: "Carne",
        translation_pt: "Ele prefere carne vermelha a frango.",
        translation_es: "Él prefiere la carne roja al pollo."
    },
    {
        word: "Chicken",
        sentence: "We're having roasted chicken for dinner.",
        portuguese: "Frango",
        spanish: "Pollo",
        translation_pt: "Vamos comer frango assado no jantar.",
        translation_es: "Vamos a cenar pollo asado."
    },
    {
        word: "Fish",
        sentence: "Eating fish is very healthy.",
        portuguese: "Peixe",
        spanish: "Pescado",
        translation_pt: "Comer peixe é muito saudável.",
        translation_es: "Comer pescado es muy saludable."
    },
    {
        word: "Rice",
        sentence: "Rice is a staple food in many countries.",
        portuguese: "Arroz",
        spanish: "Arroz",
        translation_pt: "Arroz é um alimento básico em muitos países.",
        translation_es: "El arroz es un alimento básico en muchos países."
    },
    {
        word: "Pasta",
        sentence: "I love Italian pasta dishes.",
        portuguese: "Massa (macarrão)",
        spanish: "Pasta",
        translation_pt: "Eu amo pratos de massa italianos.",
        translation_es: "Me encantan los platos de pasta italianos."
    },
    {
        word: "Vegetables",
        sentence: "Eating plenty of vegetables is good for your health.",
        portuguese: "Vegetais",
        spanish: "Verduras",
        translation_pt: "Comer muitos vegetais é bom para a sua saúde.",
        translation_es: "Comer muchas verduras es bueno para tu salud."
    },
    {
        word: "Fruit",
        sentence: "Apples are my favorite fruit.",
        portuguese: "Fruta",
        spanish: "Fruta",
        translation_pt: "Maçãs são minha fruta favorita.",
        translation_es: "Las manzanas son mi fruta favorita."
    },
    {
        word: "Sugar",
        sentence: "Do you take sugar in your tea?",
        portuguese: "Açúcar",
        spanish: "Azúcar",
        translation_pt: "Você coloca açúcar no seu chá?",
        translation_es: "¿Tomas azúcar en tu té?"
    },
    {
        word: "Salt",
        sentence: "Add a pinch of salt to the soup.",
        portuguese: "Sal",
        spanish: "Sal",
        translation_pt: "Adicione uma pitada de sal à sopa.",
        translation_es: "Añade una pizca de sal a la sopa."
    },
    {
        word: "Oil",
        sentence: "Heat some olive oil in the pan.",
        portuguese: "Óleo",
        spanish: "Aceite",
        translation_pt: "Aqueça um pouco de azeite na frigideira.",
        translation_es: "Calienta un poco de aceite de oliva en la sartén."
    },
    {
        word: "Butter",
        sentence: "Spread some butter on the toast.",
        portuguese: "Manteiga",
        spanish: "Mantequilla",
        translation_pt: "Espalhe um pouco de manteiga na torrada.",
        translation_es: "Unta un poco de mantequilla en la tostada."
    },

    // Ações de Cozinha
    {
        word: "Cook",
        sentence: "I love to cook dinner for my family.",
        portuguese: "Cozinhar",
        spanish: "Cocinar",
        translation_pt: "Eu adoro cozinhar o jantar para minha família.",
        translation_es: "Me encanta cocinar la cena para mi familia."
    },
    {
        word: "Bake",
        sentence: "She decided to bake a cake for the party.",
        portuguese: "Assar (bolo, pão)",
        spanish: "Hornear",
        translation_pt: "Ela decidiu assar um bolo para a festa.",
        translation_es: "Ella decidió hornear un pastel para la fiesta."
    },
    {
        word: "Fry",
        sentence: "Let's fry some potatoes.",
        portuguese: "Fritar",
        spanish: "Freír",
        translation_pt: "Vamos fritar algumas batatas.",
        translation_es: "Vamos a freír algunas patatas."
    },
    {
        word: "Boil",
        sentence: "Boil the water for pasta.",
        portuguese: "Ferver",
        spanish: "Hervir",
        translation_pt: "Ferva a água para o macarrão.",
        translation_es: "Hierve el agua para la pasta."
    },
    {
        word: "Chop",
        sentence: "Chop the onions into small pieces.",
        portuguese: "Picar",
        spanish: "Picar",
        translation_pt: "Pique as cebolas em pedaços pequenos.",
        translation_es: "Pica las cebollas en trozos pequeños."
    },
    {
        word: "Cut",
        sentence: "Can you cut the bread?",
        portuguese: "Cortar",
        spanish: "Cortar",
        translation_pt: "Você pode cortar o pão?",
        translation_es: "¿Puedes cortar el pan?"
    },
    {
        word: "Mix",
        sentence: "Mix all the ingredients together.",
        portuguese: "Misturar",
        spanish: "Mezclar",
        translation_pt: "Misture todos os ingredientes.",
        translation_es: "Mezcla todos los ingredientes."
    },
    {
        word: "Wash",
        sentence: "Please wash the dishes after dinner.",
        portuguese: "Lavar",
        spanish: "Lavar",
        translation_pt: "Por favor, lave a louça depois do jantar.",
        translation_es: "Por favor, lava los platos después de cenar."
    },
    {
        word: "Serve",
        sentence: "Dinner is ready to serve.",
        portuguese: "Servir",
        spanish: "Servir",
        translation_pt: "O jantar está pronto para servir.",
        translation_es: "La cena está lista para servir."
    },

    // Refeições e Termos Relacionados
    {
        word: "Breakfast",
        sentence: "What do you usually have for breakfast?",
        portuguese: "Café da manhã",
        spanish: "Desayuno",
        translation_pt: "O que você geralmente come no café da manhã?",
        translation_es: "¿Qué sueles desayunar?"
    },
    {
        word: "Lunch",
        sentence: "I'm meeting a friend for lunch.",
        portuguese: "Almoço",
        spanish: "Almuerzo",
        translation_pt: "Vou encontrar um amigo para almoçar.",
        translation_es: "Voy a encontrarme con un amigo para almorzar."
    },
    {
        word: "Dinner",
        sentence: "We're having pasta for dinner tonight.",
        portuguese: "Jantar",
        spanish: "Cena",
        translation_pt: "Vamos comer massa no jantar de hoje.",
        translation_es: "Vamos a cenar pasta esta noche."
    },
    {
        word: "Meal",
        sentence: "It was a delicious meal.",
        portuguese: "Refeição",
        spanish: "Comida",
        translation_pt: "Foi uma refeição deliciosa.",
        translation_es: "Fue una comida deliciosa."
    },
    {
        word: "Recipe",
        sentence: "Do you have a good recipe for cookies?",
        portuguese: "Receita",
        spanish: "Receta",
        translation_pt: "Você tem uma boa receita de biscoitos?",
        translation_es: "¿Tienes una buena receta de galletas?"
    },
    {
        word: "Hungry",
        sentence: "I'm very hungry, let's eat.",
        portuguese: "Com fome",
        spanish: "Hambriento/a",
        translation_pt: "Estou com muita fome, vamos comer.",
        translation_es: "Tengo mucha hambre, vamos a comer."
    },
    {
        word: "Thirsty",
        sentence: "After running, I felt very thirsty.",
        portuguese: "Com sede",
        spanish: "Sediento/a",
        translation_pt: "Depois de correr, senti muita sede.",
        translation_es: "Después de correr, sentí mucha sed."
    },



    // --- Palavras de uso cotidiano (com foco em COZINHA) ---

    // Utensílios e Aparelhos
    {
        word: "Kitchen",
        sentence: "We spent hours talking in the kitchen.",
        portuguese: "Cozinha",
        spanish: "Cocina",
        translation_pt: "Passamos horas conversando na cozinha.",
        translation_es: "Pasamos horas hablando en la cocina."
    },
    {
        word: "Stove",
        sentence: "Be careful, the stove is hot.",
        portuguese: "Fogão",
        spanish: "Estufa",
        translation_pt: "Cuidado, o fogão está quente.",
        translation_es: "Cuidado, la estufa está caliente."
    },
    {
        word: "Oven",
        sentence: "The cake is baking in the oven.",
        portuguese: "Forno",
        spanish: "Horno",
        translation_pt: "O bolo está assando no forno.",
        translation_es: "El pastel se está horneando en el horno."
    },
    {
        word: "Refrigerator",
        sentence: "Please put the milk back in the refrigerator.",
        portuguese: "Geladeira",
        spanish: "Refrigerador",
        translation_pt: "Por favor, coloque o leite de volta na geladeira.",
        translation_es: "Por favor, vuelve a poner la leche en el refrigerador."
    },
    {
        word: "Microwave",
        sentence: "I'll heat up the food in the microwave.",
        portuguese: "Micro-ondas",
        spanish: "Microondas",
        translation_pt: "Vou esquentar a comida no micro-ondas.",
        translation_es: "Calentaré la comida en el microondas."
    },
    {
        word: "Pan",
        sentence: "Use a non-stick pan for the eggs.",
        portuguese: "Frigideira",
        spanish: "Sartén",
        translation_pt: "Use uma frigideira antiaderente para os ovos.",
        translation_es: "Usa una sartén antiadherente para los huevos."
    },
    {
        word: "Pot",
        sentence: "The soup is cooking in a large pot.",
        portuguese: "Panela",
        spanish: "Olla",
        translation_pt: "A sopa está cozinhando em uma panela grande.",
        translation_es: "La sopa se está cocinando en una olla grande."
    },
    {
        word: "Knife",
        sentence: "Be careful when using a sharp knife.",
        portuguese: "Faca",
        spanish: "Cuchillo",
        translation_pt: "Tenha cuidado ao usar uma faca afiada.",
        translation_es: "Ten cuidado al usar un cuchillo afilado."
    },
    {
        word: "Fork",
        sentence: "I need a fork to eat my salad.",
        portuguese: "Garfo",
        spanish: "Tenedor",
        translation_pt: "Eu preciso de um garfo para comer minha salada.",
        translation_es: "Necesito un tenedor para comer mi ensalada."
    },
    {
        word: "Spoon",
        sentence: "Could you pass me a spoon for my soup?",
        portuguese: "Colher",
        spanish: "Cuchara",
        translation_pt: "Você poderia me passar uma colher para minha sopa?",
        translation_es: "¿Podrías pasarme una cuchara para mi sopa?"
    },
    {
        word: "Plate",
        sentence: "Put the food on the plate.",
        portuguese: "Prato",
        spanish: "Plato",
        translation_pt: "Coloque a comida no prato.",
        translation_es: "Pon la comida en el plato."
    },
    {
        word: "Glass",
        sentence: "She filled the glass with water.",
        portuguese: "Copo",
        spanish: "Vaso",
        translation_pt: "Ela encheu o copo com água.",
        translation_es: "Ella llenó el vaso con agua."
    },
    {
        word: "Cup",
        sentence: "Would you like a cup of coffee?",
        portuguese: "Xícara",
        spanish: "Taza",
        translation_pt: "Você gostaria de uma xícara de café?",
        translation_es: "¿Te gustaría una taza de café?"
    },
    {
        word: "Bowl",
        sentence: "I ate a big bowl of cereal for breakfast.",
        portuguese: "Tigela",
        spanish: "Tazón/Bol",
        translation_pt: "Eu comi uma tigela grande de cereal no café da manhã.",
        translation_es: "Comí un tazón grande de cereal para el desayuno."
    },
    {
        word: "Cutting board",
        sentence: "Chop the vegetables on the cutting board.",
        portuguese: "Tábua de corte",
        spanish: "Tabla de cortar",
        translation_pt: "Pique os vegetais na tábua de corte.",
        translation_es: "Corta las verduras en la tabla de cortar."
    },

    // Alimentos e Ingredientes Básicos
    {
        word: "Bread",
        sentence: "I usually eat bread and butter for breakfast.",
        portuguese: "Pão",
        spanish: "Pan",
        translation_pt: "Eu geralmente como pão com manteiga no café da manhã.",
        translation_es: "Normalmente como pan con mantequilla para el desayuno."
    },
    {
        word: "Milk",
        sentence: "Could you buy some milk from the store?",
        portuguese: "Leite",
        spanish: "Leche",
        translation_pt: "Você poderia comprar um pouco de leite na loja?",
        translation_es: "¿Podrías comprar un poco de leche en la tienda?"
    },
    {
        word: "Egg",
        sentence: "I like to eat a fried egg in the morning.",
        portuguese: "Ovo",
        spanish: "Huevo",
        translation_pt: "Eu gosto de comer um ovo frito de manhã.",
        translation_es: "Me gusta comer un huevo frito por la mañana."
    },
    {
        word: "Cheese",
        sentence: "Do you want some cheese with your pasta?",
        portuguese: "Queijo",
        spanish: "Queso",
        translation_pt: "Você quer um pouco de queijo com sua massa?",
        translation_es: "¿Quieres un poco de queso con tu pasta?"
    },
    {
        word: "Meat",
        sentence: "He prefers red meat over chicken.",
        portuguese: "Carne",
        spanish: "Carne",
        translation_pt: "Ele prefere carne vermelha a frango.",
        translation_es: "Él prefiere la carne roja al pollo."
    },
    {
        word: "Chicken",
        sentence: "We're having roasted chicken for dinner.",
        portuguese: "Frango",
        spanish: "Pollo",
        translation_pt: "Vamos comer frango assado no jantar.",
        translation_es: "Vamos a cenar pollo asado."
    },
    {
        word: "Fish",
        sentence: "Eating fish is very healthy.",
        portuguese: "Peixe",
        spanish: "Pescado",
        translation_pt: "Comer peixe é muito saudável.",
        translation_es: "Comer pescado es muy saludable."
    },
    {
        word: "Rice",
        sentence: "Rice is a staple food in many countries.",
        portuguese: "Arroz",
        spanish: "Arroz",
        translation_pt: "Arroz é um alimento básico em muitos países.",
        translation_es: "El arroz es un alimento básico en muchos países."
    },
    {
        word: "Pasta",
        sentence: "I love Italian pasta dishes.",
        portuguese: "Massa (macarrão)",
        spanish: "Pasta",
        translation_pt: "Eu amo pratos de massa italianos.",
        translation_es: "Me encantan los platos de pasta italianos."
    },
    {
        word: "Vegetables",
        sentence: "Eating plenty of vegetables is good for your health.",
        portuguese: "Vegetais",
        spanish: "Verduras",
        translation_pt: "Comer muitos vegetais é bom para a sua saúde.",
        translation_es: "Comer muchas verduras es bueno para tu salud."
    },
    {
        word: "Fruit",
        sentence: "Apples are my favorite fruit.",
        portuguese: "Fruta",
        spanish: "Fruta",
        translation_pt: "Maçãs são minha fruta favorita.",
        translation_es: "Las manzanas son mi fruta favorita."
    },
    {
        word: "Sugar",
        sentence: "Do you take sugar in your tea?",
        portuguese: "Açúcar",
        spanish: "Azúcar",
        translation_pt: "Você coloca açúcar no seu chá?",
        translation_es: "¿Tomas azúcar en tu té?"
    },
    {
        word: "Salt",
        sentence: "Add a pinch of salt to the soup.",
        portuguese: "Sal",
        spanish: "Sal",
        translation_pt: "Adicione uma pitada de sal à sopa.",
        translation_es: "Añade una pizca de sal a la sopa."
    },
    {
        word: "Oil",
        sentence: "Heat some olive oil in the pan.",
        portuguese: "Óleo",
        spanish: "Aceite",
        translation_pt: "Aqueça um pouco de azeite na frigideira.",
        translation_es: "Calienta un poco de aceite de oliva en la sartén."
    },
    {
        word: "Butter",
        sentence: "Spread some butter on the toast.",
        portuguese: "Manteiga",
        spanish: "Mantequilla",
        translation_pt: "Espalhe um pouco de manteiga na torrada.",
        translation_es: "Unta un poco de mantequilla en la tostada."
    },

    // Ações de Cozinha
    {
        word: "Cook",
        sentence: "I love to cook dinner for my family.",
        portuguese: "Cozinhar",
        spanish: "Cocinar",
        translation_pt: "Eu adoro cozinhar o jantar para minha família.",
        translation_es: "Me encanta cocinar la cena para mi familia."
    },
    {
        word: "Bake",
        sentence: "She decided to bake a cake for the party.",
        portuguese: "Assar (bolo, pão)",
        spanish: "Hornear",
        translation_pt: "Ela decidiu assar um bolo para a festa.",
        translation_es: "Ella decidió hornear un pastel para la fiesta."
    },
    {
        word: "Fry",
        sentence: "Let's fry some potatoes.",
        portuguese: "Fritar",
        spanish: "Freír",
        translation_pt: "Vamos fritar algumas batatas.",
        translation_es: "Vamos a freír algunas patatas."
    },
    {
        word: "Boil",
        sentence: "Boil the water for pasta.",
        portuguese: "Ferver",
        spanish: "Hervir",
        translation_pt: "Ferva a água para o macarrão.",
        translation_es: "Hierve el agua para la pasta."
    },
    {
        word: "Chop",
        sentence: "Chop the onions into small pieces.",
        portuguese: "Picar",
        spanish: "Picar",
        translation_pt: "Pique as cebolas em pedaços pequenos.",
        translation_es: "Pica las cebollas en trozos pequeños."
    },
    {
        word: "Cut",
        sentence: "Can you cut the bread?",
        portuguese: "Cortar",
        spanish: "Cortar",
        translation_pt: "Você pode cortar o pão?",
        translation_es: "¿Puedes cortar el pan?"
    },
    {
        word: "Mix",
        sentence: "Mix all the ingredients together.",
        portuguese: "Misturar",
        spanish: "Mezclar",
        translation_pt: "Misture todos os ingredientes.",
        translation_es: "Mezcla todos los ingredientes."
    },
    {
        word: "Wash",
        sentence: "Please wash the dishes after dinner.",
        portuguese: "Lavar",
        spanish: "Lavar",
        translation_pt: "Por favor, lave a louça depois do jantar.",
        translation_es: "Por favor, lava los platos después de cenar."
    },
    {
        word: "Serve",
        sentence: "Dinner is ready to serve.",
        portuguese: "Servir",
        spanish: "Servir",
        translation_pt: "O jantar está pronto para servir.",
        translation_es: "La cena está lista para servir."
    },

    // Refeições e Termos Relacionados
    {
        word: "Breakfast",
        sentence: "What do you usually have for breakfast?",
        portuguese: "Café da manhã",
        spanish: "Desayuno",
        translation_pt: "O que você geralmente come no café da manhã?",
        translation_es: "¿Qué sueles desayunar?"
    },
    {
        word: "Lunch",
        sentence: "I'm meeting a friend for lunch.",
        portuguese: "Almoço",
        spanish: "Almuerzo",
        translation_pt: "Vou encontrar um amigo para almoçar.",
        translation_es: "Voy a encontrarme con un amigo para almorzar."
    },
    {
        word: "Dinner",
        sentence: "We're having pasta for dinner tonight.",
        portuguese: "Jantar",
        spanish: "Cena",
        translation_pt: "Vamos comer massa no jantar de hoje.",
        translation_es: "Vamos a cenar pasta esta noche."
    },
    {
        word: "Meal",
        sentence: "It was a delicious meal.",
        portuguese: "Refeição",
        spanish: "Comida",
        translation_pt: "Foi uma refeição deliciosa.",
        translation_es: "Fue una comida deliciosa."
    },
    {
        word: "Recipe",
        sentence: "Do you have a good recipe for cookies?",
        portuguese: "Receita",
        spanish: "Receta",
        translation_pt: "Você tem uma boa receita de biscoitos?",
        translation_es: "¿Tienes una buena receta de galletas?"
    },
    {
        word: "Hungry",
        sentence: "I'm very hungry, let's eat.",
        portuguese: "Com fome",
        spanish: "Hambriento/a",
        translation_pt: "Estou com muita fome, vamos comer.",
        translation_es: "Tengo mucha hambre, vamos a comer."
    },
    {
        word: "Thirsty",
        sentence: "After running, I felt very thirsty.",
        portuguese: "Com sede",
        spanish: "Sediento/a",
        translation_pt: "Depois de correr, senti muita sede.",
        translation_es: "Después de correr, sentí mucha sed."
    },
    // Adicione mais palavras aqui para chegar a 500+, seguindo o mesmo formato.
    // Lembre-se de adicionar uma vírgula (,) após cada objeto, exceto o último da lista.

     // --- Palavras de uso cotidiano (com foco em CORPO HUMANO) ---

    // Partes do Corpo (Geral)
    {
        word: "Body",
        sentence: "It's important to keep your body healthy.",
        portuguese: "Corpo",
        spanish: "Cuerpo",
        translation_pt: "É importante manter seu corpo saudável.",
        translation_es: "Es importante mantener tu cuerpo sano."
    },
    {
        word: "Head",
        sentence: "He nodded his head in agreement.",
        portuguese: "Cabeça",
        spanish: "Cabeza",
        translation_pt: "Ele acenou com a cabeça em concordância.",
        translation_es: "Él asintió con la cabeza en señal de acuerdo."
    },
    {
        word: "Face",
        sentence: "She has a friendly face.",
        portuguese: "Rosto",
        spanish: "Cara",
        translation_pt: "Ela tem um rosto amigável.",
        translation_es: "Ella tiene una cara amigable."
    },
    {
        word: "Hair",
        sentence: "She has long, dark hair.",
        portuguese: "Cabelo",
        spanish: "Pelo/Cabello",
        translation_pt: "Ela tem cabelo longo e escuro.",
        translation_es: "Ella tiene el pelo largo y oscuro."
    },
    {
        word: "Eye",
        sentence: "He has blue eyes.",
        portuguese: "Olho",
        spanish: "Ojo",
        translation_pt: "Ele tem olhos azuis.",
        translation_es: "Él tiene ojos azules."
    },
    {
        word: "Nose",
        sentence: "She has a small nose.",
        portuguese: "Nariz",
        spanish: "Nariz",
        translation_pt: "Ela tem um nariz pequeno.",
        translation_es: "Ella tiene una nariz pequeña."
    },
    {
        word: "Mouth",
        sentence: "Close your mouth when you chew.",
        portuguese: "Boca",
        spanish: "Boca",
        translation_pt: "Feche a boca ao mastigar.",
        translation_es: "Cierra la boca cuando mastiques."
    },
    {
        word: "Ear",
        sentence: "I heard a noise with my ear.",
        portuguese: "Orelha",
        spanish: "Oreja",
        translation_pt: "Ouvi um barulho com minha orelha.",
        translation_es: "Oí un ruido con mi oreja."
    },
    {
        word: "Tooth",
        sentence: "Brush your teeth twice a day.",
        portuguese: "Dente",
        spanish: "Diente",
        translation_pt: "Escove seus dentes duas vezes ao dia.",
        translation_es: "Cepíllate los dientes dos veces al día."
    },
    {
        word: "Neck",
        sentence: "He wore a scarf around his neck.",
        portuguese: "Pescoço",
        spanish: "Cuello",
        translation_pt: "Ele usava um cachecol em volta do pescoço.",
        translation_es: "Él llevaba una bufanda alrededor de su cuello."
    },
    {
        word: "Arm",
        sentence: "She hugged me with both arms.",
        portuguese: "Braço",
        spanish: "Brazo",
        translation_pt: "Ela me abraçou com os dois braços.",
        translation_es: "Ella me abrazó con ambos brazos."
    },
    {
        word: "Hand",
        sentence: "Shake my hand.",
        portuguese: "Mão",
        spanish: "Mano",
        translation_pt: "Aperte minha mão.",
        translation_es: "Estrecha mi mano."
    },
    {
        word: "Finger",
        sentence: "He pointed with his finger.",
        portuguese: "Dedo (da mão)",
        spanish: "Dedo (de la mano)",
        translation_pt: "Ele apontou com o dedo.",
        translation_es: "Él señaló con el dedo."
    },
    {
        word: "Leg",
        sentence: "My leg hurts after running.",
        portuguese: "Perna",
        spanish: "Pierna",
        translation_pt: "Minha perna dói depois de correr.",
        translation_es: "Me duele la pierna después de correr."
    },
    {
        word: "Foot",
        sentence: "He kicked the ball with his foot.",
        portuguese: "Pé",
        spanish: "Pie",
        translation_pt: "Ele chutou a bola com o pé.",
        translation_es: "Él pateó el balón con el pie."
    },
    {
        word: "Toe",
        sentence: "I stubbed my toe on the table leg.",
        portuguese: "Dedo (do pé)",
        spanish: "Dedo (del pie)",
        translation_pt: "Eu bati o dedo do pé na perna da mesa.",
        translation_es: "Me golpeé el dedo del pie con la pata de la mesa."
    },
    {
        word: "Back",
        sentence: "My back is sore from sitting all day.",
        portuguese: "Costas",
        spanish: "Espalda",
        translation_pt: "Minhas costas estão doloridas de ficar sentado o dia todo.",
        translation_es: "Mi espalda está adolorida de estar sentado todo el día."
    },
    {
        word: "Stomach",
        sentence: "I have a pain in my stomach.",
        portuguese: "Estômago/Barriga",
        spanish: "Estómago/Vientre",
        translation_pt: "Estou com uma dor no estômago.",
        translation_es: "Tengo un dolor en el estómago."
    },
    {
        word: "Heart",
        sentence: "The doctor listened to his heart.",
        portuguese: "Coração",
        spanish: "Corazón",
        translation_pt: "O médico ouviu o coração dele.",
        translation_es: "El médico escuchó su corazón."
    },
    {
        word: "Brain",
        sentence: "The human brain is very complex.",
        portuguese: "Cérebro",
        spanish: "Cerebro",
        translation_pt: "O cérebro humano é muito complexo.",
        translation_es: "El cerebro humano es muy complejo."
    },

    // Ações e Sensações do Corpo
    {
        word: "Walk",
        sentence: "I like to walk in the park.",
        portuguese: "Caminhar",
        spanish: "Caminar",
        translation_pt: "Eu gosto de caminhar no parque.",
        translation_es: "Me gusta caminar por el parque."
    },
    {
        word: "Run",
        sentence: "He runs every morning to stay fit.",
        portuguese: "Correr",
        spanish: "Correr",
        translation_pt: "Ele corre toda manhã para se manter em forma.",
        translation_es: "Él corre todas las mañanas para mantenerse en forma."
    },
    {
        word: "Sit",
        sentence: "Please sit down and relax.",
        portuguese: "Sentar",
        spanish: "Sentarse",
        translation_pt: "Por favor, sente-se e relaxe.",
        translation_es: "Por favor, siéntate y relájate."
    },
    {
        word: "Stand",
        sentence: "Everyone stood up when the music started.",
        portuguese: "Ficar em pé",
        spanish: "Estar de pie/Pararse",
        translation_pt: "Todos se levantaram quando a música começou.",
        translation_es: "Todos se pusieron de pie cuando la música empezó."
    },
    {
        word: "Lie down",
        sentence: "I need to lie down for a bit.",
        portuguese: "Deitar",
        spanish: "Acostarse",
        translation_pt: "Eu preciso deitar um pouco.",
        translation_es: "Necesito acostarme un rato."
    },
    {
        word: "Breathe",
        sentence: "Take a deep breath.",
        portuguese: "Respirar",
        spanish: "Respirar",
        translation_pt: "Respire fundo.",
        translation_es: "Respira hondo."
    },
    {
        word: "Hear",
        sentence: "Can you hear the music?",
        portuguese: "Ouvir",
        spanish: "Oír",
        translation_pt: "Você consegue ouvir a música?",
        translation_es: "¿Puedes oír la música?"
    },
    {
        word: "Touch",
        sentence: "Don't touch the wet paint.",
        portuguese: "Tocar",
        spanish: "Tocar",
        translation_pt: "Não toque na tinta molhada.",
        translation_es: "No toques la pintura mojada."
    },
    {
        word: "Smell",
        sentence: "That flower smells wonderful.",
        portuguese: "Cheirar",
        spanish: "Oler",
        translation_pt: "Aquela flor cheira maravilhosamente.",
        translation_es: "Esa flor huele de maravilla."
    },
    {
        word: "Taste",
        sentence: "This soup tastes delicious.",
        portuguese: "Provar/Ter gosto",
        spanish: "Probar/Saber a",
        translation_pt: "Esta sopa tem um gosto delicioso.",
        translation_es: "Esta sopa sabe deliciosa."
    },
    {
        word: "See",
        sentence: "I can see the mountains from here.",
        portuguese: "Ver",
        spanish: "Ver",
        translation_pt: "Eu consigo ver as montanhas daqui.",
        translation_es: "Puedo ver las montañas desde aquí."
    },
    {
        word: "Feel",
        sentence: "How do you feel today?",
        portuguese: "Sentir",
        spanish: "Sentir",
        translation_pt: "Como você se sente hoje?",
        translation_es: "¿Cómo te sientes hoy?"
    },
    {
        word: "Hurt",
        sentence: "My knee hurts after the fall.",
        portuguese: "Doer/Machucar",
        spanish: "Doler/Herir",
        translation_pt: "Meu joelho dói depois da queda.",
        translation_es: "Me duele la rodilla después de la caída."
    },

    // Condições e Sentimentos (físicos)
    {
        word: "Sick",
        sentence: "I feel a bit sick today.",
        portuguese: "Doente",
        spanish: "Enfermo/a",
        translation_pt: "Me sinto um pouco doente hoje.",
        translation_es: "Me siento un poco enfermo/a hoy."
    },
    {
        word: "Healthy",
        sentence: "Eating well keeps you healthy.",
        portuguese: "Saudável",
        spanish: "Saludable",
        translation_pt: "Comer bem te mantém saudável.",
        translation_es: "Comer bien te mantiene saludable."
    },
    {
        word: "Tired",
        sentence: "I'm very tired after a long day.",
        portuguese: "Cansado/a",
        spanish: "Cansado/a",
        translation_pt: "Estou muito cansado depois de um longo dia.",
        translation_es: "Estoy muy cansado/a después de un largo día."
    },
    {
        word: "Strong",
        sentence: "He is strong from lifting weights.",
        portuguese: "Forte",
        spanish: "Fuerte",
        translation_pt: "Ele é forte por levantar pesos.",
        translation_es: "Él es fuerte por levantar pesas."
    },
    {
        word: "Weak",
        sentence: "I feel weak after being sick.",
        portuguese: "Fraco/a",
        spanish: "Débil",
        translation_pt: "Me sinto fraco depois de ficar doente.",
        translation_es: "Me siento débil después de estar enfermo/a."
    },
    {
        word: "Pain",
        sentence: "She felt a sharp pain in her arm.",
        portuguese: "Dor",
        spanish: "Dolor",
        translation_pt: "Ela sentiu uma dor aguda no braço.",
        translation_es: "Ella sintió un dolor agudo en su brazo."
    },
    {
        word: "Sleepy",
        sentence: "I'm feeling sleepy, I should go to bed.",
        portuguese: "Com sono",
        spanish: "Con sueño",
        translation_pt: "Estou com sono, devo ir para a cama.",
        translation_es: "Tengo sueño, debería ir a la cama."
    },
    // Adicione mais palavras aqui para chegar a 500+, seguindo o mesmo formato.
    // Lembre-se de adicionar uma vírgula (,) após cada objeto, exceto o último da lista.

    // --- Palavras de uso cotidiano (com foco em SUPERMERCADO) ---

    // Lugares e Estrutura do Supermercado
    {
        word: "Supermarket",
        sentence: "I need to go to the supermarket to buy groceries.",
        portuguese: "Supermercado",
        spanish: "Supermercado",
        translation_pt: "Eu preciso ir ao supermercado para comprar mantimentos.",
        translation_es: "Necesito ir al supermercado a comprar comestibles."
    },
    {
        word: "Grocery store",
        sentence: "This grocery store has a great selection of fresh produce.",
        portuguese: "Mercado/Mercearia",
        spanish: "Tienda de comestibles",
        translation_pt: "Este mercado tem uma ótima seleção de produtos frescos.",
        translation_es: "Esta tienda de comestibles tiene una gran selección de productos frescos."
    },
    {
        word: "Cart",
        sentence: "Grab a shopping cart at the entrance.",
        portuguese: "Carrinho de compras",
        spanish: "Carrito de compras",
        translation_pt: "Pegue um carrinho de compras na entrada.",
        translation_es: "Toma un carrito de compras en la entrada."
    },
    {
        word: "Basket",
        sentence: "I only need a few items, so I'll take a basket.",
        portuguese: "Cesta de compras",
        spanish: "Cesta de compras",
        translation_pt: "Eu só preciso de alguns itens, então vou pegar uma cesta.",
        translation_es: "Solo necesito algunos artículos, así que tomaré una cesta."
    },
    {
        word: "Aisle",
        sentence: "The pasta is in aisle 5.",
        portuguese: "Corredor",
        spanish: "Pasillo",
        translation_pt: "O macarrão está no corredor 5.",
        translation_es: "La pasta está en el pasillo 5."
    },
    {
        word: "Checkout",
        sentence: "The checkout lines are very long today.",
        portuguese: "Caixa (local de pagamento)",
        spanish: "Caja",
        translation_pt: "As filas do caixa estão muito longas hoje.",
        translation_es: "Las filas de la caja están muy largas hoy."
    },
    {
        word: "Cashier",
        sentence: "The cashier scanned all my items quickly.",
        portuguese: "Caixa (pessoa)",
        spanish: "Cajero/a",
        translation_pt: "O caixa escaneou todos os meus itens rapidamente.",
        translation_es: "El cajero escaneó todos mis artículos rápidamente."
    },
    {
        word: "Receipt",
        sentence: "Don't forget your receipt.",
        portuguese: "Recibo/Nota fiscal",
        spanish: "Recibo/Ticket",
        translation_pt: "Não esqueça seu recibo.",
        translation_es: "No olvides tu recibo."
    },
    {
        word: "Produce section",
        sentence: "You can find fresh fruits and vegetables in the produce section.",
        portuguese: "Seção de hortifrúti",
        spanish: "Sección de frutas y verduras",
        translation_pt: "Você pode encontrar frutas e vegetais frescos na seção de hortifrúti.",
        translation_es: "Puedes encontrar frutas y verduras frescas en la sección de frutas y verduras."
    },
    {
        word: "Bakery",
        sentence: "The bakery smells wonderful with fresh bread.",
        portuguese: "Padaria",
        spanish: "Panadería",
        translation_pt: "A padaria cheira maravilhosamente com pão fresco.",
        translation_es: "La panadería huele de maravilla con pan fresco."
    },
    {
        word: "Deli",
        sentence: "I'll get some sliced ham from the deli.",
        portuguese: "Frios/Rotisseria",
        spanish: "Charcutería/Deli",
        translation_pt: "Vou pegar um pouco de presunto fatiado no setor de frios.",
        translation_es: "Conseguiré un poco de jamón en lonchas de la charcutería."
    },
    {
        word: "Dairy",
        sentence: "Milk and yogurt are in the dairy section.",
        portuguese: "Laticínios",
        spanish: "Lácteos",
        translation_pt: "Leite e iogurte estão na seção de laticínios.",
        translation_es: "La leche y el yogur están en la sección de lácteos."
    },
    {
        word: "Frozen food",
        sentence: "We need some frozen vegetables.",
        portuguese: "Alimentos congelados",
        spanish: "Alimentos congelados",
        translation_pt: "Precisamos de alguns vegetais congelados.",
        translation_es: "Necesitamos algunas verduras congeladas."
    },

    // Ações de Compra
    {
        word: "Buy",
        sentence: "I need to buy some groceries.",
        portuguese: "Comprar",
        spanish: "Comprar",
        translation_pt: "Eu preciso comprar alguns mantimentos.",
        translation_es: "Necesito comprar algunos comestibles."
    },
    {
        word: "Shop",
        sentence: "Let's go shopping for clothes.",
        portuguese: "Fazer compras",
        spanish: "Ir de compras",
        translation_pt: "Vamos fazer compras de roupas.",
        translation_es: "Vamos de compras de ropa."
    },
    {
        word: "Pay",
        sentence: "How would you like to pay?",
        portuguese: "Pagar",
        spanish: "Pagar",
        translation_pt: "Como você gostaria de pagar?",
        translation_es: "¿Cómo le gustaría pagar?"
    },
    {
        word: "Save",
        sentence: "I try to save money by buying items on sale.",
        portuguese: "Economizar/Poupar",
        spanish: "Ahorrar",
        translation_pt: "Eu tento economizar dinheiro comprando itens em promoção.",
        translation_es: "Intento ahorrar dinero comprando artículos en oferta."
    },
    {
        word: "Spend",
        sentence: "Don't spend too much money at the supermarket.",
        portuguese: "Gastar",
        spanish: "Gastar",
        translation_pt: "Não gaste muito dinheiro no supermercado.",
        translation_es: "No gastes demasiado dinero en el supermercado."
    },
    {
        word: "Compare prices",
        sentence: "It's smart to compare prices before buying.",
        portuguese: "Comparar preços",
        spanish: "Comparar precios",
        translation_pt: "É inteligente comparar preços antes de comprar.",
        translation_es: "Es inteligente comparar precios antes de comprar."
    },
    {
        word: "Carry",
        sentence: "Can you help me carry these bags?",
        portuguese: "Carregar",
        spanish: "Cargar/Llevar",
        translation_pt: "Você pode me ajudar a carregar essas sacolas?",
        translation_es: "¿Puedes ayudarme a cargar estas bolsas?"
    },

    // Produtos e Termos Comuns de Supermercado
    {
        word: "Groceries",
        sentence: "We need to get a lot of groceries for the week.",
        portuguese: "Mantimentos/Compras de supermercado",
        spanish: "Comestibles",
        translation_pt: "Precisamos comprar muitos mantimentos para a semana.",
        translation_es: "Necesitamos comprar muchos comestibles para la semana."
    },
    {
        word: "Fresh",
        sentence: "I prefer fresh vegetables.",
        portuguese: "Fresco",
        spanish: "Fresco/a",
        translation_pt: "Eu prefiro vegetais frescos.",
        translation_es: "Prefiero las verduras frescas."
    },
    {
        word: "Organic",
        sentence: "Organic food is often more expensive.",
        portuguese: "Orgânico",
        spanish: "Orgánico/a",
        translation_pt: "Comida orgânica é frequentemente mais cara.",
        translation_es: "La comida orgánica es a menudo más cara."
    },
    {
        word: "Sale",
        sentence: "There's a big sale on cereals this week.",
        portuguese: "Promoção/Liquidação",
        spanish: "Oferta/Rebaja",
        translation_pt: "Há uma grande promoção de cereais esta semana.",
        translation_es: "Hay una gran oferta de cereales esta semana."
    },
    {
        word: "Discount",
        sentence: "Do you have a student discount?",
        portuguese: "Desconto",
        spanish: "Descuento",
        translation_pt: "Você tem desconto de estudante?",
        translation_es: "¿Tienes descuento de estudiante?"
    },
    {
        word: "Brand",
        sentence: "What is your favorite brand of coffee?",
        portuguese: "Marca",
        spanish: "Marca",
        translation_pt: "Qual é a sua marca favorita de café?",
        translation_es: "¿Cuál es tu marca de café favorita?"
    },
    {
        word: "Coupon",
        sentence: "I used a coupon to save money.",
        portuguese: "Cupom",
        spanish: "Cupón",
        translation_pt: "Eu usei um cupom para economizar dinheiro.",
        translation_es: "Usé un cupón para ahorrar dinero."
    },
    {
        word: "Bags",
        sentence: "Do you need any bags for your groceries?",
        portuguese: "Sacolas",
        spanish: "Bolsas",
        translation_pt: "Você precisa de sacolas para seus mantimentos?",
        translation_es: "¿Necesitas bolsas para tus comestibles?"
    },
    {
        word: "Change",
        sentence: "The cashier gave me too much change.",
        portuguese: "Troco",
        spanish: "Cambio",
        translation_pt: "O caixa me deu muito troco.",
        translation_es: "El cajero me dio demasiado cambio."
    },
    // Adicione mais palavras aqui para chegar a 500+, seguindo o mesmo formato.
    // Lembre-se de adicionar uma vírgula (,) após cada objeto, exceto o último da lista.
    
    // --- Palavras de uso cotidiano (com foco em TRABALHO EM GERAL) ---

    // Lugares e Organização do Trabalho
    {
        word: "Work",
        sentence: "I have a lot of work to do today.",
        portuguese: "Trabalho",
        spanish: "Trabajo",
        translation_pt: "Eu tenho muito trabalho para fazer hoje.",
        translation_es: "Tengo mucho trabajo que hacer hoy."
    },
    {
        word: "Job",
        sentence: "He's looking for a new job.",
        portuguese: "Emprego",
        spanish: "Empleo/Trabajo",
        translation_pt: "Ele está procurando um novo emprego.",
        translation_es: "Él está buscando un nuevo empleo."
    },
    {
        word: "Office",
        sentence: "My office is on the third floor.",
        portuguese: "Escritório",
        spanish: "Oficina",
        translation_pt: "Meu escritório fica no terceiro andar.",
        translation_es: "Mi oficina está en el tercer piso."
    },
    {
        word: "Company",
        sentence: "She works for a big tech company.",
        portuguese: "Empresa",
        spanish: "Empresa",
        translation_pt: "Ela trabalha para uma grande empresa de tecnologia.",
        translation_es: "Ella trabaja para una gran empresa de tecnología."
    },
    {
        word: "Meeting",
        sentence: "We have a team meeting every Monday.",
        portuguese: "Reunião",
        spanish: "Reunión",
        translation_pt: "Nós temos uma reunião de equipe toda segunda-feira.",
        translation_es: "Tenemos una reunión de equipo todos los lunes."
    },
    {
        word: "Colleague",
        sentence: "My colleagues are very supportive.",
        portuguese: "Colega de trabalho",
        spanish: "Colega/Compañero de trabajo",
        translation_pt: "Meus colegas de trabalho são muito prestativos.",
        translation_es: "Mis colegas de trabajo son muy comprensivos."
    },
    {
        word: "Boss",
        sentence: "My boss approved my vacation request.",
        portuguese: "Chefe",
        spanish: "Jefe/a",
        translation_pt: "Meu chefe aprovou meu pedido de férias.",
        translation_es: "Mi jefe aprobó mi solicitud de vacaciones."
    },
    {
        word: "Client",
        sentence: "We need to schedule a call with the new client.",
        portuguese: "Cliente",
        spanish: "Cliente/a",
        translation_pt: "Precisamos agendar uma ligação com o novo cliente.",
        translation_es: "Necesitamos programar una llamada con el nuevo cliente."
    },
    {
        word: "Project",
        sentence: "The new project starts next week.",
        portuguese: "Projeto",
        spanish: "Proyecto",
        translation_pt: "O novo projeto começa na próxima semana.",
        translation_es: "El nuevo proyecto comienza la próxima semana."
    },
    {
        word: "Deadline",
        sentence: "The deadline for this report is Friday.",
        portuguese: "Prazo final",
        spanish: "Fecha límite",
        translation_pt: "O prazo final para este relatório é sexta-feira.",
        translation_es: "La fecha límite para este informe es el viernes."
    },
    {
        word: "Task",
        sentence: "I have several tasks to complete today.",
        portuguese: "Tarefa",
        spanish: "Tarea",
        translation_pt: "Eu tenho várias tarefas para completar hoje.",
        translation_es: "Tengo varias tareas que completar hoy."
    },

    // Ações e Verbos Relacionados ao Trabalho
    {
        word: "Work (verb)",
        sentence: "I work from 9 to 5 every day.",
        portuguese: "Trabalhar",
        spanish: "Trabajar",
        translation_pt: "Eu trabalho das 9 às 5 todos os dias.",
        translation_es: "Trabajo de 9 a 5 todos los días."
    },
    {
        word: "Manage",
        sentence: "She manages a team of designers.",
        portuguese: "Gerenciar/Administrar",
        spanish: "Gestionar/Administrar",
        translation_pt: "Ela gerencia uma equipe de designers.",
        translation_es: "Ella gestiona un equipo de diseñadores."
    },
    {
        word: "Schedule",
        sentence: "I need to schedule an appointment with the doctor.",
        portuguese: "Agendar/Programar",
        spanish: "Programar/Agendar",
        translation_pt: "Eu preciso agendar uma consulta com o médico.",
        translation_es: "Necesito programar una cita con el médico."
    },
    {
        word: "Organize",
        sentence: "It's important to organize your files.",
        portuguese: "Organizar",
        spanish: "Organizar",
        translation_pt: "É importante organizar seus arquivos.",
        translation_es: "Es importante organizar tus archivos."
    },
    {
        word: "Plan",
        sentence: "Let's plan the next steps for the project.",
        portuguese: "Planejar",
        spanish: "Planificar",
        translation_pt: "Vamos planejar os próximos passos para o projeto.",
        translation_es: "Vamos a planificar los próximos pasos para el proyecto."
    },
    {
        word: "Report",
        sentence: "I have to report to my manager every Friday.",
        portuguese: "Reportar",
        spanish: "Informar/Reportar",
        translation_pt: "Eu tenho que me reportar ao meu gerente toda sexta-feira.",
        translation_es: "Tengo que informar a mi gerente todos los viernes."
    },
    {
        word: "Communicate",
        sentence: "Good communication is key in a team.",
        portuguese: "Comunicar",
        spanish: "Comunicar",
        translation_pt: "Boa comunicação é fundamental em uma equipe.",
        translation_es: "Una buena comunicación es clave en un equipo."
    },
    {
        word: "Collaborate",
        sentence: "We need to collaborate more on this task.",
        portuguese: "Colaborar",
        spanish: "Colaborar",
        translation_pt: "Precisamos colaborar mais nesta tarefa.",
        translation_es: "Necesitamos colaborar más en esta tarea."
    },
    {
        word: "Present",
        sentence: "She will present the results tomorrow.",
        portuguese: "Apresentar",
        spanish: "Presentar",
        translation_pt: "Ela vai apresentar os resultados amanhã.",
        translation_es: "Ella presentará los resultados mañana."
    },
    {
        word: "Develop",
        sentence: "We need to develop new skills.",
        portuguese: "Desenvolver",
        spanish: "Desarrollar",
        translation_pt: "Precisamos desenvolver novas habilidades.",
        translation_es: "Necesitamos desarrollar nuevas habilidades."
    },
    {
        word: "Train",
        sentence: "The company provides training for new employees.",
        portuguese: "Treinar",
        spanish: "Entrenar/Capacitar",
        translation_pt: "A empresa oferece treinamento para novos funcionários.",
        translation_es: "La empresa ofrece capacitación para nuevos empleados."
    },

    // Conceitos e Adjetivos Relacionados ao Trabalho
    {
        word: "Career",
        sentence: "She's building a successful career.",
        portuguese: "Carreira",
        spanish: "Carrera",
        translation_pt: "Ela está construindo uma carreira de sucesso.",
        translation_es: "Ella está construyendo una carrera exitosa."
    },
    {
        word: "Salary",
        sentence: "His new salary is much higher.",
        portuguese: "Salário",
        spanish: "Salario",
        translation_pt: "O novo salário dele é muito mais alto.",
        translation_es: "Su nuevo salario es mucho más alto."
    },
    {
        word: "Experience",
        sentence: "Do you have experience in this field?",
        portuguese: "Experiência",
        spanish: "Experiencia",
        translation_pt: "Você tem experiência nesta área?",
        translation_es: "¿Tienes experiencia en este campo?"
    },
    {
        word: "Skill",
        sentence: "Communication is a vital skill for this role.",
        portuguese: "Habilidade",
        spanish: "Habilidad",
        translation_pt: "Comunicação é uma habilidade vital para esta função.",
        translation_es: "La comunicación es una habilidad vital para este puesto."
    },
    {
        word: "Productive",
        sentence: "I had a very productive day at work.",
        portuguese: "Produtivo/a",
        spanish: "Productivo/a",
        translation_pt: "Eu tive um dia muito produtivo no trabalho.",
        translation_es: "Tuve un día muy productivo en el trabajo."
    },
    {
        word: "Efficient",
        sentence: "We need to find more efficient ways to do this.",
        portuguese: "Eficiente",
        spanish: "Eficiente",
        translation_pt: "Precisamos encontrar maneiras mais eficientes de fazer isso.",
        translation_es: "Necesitamos encontrar formas más eficientes de hacer esto."
    },
    {
        word: "Busy",
        sentence: "I'm very busy with my new project.",
        portuguese: "Ocupado/a",
        spanish: "Ocupado/a",
        translation_pt: "Estou muito ocupado com meu novo projeto.",
        translation_es: "Estoy muy ocupado/a con mi nuevo proyecto."
    },
    {
        word: "Break",
        sentence: "I'm going to take a short break.",
        portuguese: "Intervalo/Pausa",
        spanish: "Descanso/Pausa",
        translation_pt: "Vou fazer uma pequena pausa.",
        translation_es: "Voy a tomar un breve descanso."
    },
    {
        word: "Overtime",
        sentence: "I had to work overtime to finish the report.",
        portuguese: "Hora extra",
        spanish: "Horas extras",
        translation_pt: "Tive que fazer hora extra para terminar o relatório.",
        translation_es: "Tuve que trabajar horas extras para terminar el informe."
    },
    // Adicione mais palavras aqui para chegar a 500+, seguindo o mesmo formato.
    // Lembre-se de adicionar uma vírgula (,) após cada objeto, exceto o último da lista.


    // --- Palavras de uso cotidiano (com foco em TRANSPORTE E VIAGEM) ---

    // Meios de Transporte
    {
        word: "Car",
        sentence: "I drive my car to work every day.",
        portuguese: "Carro",
        spanish: "Coche/Carro",
        translation_pt: "Eu dirijo meu carro para o trabalho todos os dias.",
        translation_es: "Conduzco mi coche al trabajo todos los días."
    },
    {
        word: "Bus",
        sentence: "The bus stop is just around the corner.",
        portuguese: "Ônibus",
        spanish: "Autobús",
        translation_pt: "O ponto de ônibus fica logo na esquina.",
        translation_es: "La parada de autobús está a la vuelta de la esquina."
    },
    {
        word: "Train",
        sentence: "We took the train to the city center.",
        portuguese: "Trem",
        spanish: "Tren",
        translation_pt: "Pegamos o trem para o centro da cidade.",
        translation_es: "Tomamos el tren al centro de la ciudad."
    },
    {
        word: "Airplane",
        sentence: "Traveling by airplane is very fast.",
        portuguese: "Avião",
        spanish: "Avión",
        translation_pt: "Viajar de avião é muito rápido.",
        translation_es: "Viajar en avión es muy rápido."
    },
    {
        word: "Bicycle",
        sentence: "She rides her bicycle to the park.",
        portuguese: "Bicicleta",
        spanish: "Bicicleta",
        translation_pt: "Ela anda de bicicleta até o parque.",
        translation_es: "Ella monta su bicicleta al parque."
    },
    {
        word: "Subway",
        sentence: "The fastest way to get there is by subway.",
        portuguese: "Metrô",
        spanish: "Metro",
        translation_pt: "A maneira mais rápida de chegar lá é de metrô.",
        translation_es: "La forma más rápida de llegar allí es en metro."
    },
    {
        word: "Motorcycle",
        sentence: "He bought a new motorcycle last month.",
        portuguese: "Moto",
        spanish: "Motocicleta",
        translation_pt: "Ele comprou uma moto nova no mês passado.",
        translation_es: "Él compró una motocicleta nueva el mes pasado."
    },

    // Ações de Transporte e Viagem
    {
        word: "Go",
        sentence: "I need to go to the airport.",
        portuguese: "Ir",
        spanish: "Ir",
        translation_pt: "Eu preciso ir para o aeroporto.",
        translation_es: "Necesito ir al aeropuerto."
    },
    {
        word: "Drive",
        sentence: "Can you drive me to the station?",
        portuguese: "Dirigir",
        spanish: "Conducir",
        translation_pt: "Você pode me levar de carro até a estação?",
        translation_es: "¿Puedes llevarme en coche a la estación?"
    },
    {
        word: "Ride",
        sentence: "He loves to ride his bike.",
        portuguese: "Andar (de bicicleta/moto/cavalo)",
        spanish: "Montar",
        translation_pt: "Ele adora andar de bicicleta.",
        translation_es: "A él le encanta montar en bicicleta."
    },
    {
        word: "Travel",
        sentence: "We love to travel to new countries.",
        portuguese: "Viajar",
        spanish: "Viajar",
        translation_pt: "Nós amamos viajar para novos países.",
        translation_es: "Nos encanta viajar a nuevos países."
    },
    {
        word: "Depart",
        sentence: "The train departs at 7 PM.",
        portuguese: "Partir/Embarcar",
        spanish: "Partir/Salir",
        translation_pt: "O trem parte às 19h.",
        translation_es: "El tren sale a las 7 PM."
    },
    {
        word: "Arrive",
        sentence: "What time do you arrive?",
        portuguese: "Chegar",
        spanish: "Llegar",
        translation_pt: "A que horas você chega?",
        translation_es: "¿A qué hora llegas?"
    },
    {
        word: "Walk",
        sentence: "It's too far to walk, let's take a taxi.",
        portuguese: "Caminhar",
        spanish: "Caminar",
        translation_pt: "É muito longe para ir a pé, vamos pegar um táxi.",
        translation_es: "Está demasiado lejos para caminar, tomemos un taxi."
    },

    // Locais e Termos de Viagem
    {
        word: "Airport",
        sentence: "I'll pick you up at the airport.",
        portuguese: "Aeroporto",
        spanish: "Aeropuerto",
        translation_pt: "Eu vou te buscar no aeroporto.",
        translation_es: "Te recogeré en el aeropuerto."
    },
    {
        word: "Station",
        sentence: "The train station is very busy.",
        portedWord: "Estação (de trem/ônibus)",
        portuguese: "Estação",
        spanish: "Estación",
        translation_pt: "A estação de trem é muito movimentada.",
        translation_es: "La estación de tren está muy concurrida."
    },
    {
        word: "Ticket",
        sentence: "I need to buy a ticket for the bus.",
        portuguese: "Passagem/Bilhete",
        spanish: "Billete/Boleto",
        translation_pt: "Eu preciso comprar uma passagem de ônibus.",
        translation_es: "Necesito comprar un billete de autobús."
    },
    {
        word: "Luggage",
        sentence: "Be careful with your luggage.",
        portuguese: "Bagagem",
        spanish: "Equipaje",
        translation_pt: "Tenha cuidado com sua bagagem.",
        translation_es: "Ten cuidado con tu equipaje."
    },
    {
        word: "Map",
        sentence: "Let's check the map to find the way.",
        portuguese: "Mapa",
        spanish: "Mapa",
        translation_pt: "Vamos verificar o mapa para encontrar o caminho.",
        translation_es: "Consultemos el mapa para encontrar el camino."
    },
    {
        word: "Direction",
        sentence: "Could you give me directions to the library?",
        portuguese: "Direção",
        spanish: "Dirección",
        translation_pt: "Você poderia me dar as direções para a biblioteca?",
        translation_es: "¿Podrías darme las indicaciones para la biblioteca?"
    },
    {
        word: "Road",
        sentence: "The road is very busy during rush hour.",
        portuguese: "Estrada/Rua",
        spanish: "Carretera/Calle",
        translation_pt: "A estrada está muito movimentada durante o horário de pico.",
        translation_es: "La carretera está muy transitada durante la hora pico."
    },
    {
        word: "Street",
        sentence: "My house is on this street.",
        portuguese: "Rua",
        spanish: "Calle",
        translation_pt: "Minha casa fica nesta rua.",
        translation_es: "Mi casa está en esta calle."
    },
    {
        word: "Trip",
        sentence: "We're planning a trip to the beach.",
        portuguese: "Viagem",
        spanish: "Viaje",
        translation_pt: "Estamos planejando uma viagem para a praia.",
        translation_es: "Estamos planeando un viaje a la playa."
    },
    {
        word: "Vacation",
        sentence: "I'm looking forward to my summer vacation.",
        portuguese: "Férias",
        spanish: "Vacaciones",
        translation_pt: "Estou ansioso pelas minhas férias de verão.",
        translation_es: "Estoy deseando mis vacaciones de verano."
    },
    // Adicione mais palavras aqui para chegar a 500+, seguindo o mesmo formato.
    // Lembre-se de adicionar uma vírgula (,) após cada objeto, exceto o último da lista.


    // --- Palavras de uso cotidiano (com foco em EDUCAÇÃO E APRENDIZADO) ---

    // Locais e Instituições
    {
        word: "School",
        sentence: "My children go to school every morning.",
        portuguese: "Escola",
        spanish: "Escuela",
        translation_pt: "Meus filhos vão para a escola todas as manhãs.",
        translation_es: "Mis hijos van a la escuela todas las mañanas."
    },
    {
        word: "University",
        sentence: "She plans to study at university next year.",
        portuguese: "Universidade",
        spanish: "Universidad",
        translation_pt: "Ela planeja estudar na universidade no próximo ano.",
        translation_es: "Ella planea estudiar en la universidad el próximo año."
    },
    {
        word: "Class",
        sentence: "I have an English class at 10 AM.",
        portuguese: "Aula/Turma",
        spanish: "Clase",
        translation_pt: "Eu tenho uma aula de inglês às 10h.",
        translation_es: "Tengo una clase de inglés a las 10 AM."
    },
    {
        word: "Library",
        sentence: "You can find many books in the library.",
        portuguese: "Biblioteca",
        spanish: "Biblioteca",
        translation_pt: "Você pode encontrar muitos livros na biblioteca.",
        translation_es: "Puedes encontrar muchos libros en la biblioteca."
    },
    {
        word: "Classroom",
        sentence: "The teacher wrote on the board in the classroom.",
        portuguese: "Sala de aula",
        spanish: "Aula/Clase",
        translation_pt: "O professor escreveu no quadro na sala de aula.",
        translation_es: "El profesor escribió en la pizarra en el aula."
    },

    // Pessoas e Papéis
    {
        word: "Teacher",
        sentence: "Our math teacher explains things very well.",
        portuguese: "Professor/a",
        spanish: "Profesor/a",
        translation_pt: "Nosso professor de matemática explica muito bem.",
        translation_es: "Nuestro profesor de matemáticas explica muy bien."
    },
    {
        word: "Student",
        sentence: "He is a diligent student.",
        portuguese: "Aluno/a",
        spanish: "Estudiante",
        translation_pt: "Ele é um aluno diligente.",
        translation_es: "Él es un estudiante diligente."
    },
    {
        word: "Principal",
        sentence: "The principal greeted the new students.",
        portuguese: "Diretor/a (de escola)",
        spanish: "Director/a",
        translation_pt: "O diretor cumprimentou os novos alunos.",
        translation_es: "El director saludó a los nuevos estudiantes."
    },

    // Materiais e Componentes do Estudo
    {
        word: "Book",
        sentence: "I'm reading an interesting book.",
        portuguese: "Livro",
        spanish: "Libro",
        translation_pt: "Estou lendo um livro interessante.",
        translation_es: "Estoy leyendo un libro interesante."
    },
    {
        word: "Notebook",
        sentence: "Please write your notes in your notebook.",
        portuguese: "Caderno",
        spanish: "Cuaderno",
        translation_pt: "Por favor, escreva suas anotações no seu caderno.",
        translation_es: "Por favor, escribe tus notas en tu cuaderno."
    },
    {
        word: "Pen",
        sentence: "Can I borrow your pen?",
        portuguese: "Caneta",
        spanish: "Bolígrafo/Pluma",
        translation_pt: "Posso pegar sua caneta emprestada?",
        translation_es: "¿Puedo tomar prestado tu bolígrafo?"
    },
    {
        word: "Pencil",
        sentence: "I need a pencil to draw.",
        portuguese: "Lápis",
        spanish: "Lápiz",
        translation_pt: "Eu preciso de um lápis para desenhar.",
        translation_es: "Necesito un lápiz para dibujar."
    },
    {
        word: "Paper",
        sentence: "Write your answer on a piece of paper.",
        portuguese: "Papel",
        spanish: "Papel",
        translation_pt: "Escreva sua resposta em um pedaço de papel.",
        translation_es: "Escribe tu respuesta en un trozo de papel."
    },
    {
        word: "Homework",
        sentence: "Don't forget to do your homework.",
        portuguese: "Tarefa de casa",
        spanish: "Tarea",
        translation_pt: "Não se esqueça de fazer sua tarefa de casa.",
        translation_es: "No olvides hacer tu tarea."
    },
    {
        word: "Exam",
        sentence: "I have a big exam next week.",
        portuguese: "Exame/Prova",
        spanish: "Examen",
        translation_pt: "Eu tenho uma grande prova na próxima semana.",
        translation_es: "Tengo un gran examen la próxima semana."
    },
    {
        word: "Grade",
        sentence: "She got a good grade on her essay.",
        portuguese: "Nota (escolar)",
        spanish: "Nota/Calificación",
        translation_pt: "Ela tirou uma boa nota em sua redação.",
        translation_es: "Ella obtuvo una buena nota en su ensayo."
    },
    {
        word: "Subject",
        sentence: "What is your favorite subject in school?",
        portuguese: "Matéria (escolar)",
        spanish: "Materia",
        translation_pt: "Qual é a sua matéria favorita na escola?",
        translation_es: "¿Cuál es tu materia favorita en la escuela?"
    },

    // Ações de Aprendizado
    {
        word: "Study",
        sentence: "I need to study for my history exam.",
        portuguese: "Estudar",
        spanish: "Estudiar",
        translation_pt: "Eu preciso estudar para minha prova de história.",
        translation_es: "Necesito estudiar para mi examen de historia."
    },
    {
        word: "Learn",
        sentence: "It's never too late to learn a new language.",
        portuguese: "Aprender",
        spanish: "Aprender",
        translation_pt: "Nunca é tarde para aprender uma nova língua.",
        translation_es: "Nunca es tarde para aprender un nuevo idioma."
    },
    {
        word: "Read",
        sentence: "He loves to read before bed.",
        portuguese: "Ler",
        spanish: "Leer",
        translation_pt: "Ele adora ler antes de dormir.",
        translation_es: "A él le encanta leer antes de dormir."
    },
    {
        word: "Write",
        sentence: "Please write your name clearly.",
        portuguese: "Escrever",
        spanish: "Escribir",
        translation_pt: "Por favor, escreva seu nome claramente.",
        translation_es: "Por favor, escribe tu nombre claramente."
    },
    {
        word: "Understand",
        sentence: "Do you understand the lesson?",
        portuguese: "Entender",
        spanish: "Entender/Comprender",
        translation_pt: "Você entende a lição?",
        translation_es: "¿Entiendes la lección?"
    },
    {
        word: "Explain",
        sentence: "Can you explain that again?",
        portuguese: "Explicar",
        spanish: "Explicar",
        translation_pt: "Você pode explicar isso de novo?",
        translation_es: "¿Puedes explicar eso de nuevo?"
    },
    {
        word: "Teach",
        sentence: "She wants to teach English abroad.",
        portuguese: "Ensinar",
        spanish: "Enseñar",
        translation_pt: "Ela quer ensinar inglês no exterior.",
        translation_es: "Ella quiere enseñar inglés en el extranjero."
    },
    {
        word: "Practice",
        sentence: "You need to practice every day to improve.",
        portuguese: "Praticar",
        spanish: "Practicar",
        translation_pt: "Você precisa praticar todos os dias para melhorar.",
        translation_es: "Necesitas practicar todos los días para mejorar."
    },
    // Adicione mais palavras aqui se desejar, seguindo o mesmo formato.
    // Lembre-se de adicionar uma vírgula (,) após cada objeto, exceto o último da lista.


    // Atividades e Hobbies
    {
        word: "Hobby",
        sentence: "My favorite hobby is reading.",
        portuguese: "Hobby",
        spanish: "Hobby/Afición",
        translation_pt: "Meu hobby favorito é ler.",
        translation_es: "Mi hobby favorito es leer."
    },
    {
        word: "Music",
        sentence: "I love listening to music.",
        portuguese: "Música",
        spanish: "Música",
        translation_pt: "Eu adoro ouvir música.",
        translation_es: "Me encanta escuchar música."
    },
    {
        word: "Movie",
        sentence: "Let's watch a movie tonight.",
        portuguese: "Filme",
        spanish: "Película",
        translation_pt: "Vamos assistir a um filme hoje à noite.",
        translation_es: "Vamos a ver una película esta noche."
    },
    {
        word: "Book",
        sentence: "Have you read this book?",
        portuguese: "Livro",
        spanish: "Libro",
        translation_pt: "Você já leu este livro?",
        translation_es: "¿Has leído este libro?"
    },
    {
        word: "Sport",
        sentence: "Which sport do you like to play?",
        portuguese: "Esporte",
        spanish: "Deporte",
        translation_pt: "Qual esporte você gosta de praticar?",
        translation_es: "¿Qué deporte te gusta practicar?"
    },
    {
        word: "Game",
        sentence: "Let's play a board game.",
        portuguese: "Jogo",
        spanish: "Juego",
        translation_pt: "Vamos jogar um jogo de tabuleiro.",
        translation_es: "Vamos a jugar un juego de mesa."
    },
    {
        word: "Art",
        sentence: "She enjoys visiting art museums.",
        portuguese: "Arte",
        spanish: "Arte",
        translation_pt: "Ela gosta de visitar museus de arte.",
        translation_es: "A ella le gusta visitar museos de arte."
    },
    {
        word: "Photography",
        sentence: "Photography is a great way to capture memories.",
        portuguese: "Fotografia",
        spanish: "Fotografía",
        translation_pt: "Fotografia é uma ótima maneira de registrar memórias.",
        translation_es: "La fotografía es una excelente manera de capturar recuerdos."
    },
    {
        word: "Cooking",
        sentence: "Cooking is a relaxing hobby for me.",
        portuguese: "Cozinhar/Culinária",
        spanish: "Cocina/Cocinar",
        translation_pt: "Cozinhar é um hobby relaxante para mim.",
        translation_es: "Cocinar es un hobby relajante para mí."
    },
    {
        word: "Gardening",
        sentence: "My grandparents enjoy gardening in their free time.",
        portuguese: "Jardinagem",
        spanish: "Jardinería",
        translation_pt: "Meus avós gostam de jardinagem no tempo livre.",
        translation_es: "Mis abuelos disfrutan de la jardinería en su tiempo libre."
    },

    // Locais de Lazer
    {
        word: "Park",
        sentence: "Let's go for a walk in the park.",
        portuguese: "Parque",
        spanish: "Parque",
        translation_pt: "Vamos dar uma caminhada no parque.",
        translation_es: "Vamos a dar un paseo por el parque."
    },
    {
        word: "Cinema",
        sentence: "We saw the new action movie at the cinema.",
        portuguese: "Cinema",
        spanish: "Cine",
        translation_pt: "Nós assistimos ao novo filme de ação no cinema.",
        translation_es: "Vimos la nueva película de acción en el cine."
    },
    {
        word: "Theater",
        sentence: "They went to see a play at the theater.",
        portuguese: "Teatro",
        spanish: "Teatro",
        translation_pt: "Eles foram ver uma peça no teatro.",
        translation_es: "Fueron a ver una obra de teatro en el teatro."
    },
    {
        word: "Museum",
        sentence: "The museum has many interesting historical exhibits.",
        portuguese: "Museu",
        spanish: "Museo",
        translation_pt: "O museu tem muitas exposições históricas interessantes.",
        translation_es: "El museo tiene muchas exposiciones históricas interesantes."
    },
    {
        word: "Restaurant",
        sentence: "Let's eat at that new Italian restaurant.",
        portuguese: "Restaurante",
        spanish: "Restaurante",
        translation_pt: "Vamos comer naquele novo restaurante italiano.",
        translation_es: "Vamos a comer en ese nuevo restaurante italiano."
    },
    {
        word: "Cafe",
        sentence: "I often meet my friends at the cafe.",
        portuguese: "Cafeteria",
        spanish: "Cafetería",
        translation_pt: "Eu frequentemente encontro meus amigos na cafeteria.",
        translation_es: "A menudo me encuentro con mis amigos en la cafetería."
    },

    // Ações de Lazer
    {
        word: "Play",
        sentence: "The children like to play outside.",
        portuguese: "Brincar/Jogar",
        spanish: "Jugar",
        translation_pt: "As crianças gostam de brincar lá fora.",
        translation_es: "A los niños les gusta jugar afuera."
    },
    {
        word: "Listen",
        sentence: "Listen to your favorite song.",
        portuguese: "Ouvir",
        spanish: "Escuchar",
        translation_pt: "Ouça sua música favorita.",
        translation_es: "Escucha tu canción favorita."
    },
    {
        word: "Watch",
        sentence: "I want to watch the football match.",
        portuguese: "Assistir",
        spanish: "Ver",
        translation_pt: "Eu quero assistir ao jogo de futebol.",
        translation_es: "Quiero ver el partido de fútbol."
    },
    {
        word: "Read",
        sentence: "What are you reading?",
        portuguese: "Ler",
        spanish: "Leer",
        translation_pt: "O que você está lendo?",
        translation_es: "¿Qué estás leyendo?"
    },
    {
        word: "Sing",
        sentence: "She loves to sing in the shower.",
        portuguese: "Cantar",
        spanish: "Cantar",
        translation_pt: "Ela adora cantar no chuveiro.",
        translation_es: "A ella le encanta cantar en la ducha."
    },
    {
        word: "Dance",
        sentence: "Let's dance all night!",
        portuguese: "Dançar",
        spanish: "Bailar",
        translation_pt: "Vamos dançar a noite toda!",
        translation_es: "¡Vamos a bailar toda la noche!"
    },
    {
        word: "Draw",
        sentence: "He can draw very realistic portraits.",
        portuguese: "Desenhar",
        spanish: "Dibujar",
        translation_pt: "Ele consegue desenhar retratos muito realistas.",
        translation_es: "Él puede dibujar retratos muy realistas."
    },
    {
        word: "Paint",
        sentence: "She likes to paint landscapes.",
        portuguese: "Pintar",
        spanish: "Pintar",
        translation_pt: "Ela gosta de pintar paisagens.",
        translation_es: "A ella le gusta pintar paisajes."
    },
    {
        word: "Relax",
        sentence: "I just want to relax after work.",
        portuguese: "Relaxar",
        spanish: "Relajarse",
        translation_pt: "Eu só quero relaxar depois do trabalho.",
        translation_es: "Solo quiero relajarme después del trabajo."
    },
    {
        word: "Enjoy",
        sentence: "Did you enjoy your vacation?",
        portuguese: "Aproveitar/Desfrutar",
        spanish: "Disfrutar",
        translation_pt: "Você aproveitou suas férias?",
        translation_es: "¿Disfrutaste tus vacaciones?"
    },
    // Adicione mais palavras aqui se desejar, seguindo o mesmo formato.
    // Lembre-se de adicionar uma vírgula (,) após cada objeto, exceto o último da lista.


    // --- Palavras de uso cotidiano (com foco em SENTIMENTOS E EMOÇÕES) ---
    {
        word: "Happy",
        sentence: "She was very happy when she received the news.",
        portuguese: "Feliz",
        spanish: "Feliz",
        translation_pt: "Ela ficou muito feliz quando recebeu a notícia.",
        translation_es: "Ella estaba muy feliz cuando recibió la noticia."
    },
    {
        word: "Sad",
        sentence: "He felt sad after saying goodbye.",
        portuguese: "Triste",
        spanish: "Triste",
        translation_pt: "Ele se sentiu triste depois de se despedir.",
        translation_es: "Él se sintió triste después de despedirse."
    },
    {
        word: "Angry",
        sentence: "Don't get angry over small things.",
        portuguese: "Bravo/Irritado",
        spanish: "Enojado/a",
        translation_pt: "Não fique bravo por pequenas coisas.",
        translation_es: "No te enojes por cosas pequeñas."
    },
    {
        word: "Surprised",
        sentence: "I was surprised by the sudden rain.",
        portuguese: "Surpreso/a",
        spanish: "Sorprendido/a",
        translation_pt: "Fiquei surpreso com a chuva repentina.",
        translation_es: "Me sorprendió la lluvia repentina."
    },
    {
        word: "Scared",
        sentence: "The child was scared of the dark.",
        portuguese: "Assustado/Com medo",
        spanish: "Asustado/a",
        translation_pt: "A criança estava com medo do escuro.",
        translation_es: "El niño/la niña estaba asustado/a de la oscuridad."
    },
    {
        word: "Confused",
        sentence: "I'm confused, can you explain it again?",
        portuguese: "Confuso/a",
        spanish: "Confundido/a",
        translation_pt: "Estou confuso, você pode explicar de novo?",
        translation_es: "Estoy confundido/a, ¿puedes explicarlo de nuevo?"
    },
    {
        word: "Excited",
        sentence: "We are very excited about our trip.",
        portuguese: "Animado/Entusiasmado",
        spanish: "Emocionado/a",
        translation_pt: "Estamos muito animados com nossa viagem.",
        translation_es: "Estamos muy emocionados por nuestro viaje."
    },
    {
        word: "Bored",
        sentence: "I'm bored, there's nothing to do.",
        portuguese: "Entediado/a",
        spanish: "Aburrido/a",
        translation_pt: "Estou entediado, não há nada para fazer.",
        translation_es: "Estoy aburrido/a, no hay nada que hacer."
    },
    {
        word: "Tired",
        sentence: "After a long day, I feel very tired.",
        portuguese: "Cansado/a",
        spanish: "Cansado/a",
        translation_pt: "Depois de um longo dia, me sinto muito cansado.",
        translation_es: "Después de un largo día, me siento muy cansado/a."
    },
    {
        word: "Relaxed",
        sentence: "A warm bath makes me feel relaxed.",
        portuguese: "Relaxado/a",
        spanish: "Relajado/a",
        translation_pt: "Um banho quente me faz sentir relaxado.",
        translation_es: "Un baño caliente me hace sentir relajado/a."
    },
    {
        word: "Worried",
        sentence: "She's worried about her exam results.",
        portuguese: "Preocupado/a",
        spanish: "Preocupado/a",
        translation_pt: "Ela está preocupada com os resultados do exame dela.",
        translation_es: "Ella está preocupada por los resultados de su examen."
    },
    {
        word: "Proud",
        sentence: "I'm proud of your achievements.",
        portuguese: "Orgulhoso/a",
        spanish: "Orgulloso/a",
        translation_pt: "Estou orgulhoso das suas conquistas.",
        translation_es: "Estoy orgulloso/a de tus logros."
    },
    {
        word: "Shy",
        sentence: "He is a bit shy around new people.",
        portuguese: "Tímido/a",
        spanish: "Tímido/a",
        translation_pt: "Ele é um pouco tímido perto de pessoas novas.",
        translation_es: "Él es un poco tímido/a con gente nueva."
    },
    {
        word: "Brave",
        sentence: "It was a brave decision.",
        portuguese: "Corajoso/a",
        spanish: "Valiente",
        translation_pt: "Foi uma decisão corajosa.",
        translation_es: "Fue una decisión valiente."
    },
    {
        word: "Calm",
        sentence: "Try to stay calm in difficult situations.",
        portuguese: "Calmo/a",
        spanish: "Tranquilo/a",
        translation_pt: "Tente manter a calma em situações difíceis.",
        translation_es: "Intenta mantener la calma en situaciones difíciles."
    },
    {
        word: "Nervous",
        sentence: "She felt nervous before her presentation.",
        portuguese: "Nervoso/a",
        spanish: "Nervioso/a",
        translation_pt: "Ela se sentiu nervosa antes da apresentação dela.",
        translation_es: "Ella se sintió nerviosa antes de su presentación."
    },
    {
        word: "Love (feeling)",
        sentence: "I feel so much love for my family.",
        portuguese: "Amor",
        spanish: "Amor",
        translation_pt: "Eu sinto tanto amor pela minha família.",
        translation_es: "Siento mucho amor por mi familia."
    },
    {
        word: "Hate (feeling)",
        sentence: "Hate is a very strong negative emotion.",
        portuguese: "Ódio",
        spanish: "Odio",
        translation_pt: "Ódio é uma emoção negativa muito forte.",
        translation_es: "El odio es una emoción negativa muy fuerte."
    },
    {
        word: "Joy",
        sentence: "The birth of her child brought her immense joy.",
        portuguese: "Alegria",
        spanish: "Alegría",
        translation_pt: "O nascimento de seu filho trouxe a ela uma imensa alegria.",
        translation_es: "El nacimiento de su hijo le trajo una inmensa alegría."
    },
    {
        word: "Sorrow",
        sentence: "His heart was full of sorrow.",
        portuguese: "Tristeza/Pesar",
        spanish: "Tristeza/Pesar",
        translation_pt: "O coração dele estava cheio de tristeza.",
        translation_es: "Su corazón estaba lleno de tristeza."
    },
    // Lembre-se de adicionar uma vírgula (,) após cada objeto, exceto o último da lista.


// --- Palavras de uso cotidiano (com foco em TERMOS COMUNS DE CONVERSA E CONECTORES) ---

    // Cumprimentos e Despedidas (se ainda não tiverem sido incluídos de forma específica)
    {
        word: "Hello",
        sentence: "Hello! How are you today?",
        portuguese: "Olá",
        spanish: "Hola",
        translation_pt: "Olá! Como você está hoje?",
        translation_es: "¡Hola! ¿Cómo estás hoy?"
    },
    {
        word: "Goodbye",
        sentence: "Goodbye! See you tomorrow.",
        portuguese: "Adeus/Tchau",
        spanish: "Adiós",
        translation_pt: "Adeus! Te vejo amanhã.",
        translation_es: "¡Adiós! Nos vemos mañana."
    },
    {
        word: "Please",
        sentence: "Please close the door.",
        portuguese: "Por favor",
        spanish: "Por favor",
        translation_pt: "Por favor, feche a porta.",
        translation_es: "Por favor, cierra la puerta."
    },
    {
        word: "Thank you",
        sentence: "Thank you for your help.",
        portuguese: "Obrigado/a",
        spanish: "Gracias",
        translation_pt: "Obrigado/a pela sua ajuda.",
        translation_es: "Gracias por tu ayuda."
    },
    {
        word: "Excuse me",
        sentence: "Excuse me, where is the restroom?",
        portuguese: "Com licença",
        spanish: "Con permiso/Disculpe",
        translation_pt: "Com licença, onde é o banheiro?",
        translation_es: "Con permiso, ¿dónde está el baño?"
    },
    {
        word: "Sorry",
        sentence: "I'm sorry for the mistake.",
        portuguese: "Desculpe",
        spanish: "Lo siento/Disculpa",
        translation_pt: "Desculpe pelo erro.",
        translation_es: "Lo siento por el error."
    },

    // Perguntas e Respostas Básicas
    {
        word: "Yes",
        sentence: "Yes, I agree with you.",
        portuguese: "Sim",
        spanish: "Sí",
        translation_pt: "Sim, eu concordo com você.",
        translation_es: "Sí, estoy de acuerdo contigo."
    },
    {
        word: "No",
        sentence: "No, I don't want any more coffee.",
        portuguese: "Não",
        spanish: "No",
        translation_pt: "Não, eu não quero mais café.",
        translation_es: "No, no quiero más café."
    },
    {
        word: "Maybe",
        sentence: "Maybe we can go to the park later.",
        portuguese: "Talvez",
        spanish: "Quizás/Tal vez",
        translation_pt: "Talvez possamos ir ao parque mais tarde.",
        translation_es: "Quizás podamos ir al parque más tarde."
    },
    {
        word: "What",
        sentence: "What is your name?",
        portuguese: "O quê/Qual",
        spanish: "Qué/Cuál",
        translation_pt: "Qual é o seu nome?",
        translation_es: "¿Cuál es tu nombre?"
    },
    {
        word: "Where",
        sentence: "Where are you going?",
        portuguese: "Onde",
        spanish: "Dónde",
        translation_pt: "Onde você está indo?",
        translation_es: "¿Adónde vas?"
    },
    {
        word: "When",
        sentence: "When will you arrive?",
        portuguese: "Quando",
        spanish: "Cuándo",
        translation_pt: "Quando você vai chegar?",
        translation_es: "¿Cuándo llegarás?"
    },
    {
        word: "Why",
        sentence: "Why are you sad?",
        portuguese: "Por quê",
        spanish: "Por qué",
        translation_pt: "Por que você está triste?",
        translation_es: "¿Por qué estás triste?"
    },
    {
        word: "How",
        sentence: "How do you feel today?",
        portuguese: "Como",
        spanish: "Cómo",
        translation_pt: "Como você se sente hoje?",
        translation_es: "¿Cómo te sientes hoy?"
    },
    {
        word: "Who",
        sentence: "Who is that person?",
        portuguese: "Quem",
        spanish: "Quién",
        translation_pt: "Quem é aquela pessoa?",
        translation_es: "¿Quién es esa persona?"
    },

    // Conectores e Expressões Comuns
    {
        word: "And",
        sentence: "I like coffee and tea.",
        portuguese: "E",
        spanish: "Y (e antes de i/hi)",
        translation_pt: "Eu gosto de café e chá.",
        translation_es: "Me gusta el café y el té."
    },
    {
        word: "But",
        sentence: "It's small, but very efficient.",
        portuguese: "Mas",
        spanish: "Pero",
        translation_pt: "É pequeno, mas muito eficiente.",
        translation_es: "Es pequeño, pero muy eficiente."
    },
    {
        word: "Or",
        sentence: "Do you want tea or coffee?",
        portuguese: "Ou",
        spanish: "O (u antes de o/ho)",
        translation_pt: "Você quer chá ou café?",
        translation_es: "¿Quieres té o café?"
    },
    {
        word: "So",
        sentence: "It was raining, so I stayed home.",
        portuguese: "Então/Portanto",
        spanish: "Entonces/Así que",
        translation_pt: "Estava chovendo, então fiquei em casa.",
        translation_es: "Estaba lloviendo, así que me quedé en casa."
    },
    {
        word: "Because",
        sentence: "I'm happy because I saw my friend.",
        portuguese: "Porque",
        spanish: "Porque",
        translation_pt: "Estou feliz porque vi meu amigo.",
        translation_es: "Estoy feliz porque vi a mi amigo."
    },
    {
        word: "Also",
        sentence: "I also want to go.",
        portuguese: "Também",
        spanish: "También",
        translation_pt: "Eu também quero ir.",
        translation_es: "Yo también quiero ir."
    },
    {
        word: "Very",
        sentence: "It's very cold outside.",
        portuguese: "Muito",
        spanish: "Muy",
        translation_pt: "Está muito frio lá fora.",
        translation_es: "Hace mucho frío afuera."
    },
    {
        word: "Just",
        sentence: "I just finished my homework.",
        portuguese: "Apenas/Acabei de",
        spanish: "Solo/Acabo de",
        translation_pt: "Eu acabei de terminar minha tarefa.",
        translation_es: "Acabo de terminar mi tarea."
    },
    {
        word: "Really",
        sentence: "Are you really sure?",
        portuguese: "Realmente/Mesmo",
        spanish: "Realmente/De verdad",
        translation_pt: "Você tem certeza mesmo?",
        translation_es: "¿Estás realmente seguro/a?"
    },
    {
        word: "Of course",
        sentence: "Of course, I can help you.",
        portuguese: "Claro/É claro",
        spanish: "Claro/Por supuesto",
        translation_pt: "Claro, eu posso te ajudar.",
        translation_es: "Claro, puedo ayudarte."
    },
    {
        word: "Indeed",
        sentence: "It was a difficult task indeed.",
        portuguese: "De fato/Realmente",
        spanish: "De hecho/Realmente",
        translation_pt: "Foi uma tarefa difícil de fato.",
        translation_es: "Fue una tarea difícil de hecho."
    },
    {
        word: "Alright",
        sentence: "Alright, let's go now.",
        portuguese: "Tudo bem/Certo",
        spanish: "De acuerdo/Vale",
        translation_pt: "Tudo bem, vamos agora.",
        translation_es: "De acuerdo, vamos ahora."
    },
    {
        word: "Anyway",
        sentence: "It's late, but anyway, I'll finish it.",
        portuguese: "De qualquer forma/Enfim",
        spanish: "De todos modos/En fin",
        translation_pt: "Está tarde, mas de qualquer forma, vou terminar.",
        translation_es: "Es tarde, pero de todos modos, lo terminaré."
    },
    // Lembre-se de adicionar uma vírgula (,) após cada objeto, exceto o último da lista.

    // --- Palavras de uso cotidiano (com foco em SAÚDE E BEM-ESTAR) ---

    // Partes do Corpo (essenciais para descrever sintomas)
    {
        word: "Body",
        sentence: "It's important to keep your body healthy.",
        portuguese: "Corpo",
        spanish: "Cuerpo",
        translation_pt: "É importante manter seu corpo saudável.",
        translation_es: "Es importante mantener tu cuerpo saludable."
    },
    {
        word: "Head",
        sentence: "My head hurts.",
        portuguese: "Cabeça",
        spanish: "Cabeza",
        translation_pt: "Minha cabeça dói.",
        translation_es: "Me duele la cabeza."
    },
    {
        word: "Stomach",
        sentence: "I have a stomach ache.",
        portuguese: "Estômago",
        spanish: "Estómago",
        translation_pt: "Estou com dor de estômago.",
        translation_es: "Tengo dolor de estómago."
    },
    {
        word: "Arm",
        sentence: "He broke his arm playing sports.",
        portuguese: "Braço",
        spanish: "Brazo",
        translation_pt: "Ele quebrou o braço praticando esportes.",
        translation_es: "Él se rompió el brazo jugando deportes."
    },
    {
        word: "Leg",
        sentence: "My legs are tired after the long walk.",
        portuguese: "Perna",
        spanish: "Pierna",
        translation_pt: "Minhas pernas estão cansadas depois da longa caminhada.",
        translation_es: "Mis piernas están cansadas después de la larga caminata."
    },
    {
        word: "Hand",
        sentence: "Wash your hands before eating.",
        portuguese: "Mão",
        spanish: "Mano",
        translation_pt: "Lave suas mãos antes de comer.",
        translation_es: "Lávate las manos antes de comer."
    },
    {
        word: "Foot",
        sentence: "My foot fell asleep.",
        portuguese: "Pé",
        spanish: "Pie",
        translation_pt: "Meu pé adormeceu.",
        translation_es: "Se me durmió el pie."
    },

    // Condições de Saúde Comuns
    {
        word: "Pain",
        sentence: "I feel a sharp pain in my back.",
        portuguese: "Dor",
        spanish: "Dolor",
        translation_pt: "Eu sinto uma dor aguda nas minhas costas.",
        translation_es: "Siento un dolor agudo en mi espalda."
    },
    {
        word: "Sick",
        sentence: "I feel sick, I think I have a fever.",
        portuguese: "Doente",
        spanish: "Enfermo/a",
        translation_pt: "Eu me sinto doente, acho que estou com febre.",
        translation_es: "Me siento enfermo/a, creo que tengo fiebre."
    },
    {
        word: "Cold (illness)",
        sentence: "I caught a cold last week.",
        portuguese: "Resfriado",
        spanish: "Resfriado",
        translation_pt: "Eu peguei um resfriado na semana passada.",
        translation_es: "Me resfrié la semana pasada."
    },
    {
        word: "Flu",
        sentence: "The flu symptoms include fever and body aches.",
        portuguese: "Gripe",
        spanish: "Gripe",
        translation_pt: "Os sintomas da gripe incluem febre e dores no corpo.",
        translation_es: "Los síntomas de la gripe incluyen fiebre y dolores corporales."
    },
    {
        word: "Fever",
        sentence: "The child has a high fever.",
        portuguese: "Febre",
        spanish: "Fiebre",
        translation_pt: "A criança está com febre alta.",
        translation_es: "El niño/la niña tiene fiebre alta."
    },
    {
        word: "Cough",
        sentence: "He has a bad cough.",
        portuguese: "Tosse",
        spanish: "Tos",
        translation_pt: "Ele está com uma tosse forte.",
        translation_es: "Él tiene una tos fuerte."
    },
    {
        word: "Sore throat",
        sentence: "I have a sore throat, it hurts when I swallow.",
        portuguese: "Dor de garganta",
        spanish: "Dolor de garganta",
        translation_pt: "Estou com dor de garganta, dói quando engulo.",
        translation_es: "Tengo dolor de garganta, me duele al tragar."
    },
    {
        word: "Injury",
        sentence: "He suffered a minor injury during the game.",
        portuguese: "Lesão/Ferimento",
        spanish: "Lesión/Herida",
        translation_pt: "Ele sofreu uma pequena lesão durante o jogo.",
        translation_es: "Él sufrió una pequeña lesión durante el partido."
    },

    // Profissionais e Locais de Saúde
    {
        word: "Doctor",
        sentence: "I need to see a doctor.",
        portuguese: "Médico/a",
        spanish: "Médico/a",
        translation_pt: "Eu preciso ver um médico.",
        translation_es: "Necesito ver a un médico/a."
    },
    {
        word: "Hospital",
        sentence: "The patient was taken to the hospital.",
        portuguese: "Hospital",
        spanish: "Hospital",
        translation_pt: "O paciente foi levado para o hospital.",
        translation_es: "El paciente fue llevado al hospital."
    },
    {
        word: "Pharmacy",
        sentence: "I need to go to the pharmacy to get my medicine.",
        portuguese: "Farmácia",
        spanish: "Farmacia",
        translation_pt: "Eu preciso ir à farmácia pegar meu remédio.",
        translation_es: "Necesito ir a la farmacia a buscar mi medicina."
    },
    {
        word: "Medicine",
        sentence: "Take your medicine twice a day.",
        portuguese: "Remédio/Medicamento",
        spanish: "Medicina/Medicamento",
        translation_pt: "Tome seu remédio duas vezes ao dia.",
        translation_es: "Toma tu medicina dos veces al día."
    },

    // Hábitos e Estado Geral de Bem-Estar
    {
        word: "Healthy",
        sentence: "Eating fruits and vegetables helps you stay healthy.",
        portuguese: "Saudável",
        spanish: "Saludable",
        translation_pt: "Comer frutas e vegetais ajuda você a se manter saudável.",
        translation_es: "Comer frutas y verduras te ayuda a mantenerte saludable."
    },
    {
        word: "Exercise",
        sentence: "Regular exercise is good for your heart.",
        portuguese: "Exercício",
        spanish: "Ejercicio",
        translation_pt: "Exercício regular é bom para o seu coração.",
        translation_es: "El ejercicio regular es bueno para tu corazón."
    },
    {
        word: "Sleep",
        sentence: "Getting enough sleep is crucial for your health.",
        portuguese: "Sono/Dormir",
        spanish: "Sueño/Dormir",
        translation_pt: "Dormir o suficiente é crucial para sua saúde.",
        translation_es: "Dormir lo suficiente es crucial para tu salud."
    },
    {
        word: "Stress",
        sentence: "Try to manage your stress levels.",
        portuguese: "Estresse",
        spanish: "Estrés",
        translation_pt: "Tente gerenciar seus níveis de estresse.",
        translation_es: "Intenta manejar tus niveles de estrés."
    },
    {
        word: "Diet",
        sentence: "She's on a healthy diet.",
        portuguese: "Dieta",
        spanish: "Dieta",
        translation_pt: "Ela está em uma dieta saudável.",
        translation_es: "Ella está en una dieta saludable."
    }
    // Adicione mais palavras aqui se desejar, seguindo o mesmo formato.
    // Lembre-se de adicionar uma vírgula (,) após cada objeto, exceto o último da lista.


];









// --- Daily Goal Tracking ---
let wordsLearnedToday = 0;
const WORDS_PER_PERCENTAGE = 100; // Quantas palavras para subir 1%

// --- Persistence Keys ---
const LAST_STUDY_DATE_KEY = 'nightstudy_lastStudyDate';
const WORDS_LEARNED_KEY = 'nightstudy_wordsLearnedToday';
const DAILY_GOAL_PERCENTAGE_KEY = 'nightstudy_dailyGoalPercentage'; // Not strictly needed, can be calculated


// --- Functions ---

// Update current time in header
function updateTime() {
    const now = new Date();
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    currentTimeElement.textContent = now.toLocaleTimeString('pt-BR', timeOptions);
}

// Tab navigation logic - MODIFICADA PARA ZERAR A META QUANDO O BOTÃO "CHATBOT" FOR CLICADO
function activateTab(tabId) {
    // Se o tabId for 'chatbot', trata como uma ação de zerar meta
    if (tabId === 'chatbot') {
        resetDailyGoalManual(); // Chama a função de zerar
        
        // Remove o estilo 'active' do botão 'Conversar' (que agora zera a meta)
        // Para não parecer que ele é uma aba de conteúdo
        document.querySelector(`.nav-button[data-tab="chatbot"]`).classList.remove('active');

        // Opcional: Manter a aba anterior ativa ou voltar para uma aba padrão.
        // Itere sobre os botões de navegação para encontrar qual deles estava ativo antes.
        let previouslyActiveTabId = 'pomodoro'; // Define um padrão caso nenhuma aba estivesse ativa
        navButtons.forEach(button => {
            if (button.classList.contains('active') && button.dataset.tab !== 'chatbot') {
                previouslyActiveTabId = button.dataset.tab;
            }
        });
        
        // Ativa a aba que estava ativa antes do clique no botão "Conversar" (agora reset)
        // ou volta para "pomodoro" se nenhuma estava ativa ou se era o próprio "chatbot" que estava ativo.
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${previouslyActiveTabId}-section`).classList.add('active');
        document.querySelector(`.nav-button[data-tab="${previouslyActiveTabId}"]`).classList.add('active');

        return; // Sai da função, não tenta exibir um conteúdo de aba para "chatbot"
    }

    // Lógica normal para as outras abas de conteúdo (Estudar, Vocabulário, Configurações)
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    navButtons.forEach(button => {
        button.classList.remove('active');
    });

    document.getElementById(`${tabId}-section`).classList.add('active');
    document.querySelector(`.nav-button[data-tab="${tabId}"]`).classList.add('active');

    // Remove a lógica de inicialização do Botpress daqui, pois o botão agora é para zerar
    // if (tabId === 'chatbot') {
    //     // Ensure Botpress widget is visible/initialized if it has lazy loading
    // }
}

// --- Pomodoro Functions ---
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function updatePomodoroDisplay() {
    pomodoroTimerDisplay.textContent = formatTime(timeLeft);
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    timer = setInterval(() => {
        timeLeft--;
        updatePomodoroDisplay();

        if (timeLeft <= 0) {
            clearInterval(timer);
            isRunning = false;
            if (!isBreak) {
                alert('Tempo de Foco Encerrado! Hora da Pausa.');
                isBreak = true;
                timeLeft = breakDurationInput.value * 60;
            } else {
                alert('Pausa Encerrada! Hora de Focar Novamente.');
                isBreak = false;
                timeLeft = pomodoroDurationInput.value * 60;
            }
            updatePomodoroDisplay();
            // Optionally, auto-start next session: startTimer();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    isBreak = false;
    currentDuration = pomodoroDurationInput.value * 60;
    timeLeft = currentDuration;
    updatePomodoroDisplay();
}

// --- Vocabulary Functions ---
function displayCard(index) {
    const card = vocabularyData[index];
    englishWordElement.textContent = card.word;
    englishSentenceElement.textContent = card.sentence;
    portugueseTranslationElement.textContent = card.translation_pt;
    spanishTranslationElement.textContent = card.translation_es;

    // Ensure card is on the front side when a new word is displayed
    vocabularyCard.classList.remove('flipped');
}

function flipCard() {
    vocabularyCard.classList.toggle('flipped');
}

function nextCard() {
    // Increment the counter for words learned/reviewed
    wordsLearnedToday++;
    updateDailyGoal(); // Update the daily goal percentage
    saveDailyProgress(); // <--- Salva o progresso no localStorage

    currentCardIndex = (currentCardIndex + 1) % vocabularyData.length;
    displayCard(currentCardIndex);
}

// --- Daily Goal Functions ---
function updateDailyGoal() {
    // Calculate percentage: 1% for every WORDS_PER_PERCENTAGE words
    let percentage = Math.floor(wordsLearnedToday / WORDS_PER_PERCENTAGE);

    // Cap the percentage at 100%
    if (percentage > 100) {
        percentage = 100;
    }

    dailyGoalProgressBar.style.width = `${percentage}%`;
    dailyGoalPercentage.textContent = `${percentage}%`;

    // No need to save here, as saveDailyProgress will be called from nextCard
    // if (percentage === 100) {
    //     console.log("Parabéns! Meta diária atingida!");
    //     // Logic for streak or celebration
    // }
}

// --- Persistence Functions ---
function saveDailyProgress() {
    localStorage.setItem(WORDS_LEARNED_KEY, wordsLearnedToday.toString());
    // The percentage can be recalculated, so we don't strictly need to save it.
    // localStorage.setItem(DAILY_GOAL_PERCENTAGE_KEY, dailyGoalPercentage.textContent);
    localStorage.setItem(LAST_STUDY_DATE_KEY, new Date().toDateString()); // Salva a data atual
}

function loadDailyProgress() {
    const lastStudyDate = localStorage.getItem(LAST_STUDY_DATE_KEY);
    const today = new Date().toDateString();

    if (lastStudyDate === today) {
        // Se a última data de estudo é hoje, carrega o progresso
        const savedWords = localStorage.getItem(WORDS_LEARNED_KEY);
        if (savedWords) {
            wordsLearnedToday = parseInt(savedWords, 10);
        }
    } else {
        // Se não é hoje, zera o progresso e a data (para um novo dia)
        wordsLearnedToday = 0;
        localStorage.removeItem(WORDS_LEARNED_KEY);
        // localStorage.removeItem(LAST_STUDY_DATE_KEY); // Pode remover ou apenas sobrescrever na próxima salvada
    }
    updateDailyGoal(); // Atualiza a UI com o progresso carregado/zerado
}

// --- New Function to Reset Daily Goal ---
function resetDailyGoalManual() {
    // Confirmação para evitar resets acidentais
    if (confirm("Tem certeza que deseja zerar sua meta diária de hoje?")) {
        wordsLearnedToday = 0; // Zera o contador de palavras aprendidas
        localStorage.removeItem(WORDS_LEARNED_KEY); // Remove do localStorage
        localStorage.removeItem(LAST_STUDY_DATE_KEY); // Zera a data também para um reset "limpo"
        updateDailyGoal(); // Atualiza a UI para 0%
        alert("Meta diária zerada com sucesso!");
    }
}


// --- Event Listeners ---

// Navigation
navButtons.forEach(button => {
    button.addEventListener('click', () => {
        activateTab(button.dataset.tab);
    });
});

// Pomodoro Controls
startPomodoroBtn.addEventListener('click', startTimer);
pausePomodoroBtn.addEventListener('click', pauseTimer);
resetPomodoroBtn.addEventListener('click', resetTimer);

pomodoroDurationInput.addEventListener('change', () => {
    if (!isRunning) { // Only update if timer is not running
        currentDuration = pomodoroDurationInput.value * 60;
        timeLeft = currentDuration;
        updatePomodoroDisplay();
    }
});
breakDurationInput.addEventListener('change', () => {
    // No direct impact on current running session, only for next break if it's focus now
});


// Vocabulary Controls
flipCardBtn.addEventListener('click', flipCard);
nextCardBtn.addEventListener('click', nextCard);


// --- Initial Setup ---
document.addEventListener('DOMContentLoaded', () => {
    updateTime();
    setInterval(updateTime, 1000); // Update time every second

    // Initialize Pomodoro
    timeLeft = currentDuration;
    updatePomodoroDisplay();

    // Load daily progress first
    loadDailyProgress(); // <--- Carrega o progresso ao iniciar

    // Initialize Vocabulary Cards
    if (vocabularyData.length > 0) {
        displayCard(currentCardIndex);
    } else {
        englishWordElement.textContent = "No words to display.";
    }

    // Register Service Worker for PWA
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('service-worker.js')
                .then(registration => {
                    console.log('Service Worker registered with scope:', registration.scope);
                })
                .catch(error => {
                    console.error('Service Worker registration failed:', error);
                });
        });
    }
});
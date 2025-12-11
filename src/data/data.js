import tecladista from "../assets/homeIMG/tecladista.jpg"
import vocalista from "../assets/homeIMG/vocalistamujer.jpg"
import baterista from "../assets/homeIMG/baterista.jpg"
import bajista from "../assets/homeIMG/mike.jpg"
import guitarrista from "../assets/homeIMG/guitarrista.jpg"

import gatosPlomos from "../assets/homeIMG/bandaRockCard3.webp"
import careFiebre from "../assets/homeIMG/bandaPsicodelica.jpg"
import oldSpice from "../assets/homeIMG/bandaJazz.jpg"
import siegen from "../assets/homeIMG/bandaHeavyMetal.jpg"
import netter from "../assets/homeIMG/bandaFunk.jpg"

import imgSolarFlare from "../assets/buscarBandasIMG/imgSolarFlare.jpg"
import imgSynthPop from "../assets/buscarBandasIMG/imgSynthPop.jpg"
import imgJazzFusion from "../assets/buscarBandasIMG/imgJazzFusion.jpg"
import imgHeavyMetal from "../assets/buscarBandasIMG/imgHeavyMetal.jpg"
import imgFunk from "../assets/buscarBandasIMG/imgFunk.jpg"
import imgRockAlternativo from "../assets/buscarBandasIMG/imgRockAlternativo.jpg"
import imgPopRock from "../assets/buscarBandasIMG/imgPopRock.jpg"
import imgFolk from "../assets/buscarBandasIMG/imgFolk.jpg"
import imgPunkRock from "../assets/buscarBandasIMG/imgPunkRock.jpg"
import imgElectronica from "../assets/buscarBandasIMG/imgElectronica.jpg"
import imgJazz from "../assets/buscarBandasIMG/imgJazz.jpg"
import imgRockFolk from "../assets/buscarBandasIMG/imgRockFolk.webp"
import imgReggae from "../assets/buscarBandasIMG/imgReggae.jpg"
import imgMetalProgresivo from "../assets/buscarBandasIMG/imgMetalProgresivo.jpg"
import imgHipHop from "../assets/buscarBandasIMG/imgHipHop.jpg"




export const Artistas = [
    {id:1, nombre:"Giancarlo Stanton",instrumento:"Guitarra",ocupacion: "Guitarrista", ciudad: "El Tabo",descripcion:"Apasionado guitarrista de El Tabo, con estilo versátil y gran energía en el escenario. Busca compartir su talento." ,image: guitarrista},
    {id:2, nombre:"Mike Trout", instrumento:"Bajo", ocupacion: "Bajista", ciudad: "Cobquecura", descripcion: "Bajista originario de Cobquecura, con un sonido sólido y rítmico que da fuerza a cada presentación. Muy versatil.",image: bajista},
    {id:3, nombre:"Mookie Betts", instrumento:"Batería", ocupacion: "Baterista", ciudad: "Puerto Montt",descripcion:"Baterista de Puerto Montt, apasionado por marcar el pulso y la energía en cada interpretación. Estilo variado.",image: baterista},
    {id:4, nombre:"Ashley Young", instrumento:"Voz", ocupacion: "Vocalista", ciudad: "San Antonio",descripcion:"Vocalista de San Antonio, destaca por su voz potente y versátil. Gran carisma dentro de cada escenario que pisa.",image: vocalista},
    {id:5, nombre:"Pedro Porro", instrumento:"Teclado", ocupacion: "Tecladista", ciudad: "Chiloé", descripcion:"Tecladista proveniente de Chiloé, combina creatividad y técnica. Gran pasión por cada nota aplicada dentro del mastil.", image: tecladista},

]

export const Bandas = [
  { id: 1, nombre: "Gatos Plomos", ciudad: "Santiago", estilo: "Rock Alternativo", descripcion: "Banda santiaguina con un sonido potente y melódico, influenciada por el grunge y el rock chileno.", image: gatosPlomos },
  { id: 2, nombre: "Care'Fiebre", ciudad: "Valparaíso", estilo: "Rock Psicodélico", descripcion: "Propuesta experimental de Valparaíso que mezcla guitarras atmosféricas con letras introspectivas.", image: careFiebre },
  { id: 3, nombre: "Old Spice", ciudad: "Antofagasta", estilo: "Jazz", descripcion: "Trío antofagastino que combina el jazz clásico con influencias modernas y una puesta en escena elegante.", image: oldSpice },
  { id: 4, nombre: "Siegen", ciudad: "Coquimbo", estilo: "Heavy Metal", descripcion: "Desde Coquimbo, Siegen destaca por su energía cruda, riffs agresivos y un poderoso sonido de metal chileno.", image: siegen },
  { id: 5, nombre: "Netter", ciudad: "Calama", estilo: "Funk", descripcion: "Banda calameña que fusiona funk, groove y ritmos latinos en un show lleno de energía y estilo propio.", image: netter }
];

export const buscarBandas = [
  { 
    id: 1, 
    nombre: "Solar Flare", 
    ciudad: "Santiago", 
    estilo: "Indie Rock", 
    descripcion: "Banda con riffs frescos y letras introspectivas que exploran temas de juventud, cambio y autodescubrimiento. Su sonido combina guitarras brillantes y atmósferas melancólicas.", 
    integrantes: 4,
    buscan: "Bajista",
    concierto: "Bar Loreto - 2 Nov",
    image: imgSolarFlare 
  },
  { 
    id: 2, 
    nombre: "Neón Vibes", 
    ciudad: "Valparaíso", 
    estilo: "Synthpop", 
    descripcion: "Sonidos electrónicos y melodías pegajosas con una estética retro-futurista. Sus presentaciones destacan por su energía visual, el uso de luces sincronizadas y una puesta en escena llena de color que convierte cada show en una fiesta audiovisual.", 
    integrantes: 5,
    buscan: "Tecladista",
    concierto: "Club Amanda - 10 Nov",
    image: imgSynthPop 
  },
  { 
    id: 3, 
    nombre: "Cobre Jazz", 
    ciudad: "Antofagasta", 
    estilo: "Jazz Fusion", 
    descripcion: "Improvisación libre, armonías complejas y una mezcla de jazz clásico con influencias latinas y funk. Cada presentación es una experiencia única, donde el virtuosismo de sus músicos crea paisajes sonoros llenos de emoción y técnica.", 
    integrantes: 6,
    buscan: "Percusionista",
    concierto: "Teatro Municipal - 15 Nov",
    image: imgJazzFusion 
  },
  { 
    id: 4, 
    nombre: "Trueno Pesado", 
    ciudad: "Coquimbo", 
    estilo: "Heavy Metal", 
    descripcion: "Riffs potentes, batería explosiva y voces desgarradoras definen su identidad. Con letras que abordan la resistencia y la fuerza interior, la banda entrega una experiencia intensa que revive el espíritu del metal más clásico y poderoso.", 
    integrantes: 4,
    buscan: "Vocalista",
    concierto: "Rockódromo - 22 Nov",
    image: imgHeavyMetal 
  },
  { 
    id: 5, 
    nombre: "Funkorama", 
    ciudad: "Calama", 
    estilo: "Funk", 
    descripcion: "Groove contagioso, bajos marcados y una energía imparable en el escenario. Funkorama combina la esencia del funk setentero con influencias modernas, invitando a bailar con cada compás y transmitiendo pura alegría escénica.", 
    integrantes: 5,
    buscan: "No",
    concierto: "Sala Scd Bellavista - 25 Nov",
    image: imgFunk 
  },
  { 
    id: 6, 
    nombre: "Mar Adentro", 
    ciudad: "La Serena", 
    estilo: "Rock Alternativo", 
    descripcion: "Melodías profundas y guitarras envolventes que retratan la nostalgia del norte costero. La banda equilibra calma e intensidad, con letras poéticas que reflejan el paso del tiempo, las mareas y los sentimientos humanos más íntimos.", 
    integrantes: 4,
    buscan: "Guitarrista líder",
    concierto: "Pub El Muelle - 29 Nov",
    image: imgRockAlternativo 
  },
  { 
    id: 7, 
    nombre: "Estrella del Sur", 
    ciudad: "Puerto Montt", 
    estilo: "Pop Rock", 
    descripcion: "Canciones pegajosas, ritmos bailables y letras que conectan con el día a día. Su propuesta combina el pop moderno con el espíritu del rock clásico, ofreciendo un sonido fresco y optimista que conquista tanto a jóvenes como adultos.", 
    integrantes: 5,
    buscan: "Corista",
    concierto: "Casa del Arte Diego Rivera - 30 Nov",
    image: imgPopRock 
  },
  { 
    id: 8, 
    nombre: "Lluvia de Sol", 
    ciudad: "Temuco", 
    estilo: "Folk", 
    descripcion: "Armonías acústicas con influencia mapuche y sonidos de la naturaleza. Su música transmite las raíces culturales del sur de Chile con una mezcla de tradición, calidez y emoción que invita a reconectarse con lo esencial.", 
    integrantes: 3,
    buscan: "Percusionista",
    concierto: "Centro Cultural de Temuco - 5 Dic",
    image: imgFolk 
  },
  { 
    id: 9, 
    nombre: "Río Rojo", 
    ciudad: "Concepción", 
    estilo: "Punk Rock", 
    descripcion: "Energía cruda, letras contestatarias y una actitud rebelde. Río Rojo mantiene viva la esencia del punk chileno con presentaciones explosivas, mensajes directos y una pasión inquebrantable por la autenticidad.", 
    integrantes: 4,
    buscan: "No",
    concierto: "Bar La Puerta Roja - 8 Dic",
    image: imgPunkRock 
  },
  { 
    id: 10, 
    nombre: "Andes Beat", 
    ciudad: "Santiago", 
    estilo: "Electrónica", 
    descripcion: "Mezcla de ritmos modernos y beats urbanos inspirados en la cordillera y la vida citadina. Su sonido combina sintetizadores envolventes, percusión latina y proyecciones visuales que transforman cada show en una experiencia sensorial.", 
    integrantes: 2,
    buscan: "No",
    concierto: "Club Subterráneo - 9 Dic",
    image: imgElectronica 
  },
  { 
    id: 11, 
    nombre: "Aurora Austral", 
    ciudad: "Puerto Varas", 
    estilo: "Jazz", 
    descripcion: "Improvisación elegante y melodías suaves que evocan los paisajes del sur. Aurora Austral fusiona la tradición jazzística con elementos contemporáneos, ofreciendo un sonido cálido, envolvente y lleno de matices.", 
    integrantes: 5,
    buscan: "Saxofonista",
    concierto: "Café Concert Austral - 12 Dic",
    image: imgJazz 
  },
  { 
    id: 12, 
    nombre: "Fogoneros", 
    ciudad: "Osorno", 
    estilo: "Rock Folk", 
    descripcion: "Historias de la vida chilena contadas a través de guitarras acústicas y voces cálidas. Fogoneros rescata la esencia del folclor nacional, mezclando tradición y modernidad en canciones que invitan al encuentro y la reflexión.", 
    integrantes: 4,
    buscan: "Percusionista",
    concierto: "Festival del Sur - 14 Dic",
    image: imgRockFolk 
  },
  { 
    id: 13, 
    nombre: "Viento Norte", 
    ciudad: "Iquique", 
    estilo: "Reggae", 
    descripcion: "Ritmos relajados, mensajes positivos y una vibra playera. Viento Norte transmite paz, unidad y esperanza, mezclando el reggae clásico con toques latinos y un sonido cálido ideal para disfrutar frente al mar.", 
    integrantes: 6,
    buscan: "Tecladista",
    concierto: "Playa Cavancha - 18 Dic",
    image: imgReggae 
  },
  { 
    id: 14, 
    nombre: "Cascada Eléctrica", 
    ciudad: "Santiago", 
    estilo: "Metal Progresivo", 
    descripcion: "Complejidad técnica, cambios de ritmo y riffs agresivos. Cascada Eléctrica combina potencia, precisión y virtuosismo en composiciones extensas que desafían los límites del metal tradicional y sorprenden en cada actuación.", 
    integrantes: 5,
    buscan: "No",
    concierto: "Sala Metrónomo - 20 Dic",
    image: imgMetalProgresivo 
  },
  { 
    id: 15, 
    nombre: "Latido Urbano", 
    ciudad: "Valparaíso", 
    estilo: "Hip Hop", 
    descripcion: "Rap con mensaje social, líricas conscientes y beats urbanos que retratan la realidad porteña. Su estilo combina poesía, ritmo y compromiso, creando un puente entre la cultura callejera y la expresión artística.", 
    integrantes: 3,
    buscan: "Productor",
    concierto: "Centro Cultural Valpo - 22 Dic",
    image: imgHipHop 
  }
];

import CamilaRivera from "../assets/buscarArtistasIMG/CamilaRiveraIMG.jpg"
import DiegoFuentes from "../assets/buscarArtistasIMG/DiegoFuentesIMG.jpg"
import AnaBeltran from "../assets/buscarArtistasIMG/AnaBeltranIMG.webp"
import FelipeContreras from "../assets/buscarArtistasIMG/FelipeContrerasIMG.jpg"
import ValentinaSoto from "../assets/buscarArtistasIMG/ValentinaSotoIMG.jpg"
import JavierOrtiz from "../assets/buscarArtistasIMG/JavierOrtizIMG.avif"
import ConstanzaMella from "../assets/buscarArtistasIMG/ConstanzaMellaIMG.jpg"
import TomásAguilera from "../assets/buscarArtistasIMG/TomasAguileraIMG.jpg"
import IsabelNunez from "../assets/buscarArtistasIMG/IsabelNuñezIMG.avif"
import RodrigoParedes from "../assets/buscarArtistasIMG/RodrigoParedesIMG.webp"
import MariaJoseVera from "../assets/buscarArtistasIMG/MariaJoseVeraIMG.jpeg"
import LucasFernández from "../assets/buscarArtistasIMG/LucasFernandezIMG.jpg"

export const buscarArtistas = [
  {
    id: 1,
    nombre: "Camila Rivera",
    instrumento: "Voz",
    ciudad: "Santiago",
    descripcion: "Cantante versátil con experiencia en pop/rock e indie. Manejo de armonías y coros.",
    image: CamilaRivera
  },
  {
    id: 2,
    nombre: "Diego Fuentes",
    instrumento: "Guitarra líder",
    ciudad: "Valparaíso",
    descripcion: "Guitarrista con enfoque en riffs melódicos y solos; pedales de modulación y delay.",
    image: DiegoFuentes
  },
  {
    id: 3,
    nombre: "Ana Beltrán",
    instrumento: "Bajo",
    ciudad: "Antofagasta",
    descripcion: "Bajista con groove funk/rock, buen timing y experiencia en estudio.",
    image: AnaBeltran
  },
  {
    id: 4,
    nombre: "Felipe Contreras",
    instrumento: "Batería",
    ciudad: "Coquimbo",
    descripcion: "Baterista sólido, click track, doble bombo intermedio y arreglos dinámicos.",
    image: FelipeContreras
  },
  {
    id: 5,
    nombre: "Valentina Soto",
    instrumento: "Teclados",
    ciudad: "Calama",
    descripcion: "Sintetizadores, pianos y pads; arreglos para synthpop, indie y baladas.",
    image: ValentinaSoto
  },
  {
    id: 6,
    nombre: "Javier Ortiz",
    instrumento: "Guitarra rítmica",
    ciudad: "La Serena",
    descripcion: "Rítmico con buen groove, coros básicos y conocimiento de armonía funcional.",
    image: JavierOrtiz
  },
  {
    id: 7,
    nombre: "Constanza Mella",
    instrumento: "Saxo alto",
    ciudad: "Puerto Montt",
    descripcion: "Saxofonista con formación jazz, improvisación modal y bossa/latin.",
    image: ConstanzaMella
  },
  {
    id: 8,
    nombre: "Tomás Aguilera",
    instrumento: "Percusión",
    ciudad: "Temuco",
    descripcion: "Cajón, congas y accesorios; refuerza grooves en formatos acústicos.",
    image: TomásAguilera
  },
  {
    id: 9,
    nombre: "Isabel Núñez",
    instrumento: "Voz",
    ciudad: "Concepción",
    descripcion: "Registro mezzo con proyección; repertorio pop-rock y power ballads.",
    image: IsabelNunez
  },
  {
    id: 10,
    nombre: "Rodrigo Paredes",
    instrumento: "Bajo",
    ciudad: "Santiago",
    descripcion: "Bajo eléctrico 4/5 cuerdas, slap básico y líneas melódicas para indie/funk.",
    image: RodrigoParedes
  },
  {
    id: 11,
    nombre: "María José Vera",
    instrumento: "Violín",
    ciudad: "Valparaíso",
    descripcion: "Arreglos de cuerdas para pop/folk; lectura a primera vista y home studio.",
    image: MariaJoseVera
  },
  {
    id: 12,
    nombre: "Lucas Fernández",
    instrumento: "Guitarra líder",
    ciudad: "Iquique",
    descripcion: "Lead con overdrive clásico, influencia blues/rock y manejo de improvisación.",
    image: LucasFernández
  }
];


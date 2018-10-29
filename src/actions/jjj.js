import React from 'react'
import { Link } from 'react-router-dom'
import Form from '../components/Form'
import Input from '../components/Input'
import AuthWrapper from '../components/AuthWrapper'
import Login from '../models/login'
import { auth, db } from '../actions/firebase-config'
import moment from 'moment'
import '../assets/login.css'

const csv = [
  {
    nombre: 'Ana Paula',
    apellido: 'Abramo',
    correo: 'anapauabramo99@gmail.com',
    fecha_pago: '10/8/18',
    paquete: '15 clases',
    fecha_corte: '11/8/18',
    creditos_disponibles: '10'
  },
  {
    nombre: 'Estrella',
    apellido: 'Acevedo',
    correo: 'a01194909@itesm.mx',
    fecha_pago: '10/10/18',
    paquete: 'mes ilmitado',
    fecha_corte: '11/10/18',
    creditos_disponibles: 'ilimitado'
  },
  {
    nombre: 'Fatima',
    apellido: 'Acevedo',
    correo: 'a01196713@itesm.mx',
    fecha_pago: '10/4/18',
    paquete: '20 clases',
    fecha_corte: '11/4/18',
    creditos_disponibles: '11'
  },
  {
    nombre: 'Alejandra',
    apellido: 'Alanis',
    correo: 'alanis.alejandra@gmail.com',
    fecha_pago: '10/5/18',
    paquete: '1 año',
    fecha_corte: '10/5/19',
    creditos_disponibles: 'ilimitado'
  },
  {
    nombre: 'Cordelia',
    apellido: 'Andoni',
    correo: 'cordemtz@icloud.com',
    fecha_pago: '10/18/18',
    paquete: '3 meses',
    fecha_corte: '1/18/19',
    creditos_disponibles: 'ilimitado'
  },
  {
    nombre: 'Mariana',
    apellido: 'Andrade',
    correo: 'mariana.andradegv@gmail.com',
    fecha_pago: '10/2/18',
    paquete: '15 clases',
    fecha_corte: '11/2/18',
    creditos_disponibles: '8'
  },
  {
    nombre: 'Fabiola',
    apellido: 'Babio',
    correo: 'fabidearancibia@gmail.com',
    fecha_pago: '10/11/18',
    paquete: '15 clases',
    fecha_corte: '11/11/18',
    creditos_disponibles: '2'
  },
  {
    nombre: 'Renata',
    apellido: 'baigts',
    correo: 'renatabaigtsf@gmail.com',
    fecha_pago: '10/8/18',
    paquete: 'mes ilimitado',
    fecha_corte: '11/8/18',
    creditos_disponibles: 'ilimitado'
  },
  {
    nombre: 'Nicole',
    apellido: 'Bardawill',
    correo: 'nicolebardawil2@gmail.com',
    fecha_pago: '10/3/18',
    paquete: '20 clases',
    fecha_corte: '11/3/18',
    creditos_disponibles: '9'
  },
  {
    nombre: 'Barbara',
    apellido: 'Berlanga',
    correo: 'b_berlanga@hotmail.com',
    fecha_pago: '10/17/18',
    paquete: '20 clases',
    fecha_corte: '11/17/18',
    creditos_disponibles: '14'
  },
  {
    nombre: 'Alejandra',
    apellido: 'Berumen',
    correo: 'ale_berumen@icloud.com',
    fecha_pago: '10/1/18',
    paquete: '20 clases',
    fecha_corte: '11/1/18',
    creditos_disponibles: '4'
  },
  {
    nombre: 'Ana Sofia',
    apellido: 'Berumen',
    correo: 'sofyberumen@gmail.com',
    fecha_pago: '10/1/18',
    paquete: '20 clases',
    fecha_corte: '11/1/18',
    creditos_disponibles: '2'
  },
  {
    nombre: 'Mariana',
    apellido: 'Caballero',
    correo: 'mariana.caballero7@gmail.com',
    fecha_pago: '10/10/18',
    paquete: '15 clases',
    fecha_corte: '11/10/18',
    creditos_disponibles: '9'
  },
  {
    nombre: 'Monica ',
    apellido: 'Calderon',
    correo: 'moni_calderon@hotmail.com',
    fecha_pago: '10/15/18',
    paquete: 'mes ilimitado',
    fecha_corte: '11/15/18',
    creditos_disponibles: 'ilimitado'
  },
  {
    nombre: 'Daniela',
    apellido: 'Cantu',
    correo: 'danielacantum@gmail.com',
    fecha_pago: '10/8/18',
    paquete: '20 clases',
    fecha_corte: '11/8/18',
    creditos_disponibles: '8'
  },
  {
    nombre: 'stefania ',
    apellido: 'Cardia',
    correo: 's.cardia@hotmail.com',
    fecha_pago: '10/8/18',
    paquete: '15 clases',
    fecha_corte: '11/8/18',
    creditos_disponibles: '1'
  },
  {
    nombre: 'Elias',
    apellido: 'castro',
    correo: 'elias_cf91@hotmail.com',
    fecha_pago: '10/27/18',
    paquete: 'ilimitado',
    fecha_corte: '10/27/19',
    creditos_disponibles: 'ilimitado'
  },
  {
    nombre: 'Joanna ',
    apellido: 'Charur',
    correo: 'jcharur19@gmail.com',
    fecha_pago: '10/8/18',
    paquete: ' mes ilimitado',
    fecha_corte: '11/8/18',
    creditos_disponibles: 'ilimitado'
  },
  {
    nombre: 'Baby',
    apellido: 'Coronado',
    correo: 'Barbaracoronado@hotmail.com',
    fecha_pago: '7/30/18',
    paquete: '3 meses',
    fecha_corte: '10/30/18',
    creditos_disponibles: 'ilimitado'
  },
  {
    nombre: 'Catalina',
    apellido: 'Cruz',
    correo: 'catycruz02@gmail.com',
    fecha_pago: '10/11/18',
    paquete: 'mes ilimitado',
    fecha_corte: '11/12/18',
    creditos_disponibles: 'ilimitado'
  },
  {
    nombre: 'Chelis',
    apellido: 'De Cantu',
    correo: 'chelism99@hotmail.com',
    fecha_pago: '9/28/18',
    paquete: 'mes ilimitado',
    fecha_corte: '10/28/18',
    creditos_disponibles: 'ilimitado'
  },
  {
    nombre: 'Fatima',
    apellido: 'De la Fuente',
    correo: 'fatimadelafuente99@hotmail.com',
    fecha_pago: '10/23/18',
    paquete: '20 clases',
    fecha_corte: '11/23/18',
    creditos_disponibles: '18'
  },
  {
    nombre: 'Karla ',
    apellido: 'de la Fuente',
    correo: 'dlafuentekarla@gmail.com',
    fecha_pago: '10/16/18',
    paquete: '20 clases',
    fecha_corte: '11/16/18',
    creditos_disponibles: '12'
  },
  {
    nombre: 'Carolina',
    apellido: 'De la Garza',
    correo: 'carolinadlg94@gmail.com',
    fecha_pago: '9/15/18',
    paquete: '3 meses',
    fecha_corte: '12/15/18',
    creditos_disponibles: 'ilimitado'
  },
  {
    nombre: 'karen',
    apellido: 'De Leon',
    correo: 'karendeleon92@gmail.com',
    fecha_pago: '10/15/18',
    paquete: '10 clases',
    fecha_corte: '11/15/18',
    creditos_disponibles: '8'
  },
  {
    nombre: 'Valeria',
    apellido: 'De leon',
    correo: 'valeriapdeleon@hotmail.com',
    fecha_pago: '10/9/18',
    paquete: '15 clases',
    fecha_corte: '11/9/18',
    creditos_disponibles: '7'
  },
  {
    nombre: 'Pili ',
    apellido: 'De Ovando',
    correo: 'pilideovando@gmail.com',
    fecha_pago: '9/3/18',
    paquete: '3 meses',
    fecha_corte: '12/3/18',
    creditos_disponibles: 'ilimitado'
  },
  {
    nombre: 'Elsie',
    apellido: 'Decrescenzo',
    correo: 'elsie33567@gmail.com',
    fecha_pago: '10/3/18',
    paquete: '10 clases',
    fecha_corte: '11/3/18',
    creditos_disponibles: '7'
  },
  {
    nombre: 'Andrea ',
    apellido: 'Delgado',
    correo: 'andreadelgadopalma@gmail.com',
    fecha_pago: '10/9/18',
    paquete: '15 clases',
    fecha_corte: '11/9/18',
    creditos_disponibles: '4'
  },
  {
    nombre: 'Isabella',
    apellido: 'Diaz',
    correo: 'diazsanchez.isabella@gmail.com',
    fecha_pago: '8/1/18',
    paquete: '3 meses',
    fecha_corte: '11/1/18',
    creditos_disponibles: 'ilimitado'
  },
  {
    nombre: 'Aline ',
    apellido: 'Duran',
    correo: 'alinchas@hotmail.com',
    fecha_pago: '10/9/18',
    paquete: 'mes ilimitado',
    fecha_corte: '11/9/18',
    creditos_disponibles: 'ilimitado'
  },
  {
    nombre: 'paulina ',
    apellido: 'elizalde',
    correo: 'paulinaelizalde1@hotmail.com',
    fecha_pago: '8/9/18',
    paquete: '3 meses',
    fecha_corte: '11/9/18',
    creditos_disponibles: 'ilimitado'
  },
  {
    nombre: 'Alejandra',
    apellido: 'Espadas',
    correo: 'alejandra.espadas@hotmail.com',
    fecha_pago: '10/8/18',
    paquete: '15 clases',
    fecha_corte: '11/8/18',
    creditos_disponibles: '7'
  },
  {
    nombre: 'Ale',
    apellido: 'Flores',
    correo: 'aleflores010@gmail.com',
    fecha_pago: '10/11/18',
    paquete: '20 clases',
    fecha_corte: '11/11/18',
    creditos_disponibles: '7'
  },
  {
    nombre: 'Elda',
    apellido: 'Flores',
    correo: 'elda.flores@industerra.com',
    fecha_pago: '8/20/18',
    paquete: '3 meses',
    fecha_corte: '11/20/18',
    creditos_disponibles: 'ilimitado'
  },
  {
    nombre: 'Cecilia ',
    apellido: 'Gamez',
    correo: 'ceci_gf@hotmail.com',
    fecha_pago: '10/12/18',
    paquete: '15 clases',
    fecha_corte: '11/12/18',
    creditos_disponibles: '11'
  },
  {
    nombre: 'Ana Sofia',
    apellido: 'Garcia',
    correo: 'anasofiagarcia96@gmail.com',
    fecha_pago: '10/22/18',
    paquete: '20 clases',
    fecha_corte: '11/22/18',
    creditos_disponibles: '15'
  },
  {
    nombre: 'Nora',
    apellido: 'Garcia',
    correo: 'nora.garciaquintanilla@hotmail.com',
    fecha_pago: '10/24/18',
    paquete: '15 clases',
    fecha_corte: '11/24/18',
    creditos_disponibles: '13'
  },
  {
    nombre: 'Paulina',
    apellido: 'Garcia',
    correo: 'paulinagarcia92@gmail.com',
    fecha_pago: '10/11/18',
    paquete: '15 clases',
    fecha_corte: '11/11/18',
    creditos_disponibles: '10'
  },
  {
    nombre: 'Mairy',
    apellido: 'Garza',
    correo: 'mairyg@msn.com',
    fecha_pago: '10/10/18',
    paquete: '10 clases',
    fecha_corte: '11/10/18',
    creditos_disponibles: '9'
  },
  {
    nombre: 'Regina',
    apellido: 'Garza',
    correo: 'reginagarzam02@gmail.com',
    fecha_pago: '10/2/18',
    paquete: '10 clases',
    fecha_corte: '11/2/18',
    creditos_disponibles: '3'
  },
  {
    nombre: 'Mariana',
    apellido: 'Garza Ibarra',
    correo: 'magarza78@hotmail.com',
    fecha_pago: '7/31/18',
    paquete: '3 meses',
    fecha_corte: '10/31/18',
    creditos_disponibles: 'ilimitado'
  },
  {
    nombre: 'Daniela',
    apellido: 'Garza Niño',
    correo: 'a01194251@itesm.mx',
    fecha_pago: '10/25/18',
    paquete: '15 clases',
    fecha_corte: '11/25/18',
    creditos_disponibles: '14'
  },
  {
    nombre: 'Viviana',
    apellido: 'Garza Niño',
    correo: 'viviana.garzan@gmail.com',
    fecha_pago: '10/11/18',
    paquete: '10 clases',
    fecha_corte: '11/11/18',
    creditos_disponibles: '4'
  },
  {
    nombre: 'Cynthia',
    apellido: 'Gonzalez',
    correo: 'kkarla_10@hotmail.com',
    fecha_pago: '10/9/18',
    paquete: 'mes ilimitado',
    fecha_corte: '11/9/18',
    creditos_disponibles: 'ilimitado'
  },
  {
    nombre: 'Daniela ',
    apellido: 'Gonzalez',
    correo: 'danygzz9@hotmail.con',
    fecha_pago: '10/1/18',
    paquete: '15 clases',
    fecha_corte: '11/1/18',
    creditos_disponibles: '6'
  },
  {
    nombre: 'Roberta',
    apellido: 'Gonzalez',
    correo: 'gonz_ro@yahoo.com.mx',
    fecha_pago: '9/11/18',
    paquete: '3 meses',
    fecha_corte: '12/11/18',
    creditos_disponibles: 'ilimitado'
  },
  {
    nombre: 'Paulina ',
    apellido: 'Gonzalez flores',
    correo: 'gzzpaulina@gmail.com',
    fecha_pago: '10/1/18',
    paquete: '15 clases',
    fecha_corte: '11/1/18',
    creditos_disponibles: '4'
  },
  {
    nombre: 'Ximena',
    apellido: 'Greenham',
    correo: 'aliciaconstantini@hotmail.com',
    fecha_pago: '10/1/18',
    paquete: '15 clases',
    fecha_corte: '11/1/18',
    creditos_disponibles: '4'
  },
  {
    nombre: 'Anette',
    apellido: 'Guajardo',
    correo: 'anetteguajardoo@gmail.com',
    fecha_pago: '10/8/18',
    paquete: 'mes ilimitado',
    fecha_corte: '11/8/18',
    creditos_disponibles: 'ilimitado'
  },
  {
    nombre: 'MIrelle',
    apellido: 'Guajardo',
    correo: 'mirelleguajardo@gmail.com',
    fecha_pago: '10/1/18',
    paquete: 'mes ilimitado',
    fecha_corte: '11/1/18',
    creditos_disponibles: 'ilimitado'
  },
  {
    nombre: 'Claudia ',
    apellido: 'Guerra',
    correo: 'claudiaguerra1302@gmail.com',
    fecha_pago: '10/8/18',
    paquete: '15 clases',
    fecha_corte: '11/8/18',
    creditos_disponibles: '10'
  },
  {
    nombre: 'Valeria',
    apellido: 'Guevara',
    correo: 'valeriaguevarap@hotmail.com',
    fecha_pago: '10/1/18',
    paquete: '15 clases',
    fecha_corte: '11/1/18',
    creditos_disponibles: '6'
  },
  {
    nombre: 'Gabriela ',
    apellido: 'Gutierrez',
    correo: 'gabygc712@hotmail.com',
    fecha_pago: '10/8/18',
    paquete: 'mes ilimitado',
    fecha_corte: '11/8/18',
    creditos_disponibles: 'ilimitado'
  },
  {
    nombre: 'Nicoll',
    apellido: 'Gutierrez',
    correo: 'nicollgtz@gmail.com',
    fecha_pago: '10/1/18',
    paquete: '10 clases',
    fecha_corte: '11/1/18',
    creditos_disponibles: '3'
  },
  {
    nombre: 'Yuvisela',
    apellido: 'Gutierrez',
    correo: 'yuvis.gtz@gmail.com',
    fecha_pago: '10/10/18',
    paquete: '25 clases',
    fecha_corte: '11/10/18',
    creditos_disponibles: '11'
  },
  {
    nombre: 'Marcela ',
    apellido: 'Hdz Garcia',
    correo: 'hdzgarciamm@gmail.com',
    fecha_pago: '8/9/18',
    paquete: '3 meses',
    fecha_corte: '11/9/18',
    creditos_disponibles: 'ilimitado'
  },
  {
    nombre: 'Ximena',
    apellido: 'melhet',
    correo: 'ximenamelhem991@hotmail.com',
    fecha_pago: '8/27/18',
    paquete: '3 meses ilimitados',
    fecha_corte: '11/27/18',
    creditos_disponibles: 'ilimitado'
  },
  // {
  //   nombre: 'Paulina',
  //   apellido: 'Herrera',
  //   correo: '19herrera5056@asfm.mx',
  //   fecha_pago: '10/24/18',
  //   paquete: '20 clases',
  //   fecha_corte: '11/24/18',
  //   creditos_disponibles: '19'
  // },
  // {
  //   nombre: 'Ana Gabriela',
  //   apellido: 'Ibarra',
  //   correo: 'anagabyibarra@gmail.com',
  //   fecha_pago: '10/9/18',
  //   paquete: '1 año',
  //   fecha_corte: '10/9/19',
  //   creditos_disponibles: 'ilimitado'
  // },
  // {
  //   nombre: 'Karla ',
  //   apellido: 'Ibarra',
  //   correo: 'karlaibarra_@hotmail.com',
  //   fecha_pago: '10/1/18',
  //   paquete: '20 clases',
  //   fecha_corte: '11/1/18',
  //   creditos_disponibles: '3'
  // },
  // {
  //   nombre: 'Ana Karen ',
  //   apellido: 'Leal',
  //   correo: 'anakarenleal06@gmail.com',
  //   fecha_pago: '10/2/18',
  //   paquete: 'mes ilimitado',
  //   fecha_corte: '11/2/18',
  //   creditos_disponibles: 'ilimitado'
  // },
  // {
  //   nombre: 'Isabel ',
  //   apellido: 'Leal',
  //   correo: 'isabel.leal.perez@gmail.com',
  //   fecha_pago: '10/8/18',
  //   paquete: '20 clases',
  //   fecha_corte: '11/8/18',
  //   creditos_disponibles: '10'
  // },
  // {
  //   nombre: 'Renata',
  //   apellido: 'Leon',
  //   correo: 'renataleonl@icloud.com',
  //   fecha_pago: '7/30/18',
  //   paquete: '3 meses',
  //   fecha_corte: '10/30/18',
  //   creditos_disponibles: 'ilimitado'
  // },
  // {
  //   nombre: 'Sara',
  //   apellido: 'Levy',
  //   correo: 'bale1922@gmail.com',
  //   fecha_pago: '10/2/18',
  //   paquete: '20 clases',
  //   fecha_corte: '11/2/18',
  //   creditos_disponibles: '7'
  // },
  // {
  //   nombre: 'Estefania',
  //   apellido: 'Leyva',
  //   correo: 'leyvafany@gmail.com',
  //   fecha_pago: '10/15/18',
  //   paquete: '10 clases',
  //   fecha_corte: '11/15/18',
  //   creditos_disponibles: '2'
  // },
  // {
  //   nombre: 'Julissa',
  //   apellido: 'Lobo',
  //   correo: 'julissaa_lg@hotmail.com',
  //   fecha_pago: '10/8/18',
  //   paquete: '15 clases',
  //   fecha_corte: '11/8/18',
  //   creditos_disponibles: '6'
  // },
  // {
  //   nombre: 'Danae',
  //   apellido: 'Loo',
  //   correo: 'danae.loosalazar@gmail.com',
  //   fecha_pago: '10/22/18',
  //   paquete: 'mes ilimitado',
  //   fecha_corte: '11/22/18',
  //   creditos_disponibles: 'ilimitado'
  // },
  // {
  //   nombre: 'Ana Cris',
  //   apellido: 'Lozano',
  //   correo: 'aclozano99@gmail.com',
  //   fecha_pago: '10/22/18',
  //   paquete: '10 clases',
  //   fecha_corte: '11/22/18',
  //   creditos_disponibles: '8'
  // },
  // {
  //   nombre: 'Gina',
  //   apellido: 'Lozano',
  //   correo: 'a01721133@itesm.mx',
  //   fecha_pago: '10/13/18',
  //   paquete: '20 clases',
  //   fecha_corte: '11/13/18',
  //   creditos_disponibles: '11'
  // },
  // {
  //   nombre: 'Paloma',
  //   apellido: 'Lugo',
  //   correo: 'palomalugom@gmail.com',
  //   fecha_pago: '10/22/18',
  //   paquete: '20 clases',
  //   fecha_corte: '11/22/18',
  //   creditos_disponibles: '17'
  // },
  // {
  //   nombre: 'Isa',
  //   apellido: 'Maldonado',
  //   correo: 'isamaldonado99@gmail.com',
  //   fecha_pago: '10/9/18',
  //   paquete: '10 clases',
  //   fecha_corte: '11/9/18',
  //   creditos_disponibles: '6'
  // },
  // {
  //   nombre: 'Nicole',
  //   apellido: 'Marcos',
  //   correo: 'nicolemarcos94@gmail.com',
  //   fecha_pago: '10/16/18',
  //   paquete: '10 clases',
  //   fecha_corte: '11/16/18',
  //   creditos_disponibles: '4'
  // },
  // {
  //   nombre: 'azeneth',
  //   apellido: 'Marrufo',
  //   correo: 'azenethm@live.com.mx',
  //   fecha_pago: '3 meses',
  //   paquete: '3 octubre',
  //   fecha_corte: '1/3/18',
  //   creditos_disponibles: 'ilimitado'
  // },
  // {
  //   nombre: 'Andrea ',
  //   apellido: 'Martinez',
  //   correo: 'andreamtzg99@gmail.com',
  //   fecha_pago: '10/26/18',
  //   paquete: '15 clases',
  //   fecha_corte: '11/26/18',
  //   creditos_disponibles: '13'
  // },
  // {
  //   nombre: 'Veronica',
  //   apellido: 'Martinez lastra ',
  //   correo: 'verolastra16@gmail.com',
  //   fecha_pago: '10/15/18',
  //   paquete: '15 clases',
  //   fecha_corte: '11/15/18',
  //   creditos_disponibles: '12'
  // },
  // {
  //   nombre: 'Rosemarie',
  //   apellido: 'Mendizabal',
  //   correo: 'rosemarie@feme.com.mx',
  //   fecha_pago: '10/3/18',
  //   paquete: '25 clases',
  //   fecha_corte: '11/3/18',
  //   creditos_disponibles: '5'
  // },
  // {
  //   nombre: 'Victoria',
  //   apellido: 'Monreal',
  //   correo: 'victoria_mo2@hotmail.com',
  //   fecha_pago: '8/7/18',
  //   paquete: '3 meses',
  //   fecha_corte: '11/7/18',
  //   creditos_disponibles: 'ilimitado'
  // },
  // {
  //   nombre: 'mikaela',
  //   apellido: 'montemayor',
  //   correo: 'mikaelamty@gmail.com',
  //   fecha_pago: '10/3/18',
  //   paquete: '10 clases',
  //   fecha_corte: '11/3/18',
  //   creditos_disponibles: '5'
  // },
  // {
  //   nombre: 'Nadia',
  //   apellido: 'Morales',
  //   correo: 'nadia_morales93@hotmail.com',
  //   fecha_pago: '10/3/18',
  //   paquete: '15 clases',
  //   fecha_corte: '11/3/18',
  //   creditos_disponibles: '1'
  // },
  // {
  //   nombre: 'Viviana',
  //   apellido: 'Morales',
  //   correo: 'viviana.morales09@gmail.com',
  //   fecha_pago: '10/17/18',
  //   paquete: '15 clases',
  //   fecha_corte: '11/17/18',
  //   creditos_disponibles: '9'
  // },
  // {
  //   nombre: 'Liz',
  //   apellido: 'Niño de Rivera',
  //   correo: 'liz.ninoderivera@hotmail.com',
  //   fecha_pago: '10/25/18',
  //   paquete: '15 clases',
  //   fecha_corte: '11/27/18',
  //   creditos_disponibles: '15'
  // },
  // {
  //   nombre: 'Stefany',
  //   apellido: 'Ochoa',
  //   correo: 'stephanie@chicagofairtrade.org',
  //   fecha_pago: '10/23/18',
  //   paquete: '3 meses',
  //   fecha_corte: '1/23/19',
  //   creditos_disponibles: 'ilimitado'
  // },
  // {
  //   nombre: 'Ana Luisa ',
  //   apellido: 'Ordaz',
  //   correo: 'aniluordaz@gmail.com',
  //   fecha_pago: '10/3/18',
  //   paquete: '3 meses',
  //   fecha_corte: '1/3/18',
  //   creditos_disponibles: 'ilimitado'
  // },
  // {
  //   nombre: 'Regina',
  //   apellido: 'Ortiz',
  //   correo: 'ortizana534@gmail.com',
  //   fecha_pago: '10/16/18',
  //   paquete: '10 clases',
  //   fecha_corte: '11/16/18',
  //   creditos_disponibles: '7'
  // },
  // {
  //   nombre: 'Melissa',
  //   apellido: 'Ortiz',
  //   correo: 'melortizgil@gmail.com',
  //   fecha_pago: '',
  //   paquete: '3 meses ilimitados',
  //   fecha_corte: '11/13/18',
  //   creditos_disponibles: 'ilimitado'
  // },
  // {
  //   nombre: 'Gloria ',
  //   apellido: 'Quiroga',
  //   correo: 'yoyis222098@hotmail.com',
  //   fecha_pago: '10/23/18',
  //   paquete: 'ilimitado',
  //   fecha_corte: '11/23/18',
  //   creditos_disponibles: 'ilimitado'
  // },
  // {
  //   nombre: 'Paulina',
  //   apellido: 'Rdz',
  //   correo: 'rodriguezs.paulina@gmail.com',
  //   fecha_pago: '7/31/18',
  //   paquete: '6 meses',
  //   fecha_corte: '1/31/18',
  //   creditos_disponibles: 'ilimitado'
  // },
  // {
  //   nombre: 'Blanca ',
  //   apellido: 'Renao',
  //   correo: 'blanca.renao@outlook.com',
  //   fecha_pago: '7/30/18',
  //   paquete: '3 meses ',
  //   fecha_corte: '10/30/18',
  //   creditos_disponibles: 'ilimitado'
  // },
  // {
  //   nombre: 'Lilia',
  //   apellido: 'Rios',
  //   correo: 'gomezlili2009@hotmail.com',
  //   fecha_pago: '10/5/18',
  //   paquete: '15 clases',
  //   fecha_corte: '11/5/18',
  //   creditos_disponibles: '6'
  // },
  // {
  //   nombre: 'Eugenia',
  //   apellido: 'Robles',
  //   correo: 'eugeniarlarson@hotmail.com',
  //   fecha_pago: '10/22/18',
  //   paquete: '10 clases',
  //   fecha_corte: '11/22/18',
  //   creditos_disponibles: '8'
  // },
  // {
  //   nombre: 'Valeria',
  //   apellido: 'Robles',
  //   correo: 'valeroblesm@icloud.com',
  //   fecha_pago: '10/8/18',
  //   paquete: 'por clase',
  //   fecha_corte: '11/8/18',
  //   creditos_disponibles: '3'
  // },
  // {
  //   nombre: 'Gabriela ',
  //   apellido: 'Rodriguez',
  //   correo: 'grp15gaviota@gmail.com',
  //   fecha_pago: '2/12/18',
  //   paquete: '12 meses',
  //   fecha_corte: '2/12/19',
  //   creditos_disponibles: 'ilimitado'
  // },
  // {
  //   nombre: 'Isabel',
  //   apellido: 'Rodriguez',
  //   correo: 'isabelrdz00@gmail.com',
  //   fecha_pago: '5/1/18',
  //   paquete: '1 año',
  //   fecha_corte: '5/1/19',
  //   creditos_disponibles: 'ilimitado'
  // },
  // {
  //   nombre: 'Jimena',
  //   apellido: 'Rojas',
  //   correo: 'jimena.rojas95@gmail.com',
  //   fecha_pago: '10/18/18',
  //   paquete: '20 clases',
  //   fecha_corte: '11/18/18',
  //   creditos_disponibles: '13'
  // },
  // {
  //   nombre: 'Belen',
  //   apellido: 'Sada',
  //   correo: 'belensada@gmail.com',
  //   fecha_pago: '10/11/18',
  //   paquete: '10 clases',
  //   fecha_corte: '11/11/18',
  //   creditos_disponibles: '5'
  // },
  // {
  //   nombre: 'isabel',
  //   apellido: 'Sada',
  //   correo: '',
  //   fecha_pago: '10/16/18',
  //   paquete: '10 clases',
  //   fecha_corte: '11/16/18',
  //   creditos_disponibles: '7'
  // },
  // {
  //   nombre: 'Kassandra',
  //   apellido: 'Salinas',
  //   correo: 'ksalinasrdz@gmail.com',
  //   fecha_pago: '10/10/18',
  //   paquete: 'mes ilimitado',
  //   fecha_corte: '11/10/18',
  //   creditos_disponibles: 'ilimitado'
  // },
  // {
  //   nombre: 'Ana Carlota',
  //   apellido: 'Sanchez',
  //   correo: 'acerda@liceolosrosales.edu.mx',
  //   fecha_pago: '8/1/18',
  //   paquete: '3 meses ilimitados',
  //   fecha_corte: '11/1/18',
  //   creditos_disponibles: 'ilimitado'
  // },
  // {
  //   nombre: 'Barbara',
  //   apellido: 'Sanchez',
  //   correo: 'barbarasanchezaa@gmail.com',
  //   fecha_pago: '8/11/18',
  //   paquete: '3 meses',
  //   fecha_corte: '11/11/18',
  //   creditos_disponibles: 'ilimitado'
  // },
  // {
  //   nombre: 'Beatriz',
  //   apellido: 'Sanchez',
  //   correo: 'beatriz@izeicg.com',
  //   fecha_pago: '8/7/18',
  //   paquete: '3 meses',
  //   fecha_corte: '11/7/18',
  //   creditos_disponibles: 'ilimitado'
  // },
  // {
  //   nombre: 'Fabiana',
  //   apellido: 'Sanchez',
  //   correo: 'fabliana00@icloud.com',
  //   fecha_pago: '8/2/18',
  //   paquete: '3 meses ilimitados',
  //   fecha_corte: '11/1/18',
  //   creditos_disponibles: 'ilimitado'
  // },
  // {
  //   nombre: 'Lizbeth',
  //   apellido: 'Sepulveda',
  //   correo: 'lizbethaida@gmail.com',
  //   fecha_pago: '10/19/18',
  //   paquete: '10 clases',
  //   fecha_corte: '11/19/18',
  //   creditos_disponibles: '8'
  // },
  // {
  //   nombre: 'Paola ',
  //   apellido: 'Solana',
  //   correo: 'paosolana@hotmail.com',
  //   fecha_pago: '10/1/18',
  //   paquete: '20 clases',
  //   fecha_corte: '11/1/18',
  //   creditos_disponibles: '1'
  // },
  // {
  //   nombre: 'Ruthy',
  //   apellido: 'Tafich',
  //   correo: 'ruthytk@gmail.com',
  //   fecha_pago: '10/23/18',
  //   paquete: '20 clases',
  //   fecha_corte: '11/23/18',
  //   creditos_disponibles: '17'
  // },
  // {
  //   nombre: 'Alejandra',
  //   apellido: 'Torres',
  //   correo: 'aletorresgzz91@gmail.com',
  //   fecha_pago: '10/8/18',
  //   paquete: 'mes ilimitado',
  //   fecha_corte: '11/8/18',
  //   creditos_disponibles: 'ilimitado'
  // },
  // {
  //   nombre: 'Mariana',
  //   apellido: 'Treviño',
  //   correo: 'mariana.tt@gmail.com',
  //   fecha_pago: '10/9/18',
  //   paquete: '10 clases',
  //   fecha_corte: '11/9/18',
  //   creditos_disponibles: '3'
  // },
  // {
  //   nombre: 'Cynthia',
  //   apellido: 'Valdes',
  //   correo: 'cynthiavaldesm@hotmail.com',
  //   fecha_pago: '8/1/18',
  //   paquete: '3 meses',
  //   fecha_corte: '11/1/18',
  //   creditos_disponibles: 'ilimitado'
  // },
  // {
  //   nombre: 'Lucia',
  //   apellido: 'Vargas',
  //   correo: 'lucia.vargasc@hotmail.com',
  //   fecha_pago: '10/16/18',
  //   paquete: 'mes ilimitado',
  //   fecha_corte: '11/16/18',
  //   creditos_disponibles: 'ilimitado'
  // },
  // {
  //   nombre: 'Maria',
  //   apellido: 'Vargas',
  //   correo: 'maria.vargasc@hotmail.com',
  //   fecha_pago: '10/16/18',
  //   paquete: 'mes ilimitado',
  //   fecha_corte: '11/16/18',
  //   creditos_disponibles: 'ilimitado'
  // },
  // {
  //   nombre: 'Ale',
  //   apellido: 'Vazquez',
  //   correo: 'ale_vazque@hotmail.com',
  //   fecha_pago: '10/4/18',
  //   paquete: 'mes ilimitado',
  //   fecha_corte: '11/4/18',
  //   creditos_disponibles: 'ilimitado'
  // },
  // {
  //   nombre: 'Georgina',
  //   apellido: 'Vazquez',
  //   correo: 'georginavzzm@gmail.com',
  //   fecha_pago: '10/22/18',
  //   paquete: 'mes ilimitado',
  //   fecha_corte: '11/22/18',
  //   creditos_disponibles: 'ilimitado'
  // },
  // {
  //   nombre: 'Ana Carola',
  //   apellido: 'Vera',
  //   correo: 'annacarovela@gmail.com',
  //   fecha_pago: '10/13/18',
  //   paquete: '20 clases',
  //   fecha_corte: '11/13/18',
  //   creditos_disponibles: '11'
  // },
  // {
  //   nombre: 'Carolina',
  //   apellido: 'Victorio',
  //   correo: 'caritovictorio@hotmail.com',
  //   fecha_pago: '10/25/18',
  //   paquete: '20 clases',
  //   fecha_corte: '11/25/18',
  //   creditos_disponibles: 'ilimitado'
  // },
  // {
  //   nombre: 'Sofia',
  //   apellido: 'Garza',
  //   correo: 'sofigarzag94@gmail.com',
  //   fecha_pago: '10/27/18',
  //   paquete: '15 clases',
  //   fecha_corte: '11/27/18',
  //   creditos_disponibles: '14'
  // }
]

export default class extends React.Component {
  printcsv = async () => {
    csv.map(
      async ({
        fecha_pago,
        nombre,
        apellido,
        correo,
        fecha_corte,
        creditos_disponibles
      }) => {
        const { user } = await auth.createUserWithEmailAndPassword(
          correo,
          '123qwerty'
        )
        const isIlimitado = creditos_disponibles === 'ilimitado' ? true : false
        if (isIlimitado) {
          db.ref(`usuario/${user.uid}`).set({
            correo,
            edad: 0,
            nombre: nombre + ' ' + apellido,
            status: 1,
            ilimitado: {
              inicio: moment(fecha_pago).format(),
              fin: moment(fecha_corte).format()
            },
            telefono: '0000000000',
            clases: {},
            creditos: { '-LPrNpstwZt7J3NLUJXc': 0 },
            created_at: moment().format(),
            last_class: moment().format(),
            tarjetas: {},
            invitado: false,
            fecha_nacimiento: 'null'
          })
        } else {
          db.ref(`usuario/${user.uid}`).set({
            correo,
            edad: 0,
            nombre: nombre + ' ' + apellido,
            status: 1,
            telefono: '0000000000',
            clases: {},
            creditos: { '-LPrNpstwZt7J3NLUJXc': +creditos_disponibles },
            created_at: moment().format(),
            last_class: moment().format(),
            tarjetas: {},
            invitado: false,
            fecha_nacimiento: 'null'
          })
        }
      }
    )
  }
  render() {
    return (
      <AuthWrapper type="login">
        {action => (
          <div className="row margin-auto">
            <button onClick={this.printcsv}>Print</button>
            <div className="col-12 col-md-5 col-lg-4 col-xl-3 login-box">
              <div className="row align-content-center fh-login p-2 p-md-4">
                <div className="col-12">
                  <h1 className="mb-5">Iniciar sesión</h1>
                  <Form
                    action={action}
                    redirect="/"
                    submitText="Iniciar sesión"
                    success="Bienvenido"
                    dontShowError
                  >
                    {Login.map((input, i) => (
                      <Input key={i} {...input} />
                    ))}
                  </Form>
                </div>
                <div className="col-12 mt-2 mt-md-5 center-text">
                  <p>
                    <span>¿Aún no tienes tu cuenta? </span>
                    <Link to="/registro">Regístrate</Link>
                  </p>
                </div>
                <div className="col-12 mt-3 center-text">
                  <span>
                    <Link to="/recuperar">Recuperar contraseña</Link>
                  </span>
                </div>
              </div>
            </div>
            <div
              className="col-12 col-md-7 col-lg-8 col-xl-9 hidden-sm-up bg-cover"
              style={{
                backgroundImage: `url(http://impulse-fitnessstudio.com/wp-content/uploads/2018/01/2-Impulse.jpg)`,
                backgroundSize: 'cover'
              }}
            />
          </div>
        )}
      </AuthWrapper>
    )
  }
}

// export default connect(null, { login })(Login)

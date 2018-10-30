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
    fecha_pago: '8/10/2018',
    paquete: '15 clases',
    fecha_corte: '11/8/18',
    creditos: 10,
    id: 'xpLODBJocxWevv37JKMJnjwfV1d2'
  },
  {
    nombre: 'Fatima',
    apellido: 'Acevedo',
    correo: 'a01196713@itesm.mx',
    fecha_pago: '4/10/2018',
    paquete: '20 clases',
    fecha_corte: '11/4/18',
    creditos: 11,
    id: 'C0G92BsVgoPBK8SLeiWdrfAf7fy1'
  },
  {
    nombre: 'Estrella',
    apellido: 'Acevedo',
    correo: 'a01194909@itesm.mx',
    fecha_pago: '10/10/2018',
    paquete: 'mes ilmitado',
    fecha_corte: '11/10/18',
    creditos: 'ilimitado',
    id: 'rXRduawCX1gcWcl3RDIMAtVRFRi1'
  },
  {
    nombre: 'Alejandra',
    apellido: 'Alanis',
    correo: 'alanis.alejandra@gmail.com',
    fecha_pago: '5/10/2018',
    paquete: '1 año',
    fecha_corte: '10/5/19',
    creditos: 'ilimitado',
    id: 'xqU4KsZz0of2dO37oVcje06Y5BA2'
  },
  {
    nombre: 'Cordelia',
    apellido: 'Andoni',
    correo: 'cordemtz@icloud.com',
    fecha_pago: '18/10/2018',
    paquete: '3 meses',
    fecha_corte: '1/18/19',
    creditos: 'ilimitado',
    id: 'JqnRxjKq0reCR5HDXMqxUpwyJHJ3'
  },
  {
    nombre: 'Mariana',
    apellido: 'Andrade',
    correo: 'mariana.andradegv@gmail.com',
    fecha_pago: '2/10/2018',
    paquete: '15 clases',
    fecha_corte: '11/2/18',
    creditos: 8,
    id: 'uSwvywGxiPex6AT8ct88cEEMQIF3'
  },
  {
    nombre: 'Fabiola',
    apellido: 'Babio',
    correo: 'fabidearancibia@gmail.com',
    fecha_pago: '11/10/2018',
    paquete: '15 clases',
    fecha_corte: '11/11/18',
    creditos: 2,
    id: 'yeUn3rzq85PwHbs2m5nbz4cEuQI2'
  },
  {
    nombre: 'Renata',
    apellido: 'baigts',
    correo: 'renatabaigtsf@gmail.com',
    fecha_pago: '8/10/2018',
    paquete: 'mes ilimitado',
    fecha_corte: '11/8/18',
    creditos: 'ilimitado',
    id: 'eZ9PDktdv3bFNKDK7BpROby6Cyz1'
  },
  {
    nombre: 'Nicole',
    apellido: 'Bardawill',
    correo: 'nicolebardawil2@gmail.com',
    fecha_pago: '3/10/2018',
    paquete: '20 clases',
    fecha_corte: '11/3/18',
    creditos: 9,
    id: 'iA1TADztbtdjiEkAL5z9LF28cVe2'
  },
  {
    nombre: 'Barbara',
    apellido: 'Berlanga',
    correo: 'b_berlanga@hotmail.com',
    fecha_pago: '17/10/2018',
    paquete: '20 clases',
    fecha_corte: '11/17/18',
    creditos: 14,
    id: 'M396QUPWZOd60qQOTxsZvoodTy12'
  },
  {
    nombre: 'Ana Sofia',
    apellido: 'Berumen',
    correo: 'sofyberumen@gmail.com',
    fecha_pago: '1/10/2018',
    paquete: '20 clases',
    fecha_corte: '11/1/18',
    creditos: 2,
    id: 'sUwWV5jSSyYmOz2uJGjLGEo3meZ2'
  },
  {
    nombre: 'Alejandra',
    apellido: 'Berumen',
    correo: 'ale_berumen@icloud.com',
    fecha_pago: '1/10/2018',
    paquete: '20 clases',
    fecha_corte: '11/1/18',
    creditos: 4,
    id: '0moiUkQyOSh5GLMw1M3eO0uzv7F3'
  },
  {
    nombre: 'Mariana',
    apellido: 'Caballero',
    correo: 'mariana.caballero7@gmail.com',
    fecha_pago: '10/10/2018',
    paquete: '15 clases',
    fecha_corte: '11/10/18',
    creditos: 9,
    id: 'rVN6RdJwHfh2bn4NRL2HIdYVXJh1'
  },
  {
    nombre: 'Monica',
    apellido: 'Calderon',
    correo: 'moni_calderon@hotmail.com',
    fecha_pago: '15/10/2018',
    paquete: 'mes ilimitado',
    fecha_corte: '11/15/18',
    creditos: 'ilimitado',
    id: '2WLkwALQggcTrgUAvC7mPRgGAqK2'
  },
  {
    nombre: 'Daniela',
    apellido: 'Cantu',
    correo: 'danielacantum@gmail.com',
    fecha_pago: '8/10/2018',
    paquete: '20 clases',
    fecha_corte: '11/8/18',
    creditos: 8,
    id: 'jdACCSDhL9QLUdyJuionHzNOkLn2'
  },
  {
    nombre: 'stefania',
    apellido: 'Cardia',
    correo: 's.cardia@hotmail.com',
    fecha_pago: '8/10/2018',
    paquete: '15 clases',
    fecha_corte: '11/8/18',
    creditos: 1,
    id: 'XMbm67AYXBZE3EAdfMV7AOMDMu32'
  },
  {
    nombre: 'Elias',
    apellido: 'castro',
    correo: 'elias_cf91@hotmail.com',
    fecha_pago: '27/10/2018',
    paquete: 'ilimitado',
    fecha_corte: '10/27/19',
    creditos: 'ilimitado',
    id: 'kXt2hZHZHzdp9JVMKesvpvDEd1f2'
  },
  {
    nombre: 'Joanna',
    apellido: 'Charur',
    correo: 'jcharur19@gmail.com',
    fecha_pago: '8/10/2018',
    paquete: 'mes ilimitado',
    fecha_corte: '11/8/18',
    creditos: 'ilimitado',
    id: 'v91u8B1JhlMp2cFR8OpM1FSZ4B02'
  },
  {
    nombre: 'Baby',
    apellido: 'Coronado',
    correo: 'Barbaracoronado@hotmail.com',
    fecha_pago: '30/7/2018',
    paquete: '3 meses',
    fecha_corte: '10/30/18',
    creditos: 'ilimitado',
    id: 'DLsoQ3krR6RHlmQnID1fqD0V2OH2'
  },
  {
    nombre: 'Catalina',
    apellido: 'Cruz',
    correo: 'catycruz02@gmail.com',
    fecha_pago: '11/10/2018',
    paquete: 'mes ilimitado',
    fecha_corte: '11/12/18',
    creditos: 'ilimitado',
    id: 'g1wQ3E6W9ba3zctcJ9gGA1L0Ail2'
  },
  {
    nombre: 'Chelis',
    apellido: 'De Cantu',
    correo: 'chelism99@hotmail.com',
    fecha_pago: '28/9/2018',
    paquete: 'mes ilimitado',
    fecha_corte: '10/28/18',
    creditos: 'ilimitado',
    id: 'PPofstcjhmTD4xTJfJR9hcktrUP2'
  },
  {
    nombre: 'Karla',
    apellido: 'de la Fuente',
    correo: 'dlafuentekarla@gmail.com',
    fecha_pago: '16/10/2018',
    paquete: '20 clases',
    fecha_corte: '11/16/18',
    creditos: 12,
    id: '30Rc5ytKa4ROdY2FAnwOHGnVAn12'
  },
  {
    nombre: 'Fatima',
    apellido: 'De la Fuente',
    correo: 'fatimadelafuente99@hotmail.com',
    fecha_pago: '23/10/2018',
    paquete: '20 clases',
    fecha_corte: '11/23/18',
    creditos: 18,
    id: '1Le2WgvESrNtYJqqWNFS33WZrXx1'
  },
  {
    nombre: 'Carolina',
    apellido: 'De la Garza',
    correo: 'carolinadlg94@gmail.com',
    fecha_pago: '15/9/2018',
    paquete: '3 meses',
    fecha_corte: '12/15/18',
    creditos: 'ilimitado',
    id: 'WMaAvCfQ7lbljPsTxlrdrk5L4Oo1'
  },
  {
    nombre: 'Valeria',
    apellido: 'De leon',
    correo: 'valeriapdeleon@hotmail.com',
    fecha_pago: '9/10/2018',
    paquete: '15 clases',
    fecha_corte: '11/9/18',
    creditos: 7,
    id: 'rzRTaLrTVtQcrNx6vqwKaa4fusF3'
  },
  {
    nombre: 'karen',
    apellido: 'De Leon',
    correo: 'karendeleon92@gmail.com',
    fecha_pago: '15/10/2018',
    paquete: '10 clases',
    fecha_corte: '11/15/18',
    creditos: 8,
    id: 'qtjwZS58YufJubepAQ9j3JNHbCn1'
  },
  {
    nombre: 'Pili',
    apellido: 'De Ovando',
    correo: 'pilideovando@gmail.com',
    fecha_pago: '3/9/2018',
    paquete: '3 meses',
    fecha_corte: '12/3/18',
    creditos: 'ilimitado',
    id: 'BKHdb8vzGkeW8pbMQokbtJ7Xcnb2'
  },
  {
    nombre: 'Elsie',
    apellido: 'Decrescenzo',
    correo: 'elsie33567@gmail.com',
    fecha_pago: '3/10/2018',
    paquete: '10 clases',
    fecha_corte: '11/3/18',
    creditos: 7,
    id: 'KFeooBvlESdKmHegaDgrSJhg5CE2'
  },
  {
    nombre: 'Andrea',
    apellido: 'Delgado',
    correo: 'andreadelgadopalma@gmail.com',
    fecha_pago: '9/10/2018',
    paquete: '15 clases',
    fecha_corte: '11/9/18',
    creditos: 4,
    id: 'gcIkDqJoGIfUofj0vT3Xwv5nCJ73'
  },
  {
    nombre: 'Isabella',
    apellido: 'Diaz',
    correo: 'diazsanchez.isabella@gmail.com',
    fecha_pago: '1/8/2018',
    paquete: '3 meses',
    fecha_corte: '11/1/18',
    creditos: 'ilimitado',
    id: 'WN2GS8DmRwOAEotm7dDn1WJI8PS2'
  },
  {
    nombre: 'Aline',
    apellido: 'Duran',
    correo: 'alinchas@hotmail.com',
    fecha_pago: '9/10/2018',
    paquete: 'mes ilimitado',
    fecha_corte: '11/9/18',
    creditos: 'ilimitado',
    id: 'OIRPmT3jRAOwB56Cxv1pqFaiGAp2'
  },
  {
    nombre: 'paulina',
    apellido: 'elizalde',
    correo: 'paulinaelizalde1@hotmail.com',
    fecha_pago: '9/8/2018',
    paquete: '3 meses',
    fecha_corte: '11/9/18',
    creditos: 'ilimitado',
    id: 'FlIB72Gg7lUXB3OseCzFPXqMYp02'
  },
  {
    nombre: 'Alejandra',
    apellido: 'Espadas',
    correo: 'alejandra.espadas@hotmail.com',
    fecha_pago: '8/10/2018',
    paquete: '15 clases',
    fecha_corte: '11/8/18',
    creditos: 7,
    id: 'CQjhyC2TGQT083fBFxgzBqQH5Xe2'
  },
  {
    nombre: 'Ale',
    apellido: 'Flores',
    correo: 'aleflores010@gmail.com',
    fecha_pago: '11/10/2018',
    paquete: '20 clases',
    fecha_corte: '11/11/18',
    creditos: 7,
    id: '7WSBzEkp2GR86NxJpqKvvTIv6oO2'
  },
  {
    nombre: 'Elda',
    apellido: 'Flores',
    correo: 'elda.flores@industerra.com',
    fecha_pago: '20/8/2018',
    paquete: '3 meses',
    fecha_corte: '11/20/18',
    creditos: 'ilimitado',
    id: 'hCeSIkbOLAdfGCwuB9kspkkGPSf1'
  },
  {
    nombre: 'Cecilia',
    apellido: 'Gamez',
    correo: 'ceci_gf@hotmail.com',
    fecha_pago: '12/10/2018',
    paquete: '15 clases',
    fecha_corte: '11/12/18',
    creditos: 11,
    id: 'hUQe6MOqrZSBH03vzB47U7lxiFw1'
  },
  {
    nombre: 'Paulina',
    apellido: 'Garcia',
    correo: 'paulinagarcia92@gmail.com',
    fecha_pago: '11/10/2018',
    paquete: '15 clases',
    fecha_corte: '11/11/18',
    creditos: 10,
    id: 'SXeO2i9WxWaehvoVlIh2hP3wAvn1'
  },
  {
    nombre: 'Nora',
    apellido: 'Garcia',
    correo: 'nora.garciaquintanilla@hotmail.com',
    fecha_pago: '24/10/2018',
    paquete: '15 clases',
    fecha_corte: '11/24/18',
    creditos: 13,
    id: 'T4iCQznVNDTNMBdFQeBYj9TjGEW2'
  },
  {
    nombre: 'Ana Sofia',
    apellido: 'Garcia',
    correo: 'anasofiagarcia96@gmail.com',
    fecha_pago: '22/10/2018',
    paquete: '20 clases',
    fecha_corte: '11/22/18',
    creditos: 15,
    id: 'pNAq9a6jjXajsWDYH2HOchGBxqR2'
  },
  {
    nombre: 'Regina',
    apellido: 'Garza',
    correo: 'reginagarzam02@gmail.com',
    fecha_pago: '2/10/2018',
    paquete: '10 clases',
    fecha_corte: '11/2/18',
    creditos: 3,
    id: 'HvHNQeHlnINy73Wg3OXQ2bKUFBp2'
  },
  {
    nombre: 'Mairy',
    apellido: 'Garza',
    correo: 'mairyg@msn.com',
    fecha_pago: '10/10/2018',
    paquete: '10 clases',
    fecha_corte: '11/10/18',
    creditos: 9,
    id: 'MnkgTCiMheNxMqzOVqkurdUV3Eh1'
  },
  {
    nombre: 'Sofia',
    apellido: 'Garza',
    correo: 'sofigarzag94@gmail.com',
    fecha_pago: '27/10/2018',
    paquete: '15 clases',
    fecha_corte: '11/27/18',
    creditos: 14,
    id: 'hR26sYOT9Rcfxx6Xf1dqIido6fc2'
  },
  {
    nombre: 'Mariana',
    apellido: 'Garza Ibarra',
    correo: 'magarza78@hotmail.com',
    fecha_pago: '31/7/2018',
    paquete: '3 meses',
    fecha_corte: '10/31/18',
    creditos: 'ilimitado',
    id: 'NObfLnWrxJPfTeLDGkk7Q43lLKb2'
  },
  {
    nombre: 'Viviana',
    apellido: 'Garza Niño',
    correo: 'viviana.garzan@gmail.com',
    fecha_pago: '11/10/2018',
    paquete: '10 clases',
    fecha_corte: '11/11/18',
    creditos: 4,
    id: 'guJg5uDO98hlyiL74PwNPnV7ewi2'
  },
  {
    nombre: 'Daniela',
    apellido: 'Garza Niño',
    correo: 'a01194251@itesm.mx',
    fecha_pago: '25/10/2018',
    paquete: '15 clases',
    fecha_corte: '11/25/18',
    creditos: 14,
    id: 'AQuUoGeJ0wVXjkBIgFAUVz0L0yO2'
  },
  {
    nombre: 'Daniela',
    apellido: 'Gonzalez',
    correo: 'danielagdavalos@gmail.com',
    fecha_pago: '1/10/2018',
    paquete: '15 clases',
    fecha_corte: '11/1/18',
    creditos: 6,
    id: 'FZr7bZajR3hs11fVKyUYujrvRZg1'
  },
  {
    nombre: 'Cynthia',
    apellido: 'Gonzalez',
    correo: 'kkarla_10@hotmail.com',
    fecha_pago: '9/10/2018',
    paquete: 'mes ilimitado',
    fecha_corte: '11/9/18',
    creditos: 'ilimitado',
    id: 'yaVk4vJBgNM6aSmm7jJ0lqIFYMI3'
  },
  {
    nombre: 'Roberta',
    apellido: 'Gonzalez',
    correo: 'gonz_ro@yahoo.com.mx',
    fecha_pago: '11/9/2018',
    paquete: '3 meses',
    fecha_corte: '12/11/18',
    creditos: 'ilimitado',
    id: 'WNJ2rE3XWhXnT0fvOhb6ONr7MKk2'
  },
  {
    nombre: 'Paulina',
    apellido: 'Gonzalez flores',
    correo: 'gzzpaulina@gmail.com',
    fecha_pago: '1/10/2018',
    paquete: '15 clases',
    fecha_corte: '11/1/18',
    creditos: 4,
    id: 'cg7oUcA60lhcLXw748yKxqdwLwC2'
  },
  {
    nombre: 'Ximena',
    apellido: 'Greenham',
    correo: 'aliciaconstantini@hotmail.com',
    fecha_pago: '1/10/2018',
    paquete: '15 clases',
    fecha_corte: '11/1/18',
    creditos: 4,
    id: 'j5d4gcesaTSGjB4s6eiR2QdXsIJ3'
  },
  {
    nombre: 'Anette',
    apellido: 'Guajardo',
    correo: 'anetteguajardoo@gmail.com',
    fecha_pago: '8/10/2018',
    paquete: 'mes ilimitado',
    fecha_corte: '11/8/18',
    creditos: 'ilimitado',
    id: '7XyfOZCsv5R0xS7TcxXcKzctdbJ3'
  },
  {
    nombre: 'MIrelle',
    apellido: 'Guajardo',
    correo: 'mirelleguajardo@gmail.com',
    fecha_pago: '1/10/2018',
    paquete: 'mes ilimitado',
    fecha_corte: '11/1/18',
    creditos: 'ilimitado',
    id: 'bgzPyaapu7aqHOFrkZkscAXklcm1'
  },
  {
    nombre: 'Claudia',
    apellido: 'Guerra',
    correo: 'claudiaguerra1302@gmail.com',
    fecha_pago: '8/10/2018',
    paquete: '15 clases',
    fecha_corte: '11/8/18',
    creditos: 10,
    id: 'CIcOZcAkD9hLmfFJ2zMQxmwYePi2'
  },
  {
    nombre: 'Valeria',
    apellido: 'Guevara',
    correo: 'valeriaguevarap@hotmail.com',
    fecha_pago: '1/10/2018',
    paquete: '15 clases',
    fecha_corte: '11/1/18',
    creditos: 6,
    id: 'yHnf3fKysvMGJjw2H9TBuCMVxVo1'
  },
  {
    nombre: 'Nicoll',
    apellido: 'Gutierrez',
    correo: 'nicollgtz@gmail.com',
    fecha_pago: '1/10/2018',
    paquete: '10 clases',
    fecha_corte: '11/1/18',
    creditos: 3,
    id: '4wsZXeAaKvYc1z55DBNrKc8CF0l1'
  },
  {
    nombre: 'Yuvisela',
    apellido: 'Gutierrez',
    correo: 'yuvis.gtz@gmail.com',
    fecha_pago: '10/10/2018',
    paquete: '25 clases',
    fecha_corte: '11/10/18',
    creditos: 11,
    id: 'uA1vOJudGtQNPumMUNRK4F5QWNH2'
  },
  {
    nombre: 'Gabriela',
    apellido: 'Gutierrez',
    correo: 'gabygc712@hotmail.com',
    fecha_pago: '8/10/2018',
    paquete: 'mes ilimitado',
    fecha_corte: '11/8/18',
    creditos: 'ilimitado',
    id: 'sggbkLdqZYUohLq0sORjwGIVod42'
  },
  {
    nombre: 'Marcela',
    apellido: 'Hdz Garcia',
    correo: 'hdzgarciamm@gmail.com',
    fecha_pago: '9/8/2018',
    paquete: '3 meses',
    fecha_corte: '11/9/18',
    creditos: 'ilimitado',
    id: 'i3el8IqGGKWfl3WUmfQ8rIHTXFi1'
  },
  {
    nombre: 'Paulina',
    apellido: 'Herrera',
    correo: '19herrera5056@asfm.mx',
    fecha_pago: '24/10/2018',
    paquete: '20 clases',
    fecha_corte: '11/24/18',
    creditos: 19,
    id: '6FgRtBpWwlPk4jhjQylQ6CYF5Op1'
  },
  {
    nombre: 'Karla',
    apellido: 'Ibarra',
    correo: 'karlaibarra_@hotmail.com',
    fecha_pago: '1/10/2018',
    paquete: '20 clases',
    fecha_corte: '11/1/18',
    creditos: 3,
    id: 'FrkOknhS7rcmZ1jsD0CgNXPqOBC3'
  },
  {
    nombre: 'Ana Gabriela',
    apellido: 'Ibarra',
    correo: 'anagabyibarra@gmail.com',
    fecha_pago: '9/10/2018',
    paquete: '1 año',
    fecha_corte: '10/9/19',
    creditos: 'ilimitado',
    id: 'hh5Ik4jBwcWthlxHaIHmYn49h1C2'
  },
  {
    nombre: 'Isabel',
    apellido: 'Leal',
    correo: 'isabel.leal.perez@gmail.com',
    fecha_pago: '8/10/2018',
    paquete: '20 clases',
    fecha_corte: '11/8/18',
    creditos: 10,
    id: '8xP2sh9G5Uf8czpyDBtGmMZSAra2'
  },
  {
    nombre: 'Ana Karen',
    apellido: 'Leal',
    correo: 'anakarenleal06@gmail.com',
    fecha_pago: '2/10/2018',
    paquete: 'mes ilimitado',
    fecha_corte: '11/2/18',
    creditos: 'ilimitado',
    id: 'xy2acC8YXzS8l8IY844WTVNpFdz2'
  },
  {
    nombre: 'Renata',
    apellido: 'Leon',
    correo: 'renataleonl@icloud.com',
    fecha_pago: '30/7/2018',
    paquete: '3 meses',
    fecha_corte: '10/30/18',
    creditos: 'ilimitado',
    id: 'o3HhS17eFJY7HdruD52WJZmx3fx1'
  },
  {
    nombre: 'Sara',
    apellido: 'Levy',
    correo: 'bale1922@gmail.com',
    fecha_pago: '2/10/2018',
    paquete: '20 clases',
    fecha_corte: '11/2/18',
    creditos: 7,
    id: '6n1NlEljxfeSxQRsAAg5XCbhrq93'
  },
  {
    nombre: 'Estefania',
    apellido: 'Leyva',
    correo: 'leyvafany@gmail.com',
    fecha_pago: '15/10/2018',
    paquete: '10 clases',
    fecha_corte: '11/15/18',
    creditos: 2,
    id: 'PHU6O4T9lpSu1rDTDMRDXlyoMDi1'
  },
  {
    nombre: 'Julissa',
    apellido: 'Lobo',
    correo: 'julissaa_lg@hotmail.com',
    fecha_pago: '8/10/2018',
    paquete: '15 clases',
    fecha_corte: '11/8/18',
    creditos: 6,
    id: 'zmLvuDlpfebGrQsnf2a7IY4oUz12'
  },
  {
    nombre: 'Danae',
    apellido: 'Loo',
    correo: 'danae.loosalazar@gmail.com',
    fecha_pago: '22/10/2018',
    paquete: 'mes ilimitado',
    fecha_corte: '11/22/18',
    creditos: 'ilimitado',
    id: 't9xnw4AQMIY6qUVuTOFQSgEeF072'
  },
  {
    nombre: 'Ana Cris',
    apellido: 'Lozano',
    correo: 'aclozano99@gmail.com',
    fecha_pago: '22/10/2018',
    paquete: '10 clases',
    fecha_corte: '11/22/18',
    creditos: 8,
    id: 'TbUPVkhpwTcVxAtJJpJVuk5pKyM2'
  },
  {
    nombre: 'Gina',
    apellido: 'Lozano',
    correo: 'a01721133@itesm.mx',
    fecha_pago: '13/10/2018',
    paquete: '20 clases',
    fecha_corte: '11/13/18',
    creditos: 11,
    id: 'YMSee2Uj7ehOGTA0sWEtLv5fnXf1'
  },
  {
    nombre: 'Paloma',
    apellido: 'Lugo',
    correo: 'palomalugom@gmail.com',
    fecha_pago: '22/10/2018',
    paquete: '20 clases',
    fecha_corte: '11/22/18',
    creditos: 17,
    id: 'pDwk1VAaO6V3EKKRqcLwYTuh1tk2'
  },
  {
    nombre: 'Isa',
    apellido: 'Maldonado',
    correo: 'isamaldonado99@gmail.com',
    fecha_pago: '9/10/2018',
    paquete: '10 clases',
    fecha_corte: '11/9/18',
    creditos: 6,
    id: 'W688XW9SCLhYXCCs67SI0QaPSfb2'
  },
  {
    nombre: 'Nicole',
    apellido: 'Marcos',
    correo: 'nicolemarcos94@gmail.com',
    fecha_pago: '16/10/2018',
    paquete: '10 clases',
    fecha_corte: '11/16/18',
    creditos: 4,
    id: 'AKR8ZSIlL3YnZuPJkdvbaXG7Nh42'
  },
  {
    nombre: 'azeneth',
    apellido: 'Marrufo',
    correo: 'azenethm@live.com.mx',
    fecha_pago: '3 meses',
    paquete: '3 octubre',
    fecha_corte: '1/3/18',
    creditos: 'ilimitado',
    id: 'JiJg5sLfeiPeeuLXjFWvJ6yFUQ23'
  },
  {
    nombre: 'Andrea',
    apellido: 'Martinez',
    correo: 'andreamtzg99@gmail.com',
    fecha_pago: '26/10/2018',
    paquete: '15 clases',
    fecha_corte: '11/26/18',
    creditos: 13,
    id: 'WMAtkxoog0b2pazMDuP4Q6JgN2P2'
  },
  {
    nombre: 'Veronica',
    apellido: 'Martinez lastra',
    correo: 'verolastra16@gmail.com',
    fecha_pago: '15/10/2018',
    paquete: '15 clases',
    fecha_corte: '11/15/18',
    creditos: 12,
    id: 'XJcBh3NWRoZfXvEZqjsvo5fHHPt1'
  },
  {
    nombre: 'Ximena',
    apellido: 'melhet',
    correo: 'ximenamelhem991@hotmail.com',
    fecha_pago: '27/8/2018',
    paquete: '3 meses ilimitados',
    fecha_corte: '11/27/18',
    creditos: 'ilimitado',
    id: 'sHJZ8AMSj0StPtl0q30DL0PFUew1'
  },
  {
    nombre: 'Rosemarie',
    apellido: 'Mendizabal',
    correo: 'rosemarie@feme.com.mx',
    fecha_pago: '3/10/2018',
    paquete: '25 clases',
    fecha_corte: '11/3/18',
    creditos: 5,
    id: 'cifXb8j8sZTUs6y6Kei0Aw7jqkk1'
  },
  {
    nombre: 'Victoria',
    apellido: 'Monreal',
    correo: 'victoria_mo2@hotmail.com',
    fecha_pago: '7/8/2018',
    paquete: '3 meses',
    fecha_corte: '11/7/18',
    creditos: 'ilimitado',
    id: '23VtfsT4MSfh54E3hf9OIXre9g52'
  },
  {
    nombre: 'mikaela',
    apellido: 'montemayor',
    correo: 'mikaelamty@gmail.com',
    fecha_pago: '3/10/2018',
    paquete: '10 clases',
    fecha_corte: '11/3/18',
    creditos: 5,
    id: 'kEhEoxMVNcMMImyREU28xGRqPUZ2'
  },
  {
    nombre: 'Nadia',
    apellido: 'Morales',
    correo: 'nadia_morales93@hotmail.com',
    fecha_pago: '3/10/2018',
    paquete: '15 clases',
    fecha_corte: '11/3/18',
    creditos: 1,
    id: 'CFqdYvVMGRdoBpvlNneXljV7Jf23'
  },
  {
    nombre: 'Viviana',
    apellido: 'Morales',
    correo: 'viviana.morales09@gmail.com',
    fecha_pago: '17/10/2018',
    paquete: '15 clases',
    fecha_corte: '11/17/18',
    creditos: 9,
    id: 'Cchj07MHKbPQiOyLwsA59k5dmMw2'
  },
  {
    nombre: 'Liz',
    apellido: 'Niño de Rivera',
    correo: 'liz.ninoderivera@hotmail.com',
    fecha_pago: '25/10/2018',
    paquete: '15 clases',
    fecha_corte: '11/27/18',
    creditos: 15,
    id: 'S7tykPzQTLWohMDJL2vszAY36on2'
  },
  {
    nombre: 'Stefany',
    apellido: 'Ochoa',
    correo: 'stephanie@chicagofairtrade.org',
    fecha_pago: '23/10/2018',
    paquete: '3 meses',
    fecha_corte: '1/23/19',
    creditos: 'ilimitado',
    id: 'Wq2iirMWN1WZtv8MLQDtCzLWOXn1'
  },
  {
    nombre: 'Ana Luisa',
    apellido: 'Ordaz',
    correo: 'aniluordaz@gmail.com',
    fecha_pago: '3/10/2018',
    paquete: '3 meses',
    fecha_corte: '1/3/18',
    creditos: 'ilimitado',
    id: 'pa2GHWSc5YOzqRBHLFWbLVrRox53'
  },
  {
    nombre: 'Regina',
    apellido: 'Ortiz',
    correo: 'ortizana534@gmail.com',
    fecha_pago: '16/10/2018',
    paquete: '10 clases',
    fecha_corte: '11/16/18',
    creditos: 7,
    id: '0jlXDWTLciQ2rrxnkWUWFw8Azgk2'
  },
  {
    nombre: 'Melissa',
    apellido: 'Ortiz',
    correo: 'melortizgil@gmail.com',
    fecha_pago: '',
    paquete: '3 meses ilimitados',
    fecha_corte: '11/13/18',
    creditos: 'ilimitado',
    id: '4qhPRfRmvNQ3a14jp8ypyuWUbM72'
  },
  {
    nombre: 'Gloria',
    apellido: 'Quiroga',
    correo: 'yoyis222098@hotmail.com',
    fecha_pago: '23/10/2018',
    paquete: 'ilimitado',
    fecha_corte: '11/23/18',
    creditos: 'ilimitado',
    id: 'rhhHHLISlWanflOdsXCyBlwNTOF2'
  },
  {
    nombre: 'Paulina',
    apellido: 'Rdz',
    correo: 'rodriguezs.paulina@gmail.com',
    fecha_pago: '31/7/2018',
    paquete: '6 meses',
    fecha_corte: '1/31/18',
    creditos: 'ilimitado',
    id: 'Thqc06nTo2MpKNuIIqw6aSZLsGB2'
  },
  {
    nombre: 'Blanca',
    apellido: 'Renao',
    correo: 'blanca.renao@outlook.com',
    fecha_pago: '30/7/2018',
    paquete: '3 meses',
    fecha_corte: '10/30/18',
    creditos: 'ilimitado',
    id: 'WtKQq5Ib75csfycLgxM2nlGO2A42'
  },
  {
    nombre: 'Lilia',
    apellido: 'Rios',
    correo: 'gomezlili2009@hotmail.com',
    fecha_pago: '5/10/2018',
    paquete: '15 clases',
    fecha_corte: '11/5/18',
    creditos: 6,
    id: 'q9Vqbwbz62QlyrxOOwqEZ0ajC183'
  },
  {
    nombre: 'Valeria',
    apellido: 'Robles',
    correo: 'valeroblesm@icloud.com',
    fecha_pago: '8/10/2018',
    paquete: 'por clase',
    fecha_corte: '11/8/18',
    creditos: 3,
    id: 'GypgA5sMMeMrZbNtPkWcXx7CuBe2'
  },
  {
    nombre: 'Eugenia',
    apellido: 'Robles',
    correo: 'eugeniarlarson@hotmail.com',
    fecha_pago: '22/10/2018',
    paquete: '10 clases',
    fecha_corte: '11/22/18',
    creditos: 8,
    id: 'j9U9VJSyalOqTsVUpT5C3ytNeuh2'
  },
  {
    nombre: 'Gabriela',
    apellido: 'Rodriguez',
    correo: 'grp15gaviota@gmail.com',
    fecha_pago: '12/2/2018',
    paquete: '12 meses',
    fecha_corte: '2/12/19',
    creditos: 'ilimitado',
    id: 'GVI3ziknhOcHp0x28GQwc7HblpR2'
  },
  {
    nombre: 'Isabel',
    apellido: 'Rodriguez',
    correo: 'isabelrdz00@gmail.com',
    fecha_pago: '1/5/2018',
    paquete: '1 año',
    fecha_corte: '5/1/19',
    creditos: 'ilimitado',
    id: '8HV4jlC8C2UyHWv4K2iabApoQIt2'
  },
  {
    nombre: 'Jimena',
    apellido: 'Rojas',
    correo: 'jimena.rojas95@gmail.com',
    fecha_pago: '18/10/2018',
    paquete: '20 clases',
    fecha_corte: '11/18/18',
    creditos: 13,
    id: 'NTuvPpwFqqc8F8Wx2q2wayekedk2'
  },
  {
    nombre: 'Belen',
    apellido: 'Sada',
    correo: 'belensada@gmail.com',
    fecha_pago: '11/10/2018',
    paquete: '10 clases',
    fecha_corte: '11/11/18',
    creditos: 5,
    id: 'JyLrCoeUu4QROgSkXO8z1RiLKVM2'
  },
  {
    nombre: 'isabel',
    apellido: 'Sada',
    correo: '',
    fecha_pago: '16/10/2018',
    paquete: '10 clases',
    fecha_corte: '11/16/18',
    creditos: 7,
    id: ''
  },
  {
    nombre: 'Kassandra',
    apellido: 'Salinas',
    correo: 'ksalinasrdz@gmail.com',
    fecha_pago: '10/10/2018',
    paquete: 'mes ilimitado',
    fecha_corte: '11/10/18',
    creditos: 'ilimitado',
    id: 'plZvdjSJb5fGg6Ab37Yc3nMTs5n1'
  },
  {
    nombre: 'Ana Carlota',
    apellido: 'Sanchez',
    correo: 'acerda@liceolosrosales.edu.mx',
    fecha_pago: '1/8/2018',
    paquete: '3 meses ilimitados',
    fecha_corte: '11/1/18',
    creditos: 'ilimitado',
    id: 'k3IRy5MXprgsqqJhoN9Sw817uXw1'
  },
  {
    nombre: 'Barbara',
    apellido: 'Sanchez',
    correo: 'barbarasanchezaa@gmail.com',
    fecha_pago: '11/8/2018',
    paquete: '3 meses',
    fecha_corte: '11/11/18',
    creditos: 'ilimitado',
    id: 'jXFUpjsbpVO9enShxwrizEI2eg83'
  },
  {
    nombre: 'Beatriz',
    apellido: 'Sanchez',
    correo: 'beatriz@izeicg.com',
    fecha_pago: '7/8/2018',
    paquete: '3 meses',
    fecha_corte: '11/7/18',
    creditos: 'ilimitado',
    id: 'CDXX9DE8lwgVZ3DHX5XL6sbDsix2'
  },
  {
    nombre: 'Fabiana',
    apellido: 'Sanchez',
    correo: 'fabliana00@icloud.com',
    fecha_pago: '2/8/2018',
    paquete: '3 meses ilimitados',
    fecha_corte: '11/1/18',
    creditos: 'ilimitado',
    id: '3lRO21DmGjNZREyITyoUcKwK6w73'
  },
  {
    nombre: 'Lizbeth',
    apellido: 'Sepulveda',
    correo: 'lizbethaida@gmail.com',
    fecha_pago: '19/10/2018',
    paquete: '10 clases',
    fecha_corte: '11/19/18',
    creditos: 8,
    id: 'rabaEItlp7enE10vZnfaFfV8gup2'
  },
  {
    nombre: 'Paola',
    apellido: 'Solana',
    correo: 'paosolana@hotmail.com',
    fecha_pago: '1/10/2018',
    paquete: '20 clases',
    fecha_corte: '11/1/18',
    creditos: 1,
    id: 'oEh1joPo2YZyw04EdvmTJL2Caqu1'
  },
  {
    nombre: 'Ruthy',
    apellido: 'Tafich',
    correo: 'ruthytk@gmail.com',
    fecha_pago: '23/10/2018',
    paquete: '20 clases',
    fecha_corte: '11/23/18',
    creditos: 17,
    id: 'Mt6rz2vx4PQ713WpSCFpPkZoYph1'
  },
  {
    nombre: 'Alejandra',
    apellido: 'Torres',
    correo: 'aletorresgzz91@gmail.com',
    fecha_pago: '8/10/2018',
    paquete: 'mes ilimitado',
    fecha_corte: '11/8/18',
    creditos: 'ilimitado',
    id: 'yyNaCuGxmfQs0X5q3uAyGGViqD73'
  },
  {
    nombre: 'Mariana',
    apellido: 'Treviño',
    correo: 'mariana.tt@gmail.com',
    fecha_pago: '9/10/2018',
    paquete: '10 clases',
    fecha_corte: '11/9/18',
    creditos: 3,
    id: 'mx54eFNTHufUTHq51T21DlYmKGi2'
  },
  {
    nombre: 'Cynthia',
    apellido: 'Valdes',
    correo: 'cynthiavaldesm@hotmail.com',
    fecha_pago: '1/8/2018',
    paquete: '3 meses',
    fecha_corte: '11/1/18',
    creditos: 'ilimitado',
    id: '0MLRKJxschVsgvPm6c15rf0hKUf2'
  },
  {
    nombre: 'Lucia',
    apellido: 'Vargas',
    correo: 'lucia.vargasc@hotmail.com',
    fecha_pago: '16/10/2018',
    paquete: 'mes ilimitado',
    fecha_corte: '11/16/18',
    creditos: 'ilimitado',
    id: 'Upak2WPQGFelFHTPRkZq61CJVNh2'
  },
  {
    nombre: 'Maria',
    apellido: 'Vargas',
    correo: 'maria.vargasc@hotmail.com',
    fecha_pago: '16/10/2018',
    paquete: 'mes ilimitado',
    fecha_corte: '11/16/18',
    creditos: 'ilimitado',
    id: 'X5uzXODZqDZYpMenVaIT52jzLVs1'
  },
  {
    nombre: 'Ale',
    apellido: 'Vazquez',
    correo: 'ale_vazque@hotmail.com',
    fecha_pago: '4/10/2018',
    paquete: 'mes ilimitado',
    fecha_corte: '11/4/18',
    creditos: 'ilimitado',
    id: 'ut0429eDSAMMtVfNvBHVQczVZhr2'
  },
  {
    nombre: 'Georgina',
    apellido: 'Vazquez',
    correo: 'georginavzzm@gmail.com',
    fecha_pago: '22/10/2018',
    paquete: 'mes ilimitado',
    fecha_corte: '11/22/18',
    creditos: 'ilimitado',
    id: '6VV4eqJW4XVRtSnocYZVQgvrlKs1'
  },
  {
    nombre: 'Ana Carola',
    apellido: 'Vera',
    correo: 'annacarovela@gmail.com',
    fecha_pago: '13/10/2018',
    paquete: '20 clases',
    fecha_corte: '11/13/18',
    creditos: 11,
    id: 'kA5wN393JjeeqWz742AjUxkiT043'
  },
  {
    nombre: 'Carolina',
    apellido: 'Victorio',
    correo: 'caritovictorio@hotmail.com',
    fecha_pago: '25/10/2018',
    paquete: '20 clases',
    fecha_corte: '11/25/18',
    creditos: 'ilimitado',
    id: 'cYoad3GbHXcSmM1XbXaXYt1jWu63'
  }
]

export default class extends React.Component {
  // componentDidMount() {
  //   const users = []
  //   db.ref('usuario').once('value', snap => {
  //     snap.forEach(snapUser => {
  //       const user = snapUser.val()
  //       csv.map(
  //         u =>
  //           u.correo === user.correo &&
  //           users.push({ ...user, id: snapUser.key })
  //       )
  //     })

  //     console.log(users)
  //   })
  // }

  printcsv = async () => {
    const updatePromise = csv.map(
      async ({
        fecha_pago,
        nombre,
        apellido,
        correo,
        fecha_corte,
        creditos,
        id
      }) => {
        const isIlimitado = creditos === 'ilimitado' ? true : false
        if (isIlimitado) {
          db.ref(`usuario/${id}`)
            .update({
              correo,
              edad: 20,
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
              fecha_nacimiento: moment().format()
            })
            .then(() => true)
        } else {
          db.ref(`usuario/${id}`)
            .update({
              correo,
              edad: 20,
              nombre: nombre + ' ' + apellido,
              status: 1,
              telefono: '0000000000',
              clases: {},
              creditos: { '-LPrNpstwZt7J3NLUJXc': +creditos },
              created_at: moment().format(),
              last_class: moment().format(),
              tarjetas: {},
              invitado: false,
              fecha_nacimiento: moment().format()
            })
            .then(() => true)
        }
      }
    )

    const updateResolve = await Promise.all(updatePromise)
    console.log(updateResolve)
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

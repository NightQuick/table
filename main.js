export const headers = [
  {
    label: '№',
    sortable: false
  },
  {
    key: 'name',
    label: 'Название'
  },
  {
    key: 'year',
    label: 'Год'
  },
  {
    key: 'price',
    label: 'Цена'
  },
  {
    key: 'rate',
    label: 'Рейтинг'
  }
];
export const data = [
  {
    id: 1,
    name: 'Minecraft',
    year: '2011',
    price: '26.95$',
    rate: '9.3'
  },
  {
    id: 2,
    name: 'Counter-Strike 2',
    year: '2023',
    price: '0',
    rate: '7.8'
  },
  {
    id: 3,
    name: 'Grand Theft Auto V',
    year: '2013',
    price: '29.99$',
    rate: '9.0'
  },
  {
    id: 4,
    name: 'The Witcher 3: Wild Hunt',
    year: '2015',
    price: '39.99$',
    rate: '9.7'
  },
  {
    id: 5,
    name: 'Red Dead Redemption 2',
    year: '2018',
    price: '59.99$',
    rate: '9.5'
  },
  {
    id: 6,
    name: 'Elden Ring',
    year: '2022',
    price: '59.99$',
    rate: '9.3'
  },
  {
    id: 7,
    name: 'Cyberpunk 2077',
    year: '2020',
    price: '49.99$',
    rate: '7.5'
  },
  {
    id: 8,
    name: "Baldur's Gate 3",
    year: '2023',
    price: '59.99$',
    rate: '9.8'
  },
  {
    id: 9,
    name: 'Dota 2',
    year: '2013',
    price: '0',
    rate: '8.5'
  },
  {
    id: 10,
    name: 'Apex Legends',
    year: '2019',
    price: '0',
    rate: '8.0'
  },
  {
    id: 11,
    name: 'Fortnite',
    year: '2017',
    price: '0',
    rate: '8.2'
  },
  {
    id: 12,
    name: 'The Legend of Zelda: Breath of the Wild',
    year: '2017',
    price: '59.99$',
    rate: '9.7'
  },
  {
    id: 13,
    name: 'God of War (2018)',
    year: '2018',
    price: '19.99$',
    rate: '9.5'
  },
  {
    id: 14,
    name: 'Stardew Valley',
    year: '2016',
    price: '14.99$',
    rate: '9.2'
  },
  {
    id: 15,
    name: 'Valorant',
    year: '2020',
    price: '0',
    rate: '7.9'
  }
];
import { Table } from './Table.js';
let table = new Table(headers, data);
table.render();

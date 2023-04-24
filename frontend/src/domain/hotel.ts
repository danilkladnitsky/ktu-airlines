export type Hotel = {
    name: string;
    stars: number;
    description: string;
    thumbnailUrl: string;
  active: boolean;
  service1: string;
  service2: string;
    service3: string;
}

export const HOTELS: Hotel[] = [
  {
    name: 'KTU Resort Hotel 5',
    description: 'Это идеальное место для тех, кто хочет насладиться природой и отдохнуть от надоевшей городской суеты. Расположенный на шикарном берегу моря, отель предлагает своим гостям комфортабельные домики с прекрасным видом',
    stars: 5,
    thumbnailUrl: 'hotels/ktu.png',
    active: true,
    service1: 'Трансфер',
    service2: 'Питание',
    service3: 'SPA',
  },
  {
    name: 'Grand Blue Palace',
    description: 'Здесь на первой линии вы сможете насладиться морским бризом, песчаными пляжами и соседством с крабами. Но не переживайте, они уже забронировали свои номера и не будут вас беспокоить! Такие соседи добавят  экзотики вашему отдыху',
    stars: 3,
    thumbnailUrl: 'hotels/blue.png',
    active: false,
    service1: 'Завтрак',
    service2: 'Камера хранения для багажа',
    service3: 'Детский клуб',
  },
  {
    name: 'SUNLIGHT Garden Hotel',
    description: 'В наших номерах гостей ожидает мини-бар, с большим ассортиментом коктейлей. Благодаря фруктовым прохладным напиткам, гости могут насладиться отдыхом прямо в номере. Или выйти на пляж и продолжить веселье',
    stars: 4,
    thumbnailUrl: 'hotels/garden.png',
    active: false,
    service1: 'Круглосуточный ресепшен',
    service2: 'Шведский стол',
    service3: 'Спортзал на территории',
  },
];

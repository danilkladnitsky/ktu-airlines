export type Hotel = {
    name: string;
    stars: number;
    description: string;
    thumbnailUrl: string;
    active: boolean;
}

export const HOTELS: Hotel[] = [
  {
    name: 'KTU Resort Hotel 5',
    description: 'Это идеальное место для тех, кто хочет насладиться природой и отдохнуть от городской суеты. Расположенный на берегу моря, отель предлагает своим гостям комфортабельные домики с прекрасным видом',
    stars: 5,
    thumbnailUrl: 'hotels/ktu.png',
    active: true,
  },
  {
    name: 'Grand Blue Palace',
    description: 'Здесь вы сможете насладиться морским бризом, песчаными пляжами и соседством с крабами. Но не переживайте, они уже забронировали свои номера и не будут вас беспокоить! Такие соседи добавят  экзотики вашему отдыху',
    stars: 3,
    thumbnailUrl: 'hotels/blue.png',
    active: false,
  },
  {
    name: 'SUNLIGHT Garden Hotel',
    description: 'В наших номерах гостей ожидает мини-бар, с большим ассортиментом коктейлей. Благодаря фруктовым прохладным напиткам, гости могут насладиться отдыхом прямо в номере. Или выйти на пляж и продолжить веселье dsdddd ssss sss',
    stars: 4,
    thumbnailUrl: 'hotels/garden.png',
    active: false,
  },
];

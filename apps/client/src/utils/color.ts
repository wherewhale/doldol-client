import { ColorPalette } from "@ui/theme";

export const getColorFromString = (str: string): string => {
  const availableColors = [
    ColorPalette["primary-brand"],
    ColorPalette["green-1"],
    ColorPalette["purple-1"],
    ColorPalette["red-1"],
    ColorPalette["yellow-1"],
  ];

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash % availableColors.length);

  return availableColors[index];
};

export const getCharacterFromString = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash % 8);
  return `/assets/images/party/comments/${index + 1}.png`;
};

export const getRandomColor = () => {
  const colors = [
    "bg-primary-brand",
    "bg-green-1",
    "bg-purple-1",
    "bg-red-1",
    "bg-yellow-1",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

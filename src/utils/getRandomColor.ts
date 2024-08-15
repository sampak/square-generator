export const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    const letterIndex = Math.floor(Math.random() * 15); 
    color += letters[letterIndex];
  }

  if (color === '#FFFFFF' || parseInt(color.slice(1), 16) > 0xCCCCCC) {
    return getRandomColor(); 
  }

  return color;
};
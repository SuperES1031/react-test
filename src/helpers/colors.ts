import { DEFAULT_COLORS } from "@/constants/defaultColors";

export const getRandomColors = (amount: number) => {
  for (let i = DEFAULT_COLORS.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [DEFAULT_COLORS[i], DEFAULT_COLORS[j]] = [DEFAULT_COLORS[j], DEFAULT_COLORS[i]];
  }
  
  return DEFAULT_COLORS.slice(0, amount);
};
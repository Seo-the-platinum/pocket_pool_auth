import type { RouterOutputs } from "~/trpc/shared";

export type Square = {
  id: string;
  name: string | null;
  status: string;
  userId: string | null;
  number: number;
  x: number | null;
  y: number | null;
  poolId: string;
};

export type SoldSquare = {
  id: string;
  name: string;
  status: string;
  userId: string | null;
  number: number;
  x: number | null;
  y: number | null;
  poolId: string;
};

export type Squares = {
  squares: Square[];
};

type winner = {
  x: number;
  y: number;
  period: number;
};

export type SoldSquares = {
  squares: SoldSquare[];
  setUser: React.Dispatch<React.SetStateAction<string>>;
  winners: winner[] | undefined;
  pricePerSquare: number;
};

export type SoldSquareWithWinner = SoldSquare & {
  period: number;
};

export type Quarter = {
  away: number;
  home: number;
  period: number;
};

export type Pool = RouterOutputs["pool"]["getPoolById"];

export type ExtendedPools = RouterOutputs["pool"]["getPoolById"] & {
  session: string | undefined;
  away: {
    id: string;
    name: string;
    logo: string;
    score: number | null | undefined;
    abbreviation: string;
  };
  home: {
    id: string;
    name: string;
    logo: string;
    score: number | null | undefined;
    abbreviation: string;
  };
  quarters: Quarter[] | undefined;
};

export type SelectedSquare = Square & { isSelected: boolean };
export type SelectedSquares = SelectedSquare[];

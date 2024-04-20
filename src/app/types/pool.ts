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

export type SoldSquares = {
  squares: SoldSquare[];
};

export type Quarter = {
  away: number;
  home: number;
  period: number;
};

export type ExtendedPools = RouterOutputs["pool"]["getPoolById"] & {
  session: string | undefined;
  away: {
    id: string;
    name: string;
    logo: string;
    score: number | null | undefined;
  };
  home: {
    id: string;
    name: string;
    logo: string;
    score: number | null | undefined;
  };
  quarters: Quarter[] | undefined;
};

export type SelectedSquare = Square & { isSelected: boolean };
export type SelectedSquares = SelectedSquare[];

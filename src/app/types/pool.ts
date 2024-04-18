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

export type soldSquare = {
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

export type soldSquares = {
  squares: soldSquare[];
};

// export type quarter = {
//   away: number;
//   home: number;
//   period: number;
// };

// export type PoolContainer = RouterOutputs["pool"]["getPoolById"] & {
//   session: string | undefined;
//   away: {
//     id: string;
//     name: string;
//     logo: string;
//     score: number | null | undefined;
//   };
//   home: {
//     id: string;
//     name: string;
//     logo: string;
//     score: number | null | undefined;
//   };
//   quarters: quarter[] | undefined;
// };

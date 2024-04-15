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

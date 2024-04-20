import type { SelectedSquares, SelectedSquare } from "../types/pool";

export const adminSquares = (
  adminSquares: SelectedSquares,
  signiture: string,
) => {
  return adminSquares
    .filter((square) => {
      if (square.isSelected) {
        return square;
      }
    })
    .map((square: SelectedSquare) => {
      return {
        id: square.id,
        status: square.status,
        name:
          square.status === "open" ? "" : square.name ? square.name : signiture,
        userId:
          square.status !== "open" && square.userId ? square.userId : undefined,
      };
    });
};

export const userSquares = (userSquares: SelectedSquares) => {
  return userSquares
    .filter((square) => {
      if (square.isSelected) {
        return square;
      }
    })
    .map((square: SelectedSquare) => square.id);
};

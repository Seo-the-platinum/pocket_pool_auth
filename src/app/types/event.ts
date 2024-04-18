export type GameType = {
  boxscore: {
    teams: [
      {
        team: {
          id: string;
          name: string;
          logo: string;
        };
      },
      {
        team: {
          id: string;
          name: string;
          logo: string;
        };
      },
    ];
  };
  plays: [
    {
      awayScore: number;
      homeScore: number;
      type: {
        text: string;
      };
      period: {
        number: number;
      };
    },
  ];
};

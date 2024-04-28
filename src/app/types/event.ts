export type GameType = {
  boxscore: {
    teams: [
      {
        team: {
          abbreviation: string;
          id: string;
          name: string;
          logo: string;
        };
      },
      {
        team: {
          abbreviation: string;
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

export type EventData = {
  competitions: [
    {
      date: Date;
      competitors: [
        {
          team: {
            $ref: string;
          };
        },
        {
          team: {
            $ref: string;
          };
        },
      ];
      status: {
        $ref: string;
      };
    },
  ];
  id: string;
};

export type StatusType = {
  type: {
    description: string;
    shortDetail: string;
  };
};

export type TeamData = {
  name: string;
  logos: [
    {
      href: string;
    },
  ];
};

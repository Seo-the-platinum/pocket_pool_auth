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
  header: {
    league: {
      slug: string;
    };
    competitions: [
      {
        date: Date;
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
        displayValue: string;
      };
      clock: {
        displayValue: string;
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
          id: string;
          team: {
            $ref: string;
          };
        },
        {
          id: string;
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

export type CreateTile = {
  away: {
    name: string;
    logo: string;
  };
  home: {
    name: string;
    logo: string;
  };
  dateString: Date;
};

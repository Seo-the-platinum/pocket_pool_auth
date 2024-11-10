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
  drives?: {
    current: {
      plays: {
        period: { number: number };
        awayScore: number;
        homeScore: number;
        clock: {
          displayValue: string;
        };
        type: {
          text: string;
        };
      }[];
    };
    previous: {
      plays: {
        period: { number: number };
        type: {
          text: string;
        };
        clock: {
          displayValue: string;
        };
        awayScore: number;
        homeScore: number;
      }[];
    }[];
  };
  plays?: [
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
  scoringPlays?: [
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

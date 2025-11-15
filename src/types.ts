export interface Participant {
  id: string;
  name: string;
  timestamp: number;
}

export interface LotteryData {
  participants: Participant[];
  winner: Participant | null;
}


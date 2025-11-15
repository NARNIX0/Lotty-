import { LotteryData, Participant } from '../types';

const STORAGE_KEY = 'lotty-data';

export const getLotteryData = (): LotteryData => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    return JSON.parse(data);
  }
  return { participants: [], winner: null };
};

export const saveLotteryData = (data: LotteryData): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const addParticipant = (name: string): Participant => {
  const data = getLotteryData();
  const participant: Participant = {
    id: Date.now().toString(),
    name,
    timestamp: Date.now(),
  };
  data.participants.push(participant);
  saveLotteryData(data);
  return participant;
};

export const drawWinner = (): Participant | null => {
  const data = getLotteryData();
  if (data.participants.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * data.participants.length);
  const winner = data.participants[randomIndex];
  data.winner = winner;
  saveLotteryData(data);
  return winner;
};

export const resetLottery = (): void => {
  saveLotteryData({ participants: [], winner: null });
};


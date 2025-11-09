export interface Topic {
  id: string;
  title: string;
  description: string;
  color: string;
  progress: number;
  unlocked: boolean;
  icon: React.ReactNode;
  requiredLevel?: number;
}

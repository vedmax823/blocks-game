import { StateCreator, create } from "zustand";
import { PersistOptions, createJSONStorage, devtools, persist } from "zustand/middleware";

interface ScoreStore {
  score: number;
  addScore: (sum: number) => void;
  clearScore: () => void;
}

type MyPersist = (
  config: StateCreator<ScoreStore>,
  options: PersistOptions<ScoreStore>
) => StateCreator<ScoreStore>

const useScore = create<ScoreStore, []>(
  (persist as MyPersist)((set, get) => ({
        score: 0,
        addScore: (sum: number) => {
          set({score : get().score + sum})
        },
        clearScore: () => {
          set({score : 0})
        },
      }),
      {
        name: "score-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  
);

export default useScore;



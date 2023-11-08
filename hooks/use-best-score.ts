import { StateCreator, create } from "zustand";
import { PersistOptions, createJSONStorage, devtools, persist } from "zustand/middleware";

interface BestScoreStore {
    bestScore: number;
    setScore: (bestScore: number) => void;
}

type MyPersist = (
  config: StateCreator<BestScoreStore>,
  options: PersistOptions<BestScoreStore>
) => StateCreator<BestScoreStore>

const useBestScore = create<BestScoreStore, []>(
  (persist as MyPersist)((set) => ({
        bestScore: 0,
        setScore: (bestScore: number) => {
          set({bestScore})
        },
      }),
      {
        name: "best-score-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  
);

export default useBestScore;



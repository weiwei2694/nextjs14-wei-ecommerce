import { create } from 'zustand'

interface State {
  triggerUseEffect: string | null;
}

interface SetState {
  setTriggerUseEffect: (value: string | null) => void;
}

type TriggerUseEffect = State & SetState;

const useTriggerUseEffect = create<TriggerUseEffect>()((set) => ({
  triggerUseEffect: null,
  setTriggerUseEffect: (value) => set({ triggerUseEffect: value }),
}))

export default useTriggerUseEffect;
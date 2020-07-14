import { User } from "types";

export interface State {
  app: {
    title: string;
    width: number | null;
    height: number | null;
    user: User | null | undefined;
  },
}

const initialState: State = {
  app: {
    title: '',
    width: null,
    height: null,
    user: null,
  },
};

export default initialState;

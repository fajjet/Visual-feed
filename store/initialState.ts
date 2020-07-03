import { IUserDocument } from "server/models/user";

export interface State {
  app: {
    title: string;
    width: number | null;
    height: number | null;
    user: IUserDocument | null;
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

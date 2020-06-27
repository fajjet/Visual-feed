export interface State {
  app: {
    title: string;
    width: number | null;
    height: number | null;
  },
}

const initialState: State = {
  app: {
    title: '',
    width: null,
    height: null,
  },
};

export default initialState;

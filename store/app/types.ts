
enum Types {
  SET_TITLE = 'SET_TITLE',
  CHANGE_DIMENSIONS = 'CHANGE_DIMENSIONS',
}

interface SetTitle {
  type: typeof Types.SET_TITLE;
  payload: {
    title: string;
  };
}

interface changeDimensions {
  type: typeof Types.CHANGE_DIMENSIONS;
  payload: {
    width: number;
    height: number;
  };
}

export default Types;

export type AppActionTypes = SetTitle | changeDimensions

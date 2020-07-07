enum Types {
  SET_TITLE = 'SET_TITLE',
  CHANGE_DIMENSIONS = 'CHANGE_DIMENSIONS',
  SET_USER = 'SET_USER',
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

interface setUser {
  type: typeof Types.SET_USER;
  payload: {
    user: any;
  };
}

export default Types;

export type AppActionTypes = SetTitle | changeDimensions | setUser;

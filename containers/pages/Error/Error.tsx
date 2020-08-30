import React from 'react';

import Styled from './Error.style';

interface Props {
  statusCode: number;
}

const Error = (props: Props) => {
  const code = props.statusCode;
  return (
    <Styled.Root>
      <div className={'content-wrapper'}>
        <h1>{code}</h1>
      </div>
    </Styled.Root>
  )
};

Error.defaultProps = {
  statusCode: 404,
}

export default React.memo(Error);

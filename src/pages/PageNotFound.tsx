import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { PATH } from '../routes/path';

interface Props extends RouteComponentProps<{}> {}

const PageNotFound = ({ history }: Props) => {
    const handleGoHome = React.useCallback(() => history.push(PATH.HOME), []);
    const handleGoBack = React.useCallback(() => history.goBack(), []);

    return (
        <>
            <h1>Page not found!</h1>
            <button onClick={handleGoBack}>Go back</button>
            <button onClick={handleGoHome}>Go home</button>
        </>
    );
};

export default PageNotFound;

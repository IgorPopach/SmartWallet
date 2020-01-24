import React, { FunctionComponent } from 'react';
import { shallow } from 'enzyme';

import App, { AppProps } from './../components/App';

it('<App />', () => {
    const result = shallow(<App title="Ok" paragraph="Paragraph" />).contains(<h2>Ok</h2>);
    const result2 = shallow(<App title="Ok" paragraph="Paragraph" />).contains(<p>Paragraph</p>);
    expect(result).toBeTruthy();
    expect(result2).toBeTruthy();
});

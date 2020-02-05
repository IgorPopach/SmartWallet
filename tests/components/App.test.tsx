import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';

import { App } from '../../src/containers/App/App';

type Props = React.ComponentProps<typeof App>;

describe('<App />', () => {
    const props: Props = {
        paragraph: 'Paragraph',
        user: null,
        initialize: jest.fn(),
        onLogin: jest.fn(),
        onLogout: jest.fn(),
        incrementMessage: jest.fn(),
    };
    let wrapper: ShallowWrapper<Props>;

    beforeAll(() => {
        wrapper = shallow(<App {...props} />);
    });

    it('Should have correct layout', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});

import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';

import Snackbar from './../../src/containers/Snackbar/Snackbar';

type Props = React.ComponentProps<typeof Snackbar>;

describe('<Snackbar />', () => {
    const props: Props = {
        messages: [
            {
                id: '1',
                title: 'Test alert 1',
                text: 'this is test text for Alert',
                type: 'info',
            },
            {
                id: '2',
                title: 'Test alert 2',
                text: 'this is test 2 text for Alert',
                type: 'success',
            },
            {
                id: '3',
                title: 'Test alert 3',
                text: 'this is test 3 text for Alert',
                type: 'warning',
            },
        ],
        closeAction: jest.fn(),
    };
    let wrapper: ShallowWrapper<Props>;
    beforeAll(() => {
        wrapper = shallow(<Snackbar {...props} />);
    });

    it('should have correct layout', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});

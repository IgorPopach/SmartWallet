import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';

import Alert from './../../src/components/Alert/Alert';

type Props = React.ComponentProps<typeof Alert>;

describe('<Alert />', () => {
    const props: Props = {
        message: {
            id: '1',
            title: 'Test alert 1',
            messageText: 'this is test text for Alert',
            type: 'info',
        },
        delay: 3000,
    };

    let wrapper: ShallowWrapper<Props>;

    beforeAll(() => {
        wrapper = shallow(<Alert {...props} />);
    });

    it('should have correct layout', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});

import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';

import Calendar from './../../../src/components/DateTimePicker/Calendar';

type Props = React.ComponentProps<typeof Calendar>;

describe('<Calendar />', () => {
    const props: Props = {
        data: 123,
        updateData: jest.fn(),
    };

    let wrapper: ShallowWrapper<Props>;

    beforeAll(() => {
        wrapper = shallow(<Calendar {...props} />);
    });

    it('Should have correct layout', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});

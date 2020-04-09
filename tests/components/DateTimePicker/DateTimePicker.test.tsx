import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';

import DateTimePicker from './../../../src/components/DateTimePicker/DateTimePicker';

type Props = React.ComponentProps<typeof DateTimePicker>;

describe('<DateTimePicker />', () => {
    const props: Props = {
        date: 123,
        handleClose: jest.fn(),
        onChange: jest.fn(),
        className: 'style',
    };

    let wrapper: ShallowWrapper<Props>;
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    // tslint:disable-next-line:no-any
    useStateSpy.mockImplementation((init: any) => [init, setState]);

    beforeAll(() => {
        wrapper = shallow(<DateTimePicker {...props} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should have correct layout', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('Render initial component', () => {
        expect(wrapper.find('Calendar')).toHaveLength(1);
        expect(wrapper.find('Time')).toHaveLength(0);
    });

    it('Should call setTab with 1', () => {
        wrapper
            .find('div.datetime_btn')
            .at(1)
            .simulate('click');
        expect(setState).toHaveBeenCalledWith(1);
    });

    it('Should call setTab with 0', () => {
        wrapper
            .find('div.datetime_btn')
            .first()
            .simulate('click');
        expect(setState).toHaveBeenCalledWith(0);
    });
});

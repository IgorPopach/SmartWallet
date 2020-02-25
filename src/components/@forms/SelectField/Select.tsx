import React, { ReactElement } from 'react';

import Dropdown from './Dropdown';

import { Option } from '../../../types';
import Input from '../Input';

const SELECT_TYPE = {
    OPTION: 'option',
    INPUT: 'input',
};

interface Props<V> {
    defaultValue?: string;
    name: string;
    options: Array<Option<V>>;
    onChange: (value: V) => void;
    children: HTMLElement | ReactElement;
    selectType?: string;
}

// tslint:disable-next-line:no-any
const Select = <V extends any>({
    defaultValue = '...',
    name,
    options,
    onChange,
    children,
    selectType = SELECT_TYPE.OPTION,
}: Props<V>) => {
    const [value, setValue] = React.useState('');

    const [label, setLabel] = React.useState(defaultValue);

    const [isOpened, setIsOpened] = React.useState(false);

    const [filteredOptions, setFilteredOptions] = React.useState(options);

    const setCurrentName = React.useCallback((option: Option<V>) => {
        setLabel(option.label);
        setValue(option.value);
        onChange(option.value);
    }, []);

    const openDropdown = React.useCallback(() => {
        if (!isOpened) {
            setIsOpened(true);
        }
        return;
    }, [isOpened, filteredOptions]);

    const closeDropdown = React.useCallback(() => setIsOpened(false), []);

    React.useEffect(() => {
        if (isOpened) {
            document.addEventListener('click', closeDropdown);
        }
        return () => document.removeEventListener('click', closeDropdown);
    }, [isOpened]);

    const filterOptions = (inputText: string) => {
        const filter = options.filter((option) => option.value.includes(inputText.toLowerCase()));
        setFilteredOptions(filter);
    };

    const changeHandler = React.useCallback(
        ({ target }) => {
            setValue(target.value);
            filterOptions(target.value);
        },
        [value],
    );

    const dropdownTriggerStyles = React.useMemo(() => {
        if (isOpened) {
            return 'form-control trigger-open';
        }
        return 'form-control trigger-close';
    }, [isOpened]);

    const dropdownInputStyles = React.useMemo(() => {
        if (isOpened) {
            return 'input-open';
        }
        return 'input-close';
    }, [isOpened]);

    const inputArea = React.useMemo(() => {
        switch (selectType) {
            case SELECT_TYPE.INPUT:
                return <Input className={dropdownInputStyles} onChange={changeHandler} value={value} />;
            default:
                setFilteredOptions(options);
                return <div className={dropdownTriggerStyles}>{label}</div>;
        }
    }, [selectType, isOpened, value]);

    const childrenWithProps = React.Children.map(children, (child) => {
        return React.cloneElement(child, { ...{ value, name }, type: 'hidden' });
    });

    return (
        <>
            {childrenWithProps}
            <Dropdown
                {...{ isOpened }}
                options={filteredOptions}
                onChange={setCurrentName}
                onClick={openDropdown}
                className="select"
            >
                {inputArea}
            </Dropdown>
        </>
    );
};

export default Select;

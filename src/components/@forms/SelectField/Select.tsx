import React from 'react';

import Dropdown from '././Dropdown';
import { Option } from '../../../types';
import Input from '../Input';
import { FieldMetaProps } from 'formik';

const SELECT_TYPE = {
    SELECT: 'select',
    LOOKUP: 'lookup',
};

interface Props<V> {
    defaultValue?: string;
    options: Array<Option<V>>;
    onChange: (value: V) => void;
    selectType?: string;
    meta: FieldMetaProps<V>;
}

// tslint:disable-next-line:no-any
const Select = <V extends any>({ options, onChange, meta, selectType = SELECT_TYPE.SELECT }: Props<V>) => {
    const [value, setValue] = React.useState(meta.value);

    const [isOpened, setIsOpened] = React.useState(false);

    const [filteredOptions, setFilteredOptions] = React.useState(options);

    const setCurrentName = React.useCallback((option: Option<V>) => {
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

    const validStyle = React.useMemo(() => {
        if (meta.touched && meta.error) {
            return 'is-invalid';
        }
        return '';
    }, [meta]);

    const dropdownTriggerStyles = React.useMemo(() => {
        if (isOpened) {
            return `form-control trigger trigger-open ${validStyle}`;
        }
        return `form-control trigger trigger-close ${validStyle}`;
    }, [isOpened, meta]);

    const dropdownInputStyles = React.useMemo(() => {
        if (isOpened) {
            return `input-open ${validStyle}`;
        }
        return `input-close ${validStyle}`;
    }, [isOpened, meta]);

    const inputArea = React.useMemo(() => {
        switch (selectType) {
            case SELECT_TYPE.LOOKUP:
                return <Input className={dropdownInputStyles} onChange={changeHandler} value={value} />;
            case SELECT_TYPE.SELECT:
                setFilteredOptions(options);
                return <div className={dropdownTriggerStyles}>{value}</div>;
        }
    }, [selectType, isOpened, value, meta]);

    return (
        <Dropdown
            {...{ isOpened }}
            options={filteredOptions}
            onChange={setCurrentName}
            onClick={openDropdown}
            className="select"
        >
            {inputArea}
        </Dropdown>
    );
};

export default Select;

import React from 'react';
import Item from './Item';

interface Option<V> {
    label: string;
    value: V;
}

interface Props<V> {
    isOpened?: boolean;
    className?: string;
    options: Array<Option<V>>;
    children: React.ReactNode;
    onChange: (option: Option<V>) => void;
    onClick: () => void;
}

// tslint:disable-next-line:no-any
const Dropdown = <V extends any>({ isOpened = false, options, children, className, onChange, onClick }: Props<V>) => {
    const classes = React.useMemo(() => {
        if (className) {
            return `dropdown ${className}`;
        }
        return 'dropdown';
    }, [className]);

    const list = React.useMemo(() => {
        if (options.length === 0) {
            return <Item value="empty" label="..." {...{ onClick }} />;
        }
        return options.map((option, id) => {
            const handleClick = () => onChange(option);
            return <Item key={id} {...option} onClick={handleClick} />;
        });
    }, [options]);

    return (
        <div className={classes} {...{ onClick }}>
            {children}

            {isOpened && <ul className="dropdown-list">{list}</ul>}
        </div>
    );
};

export default Dropdown;

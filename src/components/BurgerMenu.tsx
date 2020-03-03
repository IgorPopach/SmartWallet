import React from 'react';

interface Props {
    toggleAction: () => void;
    sidebarIsVisible: boolean;
}

const BurgerMenu = ({ toggleAction, sidebarIsVisible }: Props) => {
    const classes = React.useMemo(() => {
        let styles = 'burger-menu';
        if (sidebarIsVisible) {
            styles = 'burger-menu active';
        }
        return styles;
    }, [sidebarIsVisible]);

    const handleClick = React.useCallback(() => toggleAction(), []);
    return (
        <div className={classes} onClick={handleClick}>
            <span className="burger-menu-piece" />
            <span className="burger-menu-piece" />
            <span className="burger-menu-piece" />
        </div>
    );
};

export default BurgerMenu;

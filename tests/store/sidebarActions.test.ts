import { toggleSidebar, closeSidebar } from './../../src/store/sidebar/actions';
import { TYPES, SidebarActionTypes } from './../../src/store/sidebar/types';

describe('Sidebar actions:', () => {
    it('toggleSidebar() should create an action to toggle isVisible', () => {
        const expectedAction: SidebarActionTypes = {
            type: TYPES.TOGGLE_SIDEBAR,
        };

        expect(toggleSidebar()).toEqual(expectedAction);
    });

    it('closeSidebar() should create an action to set isVisible false', () => {
        const expectedAction: SidebarActionTypes = {
            type: TYPES.CLOSE_SIDEBAR,
        };

        expect(closeSidebar()).toEqual(expectedAction);
    });
});

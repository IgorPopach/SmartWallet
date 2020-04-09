import { sidebarReducer, initialState } from '../../src/store/sidebar/reducer';
import { TYPES, SidebarActionTypes, SidebarState } from '../../src/store/sidebar/types';

describe('Sidebar reducer:', () => {
    it('Should return the initial state', () => {
        expect(sidebarReducer(undefined, {} as SidebarActionTypes)).toEqual(initialState);
    });

    it('TOGGLE_SIDEBAR', () => {
        const action: SidebarActionTypes = {
            type: TYPES.TOGGLE_SIDEBAR,
        };

        expect(sidebarReducer(initialState, action)).toEqual({
            ...initialState,
            isVisible: !initialState.isVisible,
        });
    });

    it('CLOSE_SIDEBAR', () => {
        const state: SidebarState = {
            ...initialState,
            isVisible: true,
        };
        const action = {
            type: TYPES.CLOSE_SIDEBAR,
        };

        expect(sidebarReducer(state, action)).toEqual({
            ...state,
            isVisible: false,
        });
    });
});

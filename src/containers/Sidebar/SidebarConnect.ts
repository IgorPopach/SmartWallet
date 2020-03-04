import { connect } from 'react-redux';
import Sidebar from './Sidebar';
import { AppState } from '../../store';
import { Dispatch, bindActionCreators } from 'redux';
import { closeSidebar } from '../../store/sidebar/actions';

export interface StateProps {
    isVisible: boolean;
}

export interface DispatchProps {
    closeAction: () => void;
}

const mapStateToProps = ({ sidebar }: AppState): StateProps => ({
    isVisible: sidebar.isVisible,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
    bindActionCreators(
        {
            closeAction: closeSidebar,
        },
        dispatch,
    );

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

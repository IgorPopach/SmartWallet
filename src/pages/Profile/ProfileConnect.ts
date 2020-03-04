import { connect } from 'react-redux';
import { User } from '../../types';
import { AppState } from '../../store';
import Profile from './Profile';

interface StateProps {
    user: User | null;
}

const mapStateToProps = (state: AppState): StateProps => ({
    user: state.session.user,
});

export default connect(mapStateToProps)(Profile);

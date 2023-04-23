import { connect } from 'react-redux';
import { compose } from 'redux';
import { actions } from '../../redux/dialogs-reduser'
//import { withAuthNavigate } from '../../hoc/withAuthNavigate';

import Dialogs from './Dialogs';
import { AppStateType } from '../../redux/redux-store';




let mapStateToProps = (state: AppStateType) => {
  return {
    dialogsPage: state.dialogsPage,
  }

}

export default compose<React.ComponentType>(
  connect(mapStateToProps, {...actions}),
  //withAuthNavigate,
)(Dialogs)

import { connect } from 'react-redux';
import { compose } from 'redux';
import { actions } from './../../redux/dialogs-reduser'
//import { withAuthNavigate } from '../../hoc/withAuthNavigate';

import Dialogs from './Dialogs';




let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  }

}
let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (newMessageBody) => {
      dispatch(actions.sendMessageCreator(newMessageBody))
    },
  }
}



export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  //withAuthNavigate,
)(Dialogs)

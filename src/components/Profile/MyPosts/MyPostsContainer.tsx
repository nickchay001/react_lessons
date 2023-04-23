import { connect } from 'react-redux';
import { actions, addPost} from '../../../redux/profile-reducer';
import MyPosts, { DispatchPropsType, MapPropsType } from './MyPosts';
import { AppStateType } from '../../../redux/redux-store';



const mapStateToProps = (state:AppStateType) => {
  return {
    posts: state.profilePage.posts,
  }
}



const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {
  addPost: actions.addPost,
})(MyPosts);

export default MyPostsContainer
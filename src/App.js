import React, { Component, Suspense } from 'react';
import { connect, Provider } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { compose } from 'redux';
import './App.css';
import Preloader from './components/common/Preloader/Preloader';
import Footer from './components/Footer/Footer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Header/Login/Login';
import Navbar from './components/Navbar/Navbar';
import { withRouter } from './hoc/withRouter';
import { initializeApp } from './redux/app-reducer';
import store from './redux/redux-store';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const Music = React.lazy(() => import('./components/Music/Music'));
const Setting = React.lazy(() => import('./components/Setting/Setting'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const News = React.lazy(() => import('./components/News/News'));


export class App extends Component {
  catchAllUnhandledErrors= (promiseRejectionEvent) =>{
    alert("some error occured");
    //console.log(promiseRejectionEvent)
  }
  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  componentWillUnmount(){
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <div className='app-wrapper' >
        <HeaderContainer />
        <Navbar />
        <div className='app-wrapper-content'>
          <Suspense fallback={<Preloader />}>
            <Routes>
              <Route path='/' element={<Navigate to={"/profile"} />} />
              <Route path='/profile/:userId?' element={<ProfileContainer />} /> 
              <Route path='/dialogs' element={<DialogsContainer />} />
              <Route path='/music' element={<Music />} />
              <Route path='/news' element={<News />} />
              <Route path='/setting' element={<Setting />} />
              <Route path='/users' element={<UsersContainer />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </div>
    )
  }
}
let mapStateToProps = (state) => ({
  initialized: state.app.initialized,
})




let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App)
//BrowserRouter is better, but on the GitHub Page it isn`t work
const SamuraiJSApp = (props) => {
  return <HashRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </HashRouter>
}

export default SamuraiJSApp;
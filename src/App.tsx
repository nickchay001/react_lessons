import React, { Suspense, useEffect } from 'react';
import { connect, Provider } from 'react-redux';
import { HashRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import { compose } from 'redux';
import './App.css';
import Preloader from './components/common/Preloader/Preloader';
//import Footer from './components/Footer/Footer';
import { LoginPage } from './components/Header/Login/Login';
import { withRouter } from './hoc/withRouter';
import { initializeApp } from './redux/app-reducer';
import store, { AppStateType } from './redux/redux-store';
import { UsersPage } from './components/Users/UsersContainer';
import 'antd/dist/reset.css';


import {  Layout, Menu, theme } from 'antd';
import SubMenu from 'antd/es/menu/SubMenu';
import { UserOutlined, TeamOutlined } from '@ant-design/icons';
import {AppHeader} from './components/Header/Header';

const {  Content, Footer, Sider } = Layout;

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const Music = React.lazy(() => import('./components/Music/Music'));
const Setting = React.lazy(() => import('./components/Setting/Setting'));

const News = React.lazy(() => import('./components/News/News'));


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

export const App: React.FC<MapPropsType & DispatchPropsType> = (props) => {
  const catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    alert("some error occured");
    //console.log(promiseRejectionEvent)
  }
  useEffect(() => {
    initializeApp()
    window.addEventListener("unhandledrejection", catchAllUnhandledErrors);
  }, [])
  useEffect(() => {
    window.removeEventListener("unhandledrejection", catchAllUnhandledErrors);
  }, [])

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  if (props.initialized) {
    return <Preloader />
  }
  return (
    <Layout>
      <AppHeader />
      <Content style={{ padding: '0 50px' }}>
        <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              //defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}

            >
              <SubMenu icon={<UserOutlined />} key='sub1' title="Profile">
                <Menu.Item key='1' ><Link to="/profile">Profile</Link></Menu.Item>
                <Menu.Item key='2'><Link to="/dialogs">Messages</Link></Menu.Item>
              </SubMenu>
              <SubMenu icon={<TeamOutlined />} key='sub2' title="Developers">
                <Menu.Item key='3'><Link to="/users">Users</Link></Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <Suspense fallback={<Preloader />}>
              <Routes>
                <Route path='/' element={<Navigate to={"/profile"} />} />
                <Route path='/profile/:userId?' element={<ProfileContainer />} />
                <Route path='/dialogs' element={<DialogsContainer />} />
                <Route path='/music' element={<Music />} />
                <Route path='/news' element={<News />} />
                <Route path='/setting' element={<Setting />} />
                <Route path='/users' element={<UsersPage pageTitle={"Ass"} />} />
                <Route path='/login' element={<LoginPage />} />
              </Routes>
            </Suspense>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>©2023 Created by Nick Chay</Footer>
    </Layout>
    /*<div className='app-wrapper' >
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
            <Route path='/users' element={<UsersPage pageTitle={"Ass"} />} />
            <Route path='/login' element={<LoginPage />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </div>*/
  )
}
let mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
})




let AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App)
//BrowserRouter is better, but on the GitHub Page it isn`t work
const SamuraiJSApp: React.FC = () => {
  return <HashRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </HashRouter>
}

export default SamuraiJSApp;



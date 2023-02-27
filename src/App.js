import { Route, Routes } from 'react-router-dom';
import './App.css';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Music from './components/Music/Music';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Profile from './components/Profile/Profile';
import Setting from './components/Setting/Setting';




function App(props) {

  return (

    <div className='app-wrapper'>
      <Header />
      <Navbar state={props.state.navbarFrends} />
      <div className='app-wrapper-content'>
        <Routes>
          <Route path='/' element={<Profile
            profilePage={props.state.profilePage}
            store={props.store}
            dispatch={props.dispatch}
          />} />
          <Route path='/dialogs' element={<DialogsContainer store={props.store}/>} />
          <Route path='/music' element={<Music />} />
          <Route path='/news' element={<News />} />
          <Route path='/setting' element={<Setting />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;

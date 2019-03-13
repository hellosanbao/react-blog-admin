import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable'
import ScrollTop from '@src/components/ScrollTop'
import 'animate.css/animate.min.css'


//路由组件引入采用react-loadable进行拆分模块，避免打包后bundle.js过大
const Home = loadable(()=>import('@pages/home/index.jsx'))
const BlockDetail = loadable(()=>import('@pages/BlockDetail/index.jsx'))
const ThemeBookList = loadable(()=>import('@pages/ThemeBookList/index.jsx'))
const Classify = loadable(()=>import('@pages/Classify/index.jsx'))
const Rank = loadable(()=>import('@pages/Rank/index.jsx'))
const ShuHuang = loadable(()=>import('@pages/ShuHuang/index.jsx'))
const BookDetail = loadable(()=>import('@pages/BookDetail/index.jsx'))
const BookShelf = loadable(()=>import('@pages/BookShelf/index.jsx'))
const Search = loadable(()=>import('@pages/Search/index.jsx'))
const BookListDetail = loadable(()=>import('@pages/BookListDetail/index.jsx'))
const ChapterList = loadable(()=>import('@pages/ChapterList/index.jsx'))
const ClassListDetail = loadable(()=>import('@pages/ClassListDetail/index.jsx'))
const Read = loadable(()=>import('@pages/Read/index.jsx'))

const Routes = () => (
    <BrowserRouter>
        <Fragment>
            <ScrollTop>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/Home" component={Home}/>
                    <Route path="/BlockDetail" component={BlockDetail}/>
                    <Route path="/ThemeBookList" component={ThemeBookList}/>
                    <Route path="/Classify" component={Classify}/>
                    <Route path="/ShuHuang" component={ShuHuang}/>
                    <Route path="/Rank" component={Rank}/>
                    <Route path="/BookDetail" component={BookDetail}/>
                    <Route path="/BookShelf" component={BookShelf}/>
                    <Route path="/Search" component={Search}/>
                    <Route path="/BookListDetail" component={BookListDetail}/>
                    <Route path="/ChapterList" component={ChapterList}/>
                    <Route path="/ClassListDetail/:alias/:title" component={ClassListDetail}/>
                    <Route path="/Read" component={Read}/>
                    {/* 匹配不到路由显示组件 */}
                    {/* <Route component={PageLoad}/> */}
                    {/* 匹配不到路由跳转路由 */}
                    <Redirect to='/'></Redirect>
                </Switch>
            </ScrollTop>
        </Fragment>
    </BrowserRouter>
);

export default Routes;
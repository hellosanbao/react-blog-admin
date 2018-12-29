import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable'


//路由组件引入采用react-loadable进行拆分模块，避免打包后bundle.js过大
const ArtList = loadable(()=>import('@pages/artList'))
const Home = loadable(()=>import('@pages/home'))

const Routes = () => (
    <BrowserRouter>
        <Fragment>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/home" component={Home}/>
                <Route path="/artlist" component={ArtList}/>
                {/* 匹配不到路由显示组件 */}
                {/* <Route component={PageLoad}/> */}
                {/* 匹配不到路由跳转路由 */}
                <Redirect to='/'></Redirect>
            </Switch>
        </Fragment>
    </BrowserRouter>
);

export default Routes;
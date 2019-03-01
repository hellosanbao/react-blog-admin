/**
 * 推荐书单详情页面
 */
import React, { Component } from 'react'
import { wrapAnimation } from '@src/util/wrapAnimation'
import './index.scss'

import booklist from './data'

//components 
import BookList from '@src/components/BookList/'
class BlockDetail extends Component {
    constructor(props){
        super(props)
        document.title = '和你同口味的人都在看'
    }
    state={
        booklist:[
            {
                cover:'http://statics.zhuishushenqi.com/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F45780%2F_45780_829363.jpg%2F',
                title:'养鬼为祸',
                desc:'我从出生前就给人算计了，五阴俱全，天生招厉鬼，懂行的先生说我活不过七岁，死后是要给人养成血衣小鬼害人的。外婆为了救我，给我娶了童养媳，让我过起了安生日子，虽然后来我发现媳妇姐姐不是人……从小苟延馋喘的我能活到现在，本已习惯逆来顺受，可唯独外婆被人害死了这件事。为此，我不顾因果报应，继承了外婆养鬼的职业，发誓要把害死她的人全都送下地狱。',
                human:796,
                retain:'40.86%'
            },
            {
                cover:'http://statics.zhuishushenqi.com/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F45780%2F_45780_829363.jpg%2F',
                title:'养鬼为祸',
                desc:'我从出生前就给人算计了，五阴俱全，天生招厉鬼，懂行的先生说我活不过七岁，死后是要给人养成血衣小鬼害人的。外婆为了救我，给我娶了童养媳，让我过起了安生日子，虽然后来我发现媳妇姐姐不是人……从小苟延馋喘的我能活到现在，本已习惯逆来顺受，可唯独外婆被人害死了这件事。为此，我不顾因果报应，继承了外婆养鬼的职业，发誓要把害死她的人全都送下地狱。',
                human:796,
                retain:'40.86%'
            }
        ],
    }
    render() {
        return (
            <div className="BlockDetail" >
                <BookList booklist={booklist}/>
            </div>
        )
    }
}

export default wrapAnimation(BlockDetail)
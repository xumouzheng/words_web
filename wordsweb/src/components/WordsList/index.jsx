import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { List, Divider , Skeleton } from 'antd';

const wordslist = (props) => {
    const { dataSource, title } = props;
    const [showlist,setShowlist]=useState(false);
    const audio = document.createElement('audio');
    const list = [
        { "word": "he", "ch": "pron.他n.男,雄" },
        { "word": "with", "ch": "prep.有,以,用,同...,由于,和...一致,赞成,关于,就" },
        { "word": "on", "ch": "prep.在...之上,依附于,临近,靠近,向,在...时候,关于,涉及adv.在上,向前,行动中,作用中" },
        { "word": "do", "ch": "v.做,实行,尽力,给予,可用,制作,算出,解答" },
        { "word": "say", "ch": "v.说,讲,背诵,念,表示,比方说,假定n.话语,想说的意见,发言权" },
        { "word": "this", "ch": "adj.这,这个,今,本" },
        { "word": "they", "ch": "pron.他们,它们" },
        { "word": "at", "ch": "prep.在,于,向,对准,在...方面;Austria,奥地利" },
        { "word": "but", "ch": "prep.除...以外" },
        { "word": "we", "ch": "pron.我们" },
        { "word": "his", "ch": "pron.他的" },
        { "word": "from", "ch": "prep.从,今后,来自,由于" },
        { "word": "not", "ch": "adv.不" },
        { "word": "by", "ch": "prep.在附近,在旁边,经,由,依据,按照,通过,用adv.通过,经过,附近" },
        { "word": "she", "ch": "pron.[主格]她" },
        { "word": "or", "ch": "conj.或,或者,还是" }
    ]

    const show=()=>{
        setShowlist(!showlist)
    }

    //  type 0 美音 1英音
    const play=(type,audioUrl)=>{
        audio.src="http://dict.youdao.com/dictvoice?type="+type+"&audio="+audioUrl;
        audio.play();
    }
    return (
        <div>
            <h2 onClick={show} style={{"cursor":"pointer"}}>{title}</h2>
            <Divider />
            {showlist&&<List
                className="wordslist"
                itemLayout="horizontal"
                dataSource={dataSource}
                renderItem={(item,index) => (
                    <List.Item
                        actions={[<a key="unit" onClick={()=>{play(0,item.word)}}>American</a>, 
                        <a key="british" onClick={()=>{play(1,item.word)}}>British</a>,
                        <a key="list-loadmore-more">more</a>]}
                    >
                    <List.Item.Meta
                        title={(index+1)+"."+item.word}
                        description={item.ch}
                    />
                    </List.Item>
                )}
            />}
        </div>
    )
}
export default wordslist;
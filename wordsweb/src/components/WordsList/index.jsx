import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { List, Divider , Skeleton, message } from 'antd';
import WordTest from '@/components/WordTest'

const wordslist = (props) => {
    const { dataSource, title,order,onTest} = props;
    const [showlist,setShowlist]=useState(false);
    const [isShowModal,setShowModal]=useState(false);
    const audio = document.createElement('audio');

    const show=()=>{
        setShowlist(!showlist)
    }

    //  type 0 美音 1英音
    const play=(type,audioUrl)=>{
        audio.src="http://dict.youdao.com/dictvoice?type="+type+"&audio="+audioUrl;
        audio.play();
    }

    const callback=()=>{
        setShowModal(true)
    }
    const hideModal=()=>{
        setShowModal(false)
    }

    const youdao=(word)=>{
        var isMobile = /Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent)
        if (isMobile) {
            // 当前网页在手机端打开
            window.open("https://m.youdao.com/dict?q="+word+"&le=eng");
        } else {
            window.open("https://www.youdao.com/w/eng/"+word);
        }
      
    }

    const saveordeleteword=(index)=>{
        onTest(index);
    }

    return (
        <div>
            <h2 onClick={show} style={{"cursor":"pointer"}}>{title}</h2><h3><a onClick={callback}>进入练习</a></h3>

            <Divider />
            {showlist&&<List
                className="wordslist"
                itemLayout="horizontal"
                dataSource={dataSource}
                renderItem={(item,index) => (
                    <List.Item
                        key={index}
                        actions={[<a key="unit" onClick={()=>{play(0,item.word)}}>USA</a>, 
                        <a key="british" onClick={()=>{play(1,item.word)}}>UK</a>,
                        <a key="list-loadmore-more" onClick={()=>{youdao(item.word)}}>more</a>,
                        <a key="save" onClick={()=>{saveordeleteword(item.index)}}>{title==="单词本"?"delete":"save"}</a>]}
                        
                    >
                    <List.Item.Meta
                        key={index+"meta"}
                        title={(index+1)+"."+item.word}
                        description={item.ch}
                    />
                    </List.Item>
                )}
            />}
            {dataSource.length>5&&<WordTest
                key={order}
                isShowModal={isShowModal}
                callback={hideModal}
                dataSource={dataSource}
            />}
        </div>
    )
}
export default wordslist;
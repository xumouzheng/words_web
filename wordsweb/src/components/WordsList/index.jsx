import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { List, Divider , Skeleton } from 'antd';
import WordTest from '@/components/WordTest'

const wordslist = (props) => {
    const { dataSource, title,order,onTest } = props;
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
                        actions={[<a key="unit" onClick={()=>{play(0,item.word)}}>American</a>, 
                        <a key="british" onClick={()=>{play(1,item.word)}}>British</a>,
                        <a key="list-loadmore-more">more</a>]}
                    >
                    <List.Item.Meta
                        key={index+"meta"}
                        title={(index+1)+"."+item.word}
                        description={item.ch}
                    />
                    </List.Item>
                )}
            />}
            <WordTest
                key={order}
                isShowModal={isShowModal}
                callback={hideModal}
            />
        </div>
    )
}
export default wordslist;
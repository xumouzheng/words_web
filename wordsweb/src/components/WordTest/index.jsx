import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { List, Divider, Radio, Modal, Button } from 'antd';


const wordtest = (props) => {
    const { isShowModal, callback,dataSource} = props;
    const [nowIndex, setNowIndex] = useState(0);// 当前显示考题指针
    const [showWord, setShowWord] = useState("");// 显示当前要考的单词
    const [showReport, setShowReport] = useState(false);//  是否显示结果
    const [wrongNubmer, setWrongNumber] = useState(0);//  是否显示结果
    const [userAnswer,setUserAnswer]=useState([]);// 用户的答案
    const [wrongAnswer,setWrongAnswer]=useState([])

    const list2 = [
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
    const maxRadioNumber = 3;// 最大选项数量，从0开始计算，3表示有四个选项

    const handleOk = () => {
        callback(false);
    };

    // useEffect(() => {
    //     console.log("s1")
    //     createAnswer();
    //     setMyState({...myState,questionList:getQuestion()}) // userAnswer.push(e)
    //     //setMyState({...myState,questionList:getQuestion()})
    //     console.log("get", myState.questionList)
    // }, [])

    const list=useMemo(()=>{
        let q = Array.from({ length: dataSource.length },(_,index)=>index);
        let l=[]
        q=q.sort(() => Math.random() - 0.5);
        q.map((item)=>{
            l.push(dataSource[item])
        })
        return l;
    },[])

    const getRandomNumber = (q) => {
        let number;
        let i = true;
        while (i) {
            number = getRandomArbitrary(0, (list.length - 1))
            if (q.indexOf(number) !== -1) {
                i = true;
            } else {
                i = false;
            }
        }
        return number;
    }

    const getRandomArbitrary = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
    }

    // 获得结果
    const getReport = () => {
        // console.log("answerList", answerList)
        let temp = [];
        let wrong=[];
        for (var i = 0; i < answerList.length; i++) {
            if (answerList[i] !== userAnswer[i]) {
                temp.push(i);
            }
        }
        temp.map((item)=>{
            wrong.push(list[item].word+",")
        })
        setWrongAnswer(wrong)
        setWrongNumber(temp.length)
        setShowReport(true)
    }


    // 获取正确答案数组
    const answerList = useMemo(() => {
        let temp = [];
        for (let i = 0; i < list.length; i++) {
            temp.push(getRandomArbitrary(0, maxRadioNumber));
        }
        // console.log("answerList", temp)
        return temp
    }, [])

    //用于生成题目的数组
    const questionList = useMemo(() => {
        let result = [];
        for (let i = 0; i < list.length; i++) {
            let q = Array.from({ length: maxRadioNumber + 1 }, () => -1) //生成一个为全为-1的数组
            q[answerList[i]] = i
            for (let j = 0; j < maxRadioNumber + 1; j++) {
                if (j !== answerList[i]) {
                    q[j] = getRandomNumber(q)
                }
            }
            result[i] = q;
        }
        return result;
    }, [])

    // 显示当前单词
    const showQuestion=useMemo(()=>{
        let data = []
        if (nowIndex < list.length) {
            questionList[nowIndex].map((item) => {
                data.push(list[item].ch)
            })
            //setShowQuestion(data);
            setShowWord((nowIndex + 1) + "." + list[nowIndex].word)
        } else {
            getReport();
        }
        return data;
    },[nowIndex])


    const onChange = e => {
         //console.log('radio checked', e);
        let temp = userAnswer;
        temp.push(e)
        setUserAnswer(temp)
        setNowIndex(Number(nowIndex + 1));
    };

    const divStyle = {
        display: 'block',
        lineHeight: '30px',
        marginTop:'20px',
    };

    const aStyle = {
        color: 'black',
        backgroundColor: 'white',
        textAlign: 'inherit',
        borderWidth: '1px',
    };

    // 洗牌排序
    const shuffle = () => {
        list = list.sort(() => Math.random() - 0.5)
    }

    const angin = () => {
        setNowIndex(0);
        setShowReport(false)
        setUserAnswer([])
    }


    // 从min到max中随机取一个整数

    return (
        <Modal title="单词练习" visible={isShowModal} onCancel={handleOk} footer={null}>
            {!showReport && <>
                <h2>{showWord}</h2>
                {showQuestion.length > 0 && showQuestion.map((item, index) => {
                    return <div style={divStyle}><button style={aStyle} onClick={() => onChange(index)}>{item}</button></div>
                })}</>}
            {showReport && <div>
                <h1>错误数量为：{wrongNubmer}</h1>
                <h3>错误单词：{wrongAnswer}</h3>
                <Button onClick={angin}>Again</Button>
                </div>}
        </Modal>
    )
}
export default wordtest;
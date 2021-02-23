import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { List, Divider, Radio, Modal } from 'antd';
import { random } from 'lodash';




const wordtest = (props) => {
    const { isShowModal, callback } = props;
    const [showQuestion, setShowQuestion] = useState([]);
    const [value, setValue] = useState(-1);
    const [nowIndex, setNowIndex] = useState(0);// 当前显示考题指针
    const [showWord, setShowWord] = useState("");// 显示当前要考的单词
    const [showReport, setShowReport] = useState(false);//  是否显示结果
    const [wrongNubmer, setWrongNumber] = useState(0);//  是否显示结果
    const [params,setPramas]=useState({
         answerList : [],//存储正确答案的数组
         questionList : [],
         userAnswer : [],
         wrongAnswer:[],
    })
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
    const maxRadioNumber = 3;// 最大选项数量，从0开始计算，3表示有四个选项

    const handleOk = () => {
        callback(false);
    };

    useEffect(() => {
        console.log("s1")
        createAnswer();
        setPramas(prevState=>({...prevState,questionList:getQuestion()})) // userAnswer.push(e)
        //setPramas({...params,questionList:getQuestion()})
        console.log("get", params.questionList)
    }, [])


    // 显示当前单词
    useEffect(() => {
        let data = []
        if (nowIndex < list.length) {
            params.questionList[nowIndex].map((item) => {
                data.push(list[item].ch)
            })
            console.log(params.questionList)
            setShowQuestion(data);
            setShowWord((nowIndex + 1) + "." + list[nowIndex].word)
        }else{
            getReport();
        }
    }, [nowIndex])


    const onChange = e => {
        console.log('radio checked', e);
        setPramas(prevState=>({...prevState,userAnswer:[...prevState.userAnswer,e]})) // userAnswer.push(e)
        //userAnswer.push(e)
        //setValue(e.target.value);
        setNowIndex(Number(nowIndex + 1));

    };
    const divStyle = {
        display: 'block',
        lineHeight: '30px',
    };

    const aStyle = {
        color: 'black',
    };

    // 洗牌排序
    const shuffle = () => {
        list = list.sort(() => Math.random() - 0.5)
    }

    const getReport=()=>{
        console.log("answerList",params.answerList)
        for(var i=0;i<params.answerList.length;i++){
            if(params.answerList[i]!==params.userAnswer[i]){
                setPramas(prevState=>({...prevState,wrongAnswer:[...prevState.wrongAnswer,i]})) // userAnswer.push(e)
                //wrongAnswer.push(i)
            }
        }
        console.log("wrongAnswer",params.wrongAnswer)
        setWrongNumber(params.wrongAnswer.length)
        setShowReport(true)

    }

    // 获取正确答案数组
    const createAnswer = () => {
        for (let i = 0; i < list.length; i++) {
            setPramas(prevState=> ({...prevState,answerList:[...prevState.answerList,getRandomArbitrary(0, maxRadioNumber)]}))// userAnswer.push(e)
            //answerList.push(getRandomArbitrary(0, maxRadioNumber))
        }
        console.log("answerList",params.answerList, showQuestion)
    }
    //用于生成题目的数组
    const getQuestion = () => {
        let result = [];
        for (let i = 0; i < list.length; i++) {
            let q = Array.from({ length: maxRadioNumber + 1 }, () => -1) //生成一个为全为-1的数组
            q[params.answerList[i]] = i
            for (let j = 0; j < maxRadioNumber + 1; j++) {
                if (j !== params.answerList[i]) {
                    q[j] = getRandomNumber(q)
                }
            }
            result[i] = q;
        }
        return result;
    }

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

    // 从min到max中随机取一个整数
    const getRandomArbitrary = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
    }
    return (
        <Modal title="单词练习" visible={isShowModal} onCancel={handleOk} footer={null}>
            {!showReport&&<>
            <h2>{showWord}</h2>
            {showQuestion.length > 0 && showQuestion.map((item, index) => {
                return <div style={divStyle}><a style={aStyle} onClick={() => onChange(index)}>{item}</a></div>
            })}</>}
            {showReport&&<h1>错误数量为{wrongNubmer}</h1>}
            {/* <Radio.Group onChange={onChange} value={value}>
            {showQuestion.length>0&&showQuestion.map((item,index)=>{
                return <Radio style={radioStyle} key={index} value={index}>{item}</Radio>
            })}
        </Radio.Group> */}
        </Modal>
    )
}
export default wordtest;
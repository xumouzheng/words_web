import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { connect } from 'umi';
import WordsList from '@/components/WordsList';
import { message } from 'antd';

const Task = (props) => {
    const { taskdata, loading } = props;
    const { data, status } = taskdata;

    useEffect(() => {
        const { dispatch } = props;
        dispatch({
            type: 'task/getTasks',
            payload: {}
        })
    }, [])

    // 保存单词
    const onTest = (index) => {
        const { dispatch } = props;
        dispatch({
            type: 'task/saveWord',
            payload: {'wordindex':index}
        }).then(()=>{
            message.success("单词保存成功！！")
        })
    }

    return (
        <PageContainer>
            <div
                style={{
                    backgroundColor: "white",
                    padding: "20px",
                }}>
                {
                    data && data.data0.length > 0 &&
                    <WordsList
                        key={0}
                        title="新单词"
                        order={0}
                        onTest={onTest}
                        dataSource={data.data0}
                    />
                }
                {
                    data && data.data1.length > 0 &&
                    <WordsList
                        key={1}
                        title="昨天单词复习"
                        order={1}
                        onTest={onTest}
                        dataSource={data.data1}
                    />
                }
                {
                    data && data.data2.length > 0 &&
                    <WordsList
                        key={2}
                        title="前天单词复习"
                        order={2}
                        onTest={onTest}
                        dataSource={data.data2}
                    />
                }
                {
                    data && data.data3.length > 0 &&
                    <WordsList
                        key={3}
                        title="四天前单词复习"
                        order={3}
                        onTest={onTest}
                        dataSource={data.data3}
                    />
                }
                {
                    data && data.data4.length > 0 &&
                    <WordsList
                        key={4}
                        order={4}
                        title="一周前单词复习"
                        onTest={onTest}
                        dataSource={data.data4}
                    />
                }
                {
                    data && data.data5.length > 0 &&
                    <WordsList
                        key={5}
                        order={5}
                        title="半月前单词复习"
                        onTest={onTest}
                        dataSource={data.data5}
                    />
                }
            </div>
        </PageContainer>

    )
}

export default connect(({ task, loading }) => ({
    taskdata: task,
    loading: loading.effects['task/getTasks'],
}))(Task);

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { connect } from 'umi';
import WordsList from '@/components/WordsList';

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
                        title="新单词"
                        dataSource={data.data0}
                    />
                }
                {
                    data && data.data1.length > 0 &&
                    <WordsList
                        title="昨天单词复习"
                        dataSource={data.data1}
                    />
                }
                {
                    data && data.data2.length > 0 &&
                    <WordsList
                        title="前天单词复习"
                        dataSource={data.data2}
                    />
                }
                {
                    data && data.data3.length > 0 &&
                    <WordsList
                        title="四天前单词复习"
                        dataSource={data.data3}
                    />
                }
                {
                    data && data.data4.length > 0 &&
                    <WordsList
                        title="一周前单词复习"
                        dataSource={data.data4}
                    />
                }
                {
                    data && data.data5.length > 0 &&
                    <WordsList
                        title="半月前单词复习"
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

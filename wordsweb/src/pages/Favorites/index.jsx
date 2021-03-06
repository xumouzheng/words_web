import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { connect } from 'umi';
import { message } from 'antd';
import WordsList from '@/components/WordsList';

const Favorites = (props) => {
    const { taskdata, loading } = props;
    const { favourites, status } = taskdata;

    useEffect(() => {
        const { dispatch } = props;
        dispatch({
            type: 'task/getSaveword',
            payload: {}
        })
    }, [])

    // 删除单词
    const onTest = (index) => {
        const { dispatch } = props;
        dispatch({
            type: 'task/deleteWord',
            payload: {'wordindex':index}
        }).then(()=>{
            message.success("单词删除成功！！")
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
                    favourites&&
                    <WordsList
                        key={0}
                        title="单词本"
                        order={0}
                        onTest={onTest}
                        dataSource={favourites}
                    />
                }
            </div>
        </PageContainer>

    )
}

export default connect(({ task, loading }) => ({
    taskdata: task,
    loading: loading.effects['task/getSaveword'],
}))(Favorites);

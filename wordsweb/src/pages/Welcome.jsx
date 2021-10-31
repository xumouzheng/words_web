import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography, Progress,List } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import { connect } from 'umi';
import styles from './Welcome.less';


const welcome = (props) => {
  const { status, info } = props.data;
  useEffect(() => {
    const { dispatch } = props;
    dispatch({
      type: 'user/getStatus',
      payload: {}
    })
    dispatch({
      type: 'user/getInfo',
      payload: {}
    })
  }, [])

  const common=[{

  }]
  return (
    <PageContainer>
      <Card>
        <Alert
          message={"当前学习状态"}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <Progress type="circle" percent={(Number(status / 7507) * 100).toFixed(0)} />
        <br />
        <br />
        <Typography.Text strong>
          已完成单词数量：{status}个,单词总数：7507个，今天继续加油！
        </Typography.Text>
      </Card>
      <Card>
      <List
      header={<div>近7天电影</div>}
      bordered
      dataSource={info}
      renderItem={item => (
        <List.Item>
           <a href={item[2]} target="_blank">{item[0]+",豆瓣:"+item[1]}</a>
        </List.Item>
      )}
    />
      </Card>
    </PageContainer>
  );
};

export default connect(({ user }) => ({
  data: user,
}))(welcome);
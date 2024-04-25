import { Space, Typography } from 'antd'

export const MarathonComponent: React.FC = () => (
  <Space
    direction='vertical'
    align='center'
    size={48}
    style={{ justifyContent: 'center', height: '100%' }}>
    <Typography.Title
      level={3}
      style={{ textAlign: 'center', color: 'var(--ant-primary-9)' }}>
      В данный период<br />ни&nbsp;один марафон не проводится
    </Typography.Title>
    <Typography.Text type='secondary' style={{ textAlign: 'center', display: 'inline-block' }}>Заглядывайте сюда почаще<br />и&nbsp;ваш первый марафон скоро начнётся.</Typography.Text>
  </Space>
)
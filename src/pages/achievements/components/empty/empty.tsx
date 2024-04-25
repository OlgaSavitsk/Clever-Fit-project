import { Grid, Image, Space, Typography } from 'antd'

export const EmptyTrainingComponent: React.FC = () => {
  const { xs } = Grid.useBreakpoint();

  return (
    <Space
      direction='vertical'
      align='center'
      style={{ paddingTop: xs ? 0 : 'calc(28 * var(--padding-space))' }}>
      <Image
        width={200}
        preview={false}
        src="../empty-training.svg" />
      <Typography.Title
        level={3}
        style={{ textAlign: 'center' }}>
        Ой, такой тренировки на&nbsp;этой неделе не&nbsp;было.
      </Typography.Title>
    </Space>
  )
}
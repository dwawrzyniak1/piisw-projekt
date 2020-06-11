import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

type Props = { size?: number };
const FullscreenSpinner = ({ size }: Props) => {
  const spinnerSize = size || 128;
  return (
    <Spin
      indicator={
        <LoadingOutlined
          style={{
            fontSize: spinnerSize,
            position: 'absolute',
            left: '50%',
            marginLeft: -(spinnerSize / 2),
            bottom: '50%',
            marginBottom: -(spinnerSize / 4), // Exact center is not good because of bar at the top
          }}
          spin
        />
      }
    />
  );
};

export default FullscreenSpinner;

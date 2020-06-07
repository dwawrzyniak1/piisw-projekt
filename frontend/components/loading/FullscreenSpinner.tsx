import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

type Props = { size?: number };
const FullscreenSpinner = ({ size }: Props) => {
  const SPINNER_SIZE = size | 128;

  return (
    <Spin
      indicator={
        <LoadingOutlined
          style={{
            fontSize: SPINNER_SIZE,
            position: 'absolute',
            left: '50%',
            marginLeft: -(SPINNER_SIZE / 2),
            bottom: '50%',
            marginBottom: -(SPINNER_SIZE / 4), // Exact center is not good because of bar at the top
          }}
          spin
        />
      }
    />
  );
};

export default FullscreenSpinner;

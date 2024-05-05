import { Backdrop, Box, CircularProgress } from '@mui/material';
import { COLOR_CODE } from '@components';
const LoadingContainer: React.FC<Props> = () => (
  <>
    <Backdrop sx={{ color: COLOR_CODE.WHITE, zIndex: 9999 }} open onClick={() => {}}>
      <CircularProgress color="inherit" />
    </Backdrop>
    <Box sx={{ minHeight: '50vh' }} />
  </>
);

type Props = {
  hideBackdropPageContent?: boolean;
};

export default LoadingContainer;

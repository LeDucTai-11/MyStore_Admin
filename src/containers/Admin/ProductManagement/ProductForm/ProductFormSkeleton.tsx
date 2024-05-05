import { COLOR_CODE } from '@components';
import { Box, Button, Skeleton, Stack } from '@mui/material';

const InputSkeleton = () => (
  <>
    <Skeleton variant="text" width={75} />
    <Skeleton height={56} />
  </>
);

type Props = {
  readonly?: boolean;
};

const ProductFormSkeleton: React.FC<Props> = ({ readonly }) => (
  <Stack margin="0 -24px -24px">
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxHeight: 550,
        overflow: 'hidden',
        overflowY: 'scroll',
      }}
    >
      <Stack direction="row" justifyContent="space-evenly" padding="8px 24px" gap={2}>
        <Stack
          padding="24px"
          gap={1}
          sx={{
            border: `1px solid ${COLOR_CODE.GREY_300} `,
            borderRadius: 2,
            width: '100%',
          }}
        >
          <InputSkeleton />
          <InputSkeleton />
          <InputSkeleton />
          <InputSkeleton />
        </Stack>
        <Stack
          padding="24px"
          sx={{
            border: `1px solid ${COLOR_CODE.GREY_300} `,
            borderRadius: 2,
            width: '100%',
          }}
          gap={1}
        >
          <Skeleton variant="rectangular" sx={{ height: '100%' }} />
        </Stack>
      </Stack>
    </Box>
    {!readonly && (
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          mt: 1,
          padding: '16px 24px 24px 24px',
          gap: 2,
          borderRadius: '0 0 16px 16px',
        }}
      >
        <Button variant="outlined" className="mr-16" disabled>
          Cancel
        </Button>
        <Button disabled>Save</Button>
      </Stack>
    )}
  </Stack>
);

export default ProductFormSkeleton;

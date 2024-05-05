import {
  Button,
  Chip,
  Container,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { LuAlignCenter } from 'react-icons/lu';
import { DialogContext, DialogType, Input } from '@components';
import { Toastify } from '@shared';
import { useContext } from 'react';
import { Select } from '@components';

const Dev: React.FC<Props> = () => {
  const { openModal, closeModal, setDialogContent } = useContext(DialogContext);

  const handleOpenDialog = () => {
    setDialogContent({
      type: DialogType.CONTENT_DIALOG,
      title: 'Content Dialog',
      data: <Typography>This is content dialog</Typography>,
      maxWidth: 'md',
    });

    openModal();
  };

  const handleOpenYesNoDialog = () => {
    setDialogContent({
      type: DialogType.YESNO_DIALOG,
      title: 'Yes/No Dialog',
      data: <Typography>This is content dialog</Typography>,
      okText: 'Save',
      cancelText: 'Cancel',
      onOk: closeModal,
      onCancel: closeModal,
      maxWidth: 'md',
    });

    openModal();
  };

  const pblMembersOption = [
    {
      label: 'Hoai Anh',
      value: '1',
    },
    {
      label: 'Nhat Minh',
      value: '2',
    },
    {
      label: 'Ngoc Linh',
      value: '3',
    },
  ];

  return (
    <Container>
      <Stack gap={1} justifyContent={'center'} alignItems={'center'}>
        <Typography variant="h3">Dev site</Typography>

        <Stack className="mb-32">
          <h2>Toast</h2>
          <Stack gap={10} alignItems={'center'} flexDirection={'row'}>
            <Button onClick={() => Toastify.success('Test Toast Success')}>Toast Success</Button>
            <Button onClick={() => Toastify.error('Test Toast Error')}>Toast Error</Button>
            <Button onClick={() => Toastify.info('Test Toast Info')}>Toast Info</Button>
            <Button onClick={() => Toastify.warning('Test Toast Warning')}>Toast Warning</Button>
          </Stack>
        </Stack>

        <Stack className="mb-32">
          <h2>Button Info</h2>
          <Stack gap={10} alignItems={'center'} flexDirection={'row'}>
            <Button>Normal Button</Button>
            <Button variant="outlined">Outline Button</Button>
            <Button variant="contained">Contained Button</Button>
            <Tooltip title="test tooltip">
              <Button>Button with tooltip</Button>
            </Tooltip>
          </Stack>
        </Stack>

        <Stack className="mb-32">
          <h2>Button Icon</h2>
          <Stack gap={10} alignItems={'center'} flexDirection={'row'}>
            <Button startIcon={<LuAlignCenter />} variant="contained">
              Icon Left
            </Button>
            <Button variant="outlined" endIcon={<LuAlignCenter />}>
              Icon Right
            </Button>
            <Tooltip title="Filter">
              <IconButton color="info">
                <LuAlignCenter />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        <Stack className="mb-32">
          <h2>Button Color</h2>
          <Stack gap={10} alignItems={'center'} flexDirection={'row'}>
            <Button variant="contained" color="secondary">
              Secondary
            </Button>
            <Button color="inherit" variant="outlined">
              Back
            </Button>
            <Button color="error" variant="outlined">
              Back
            </Button>
            <Button color="success" variant="contained">
              Success
            </Button>
            <Button color="warning" variant="contained">
              Warning
            </Button>
            <Button color="error" variant="contained">
              Error
            </Button>
          </Stack>
        </Stack>

        <Stack className="mb-32">
          <h2>chip</h2>
          <Stack gap={10} alignItems={'center'} flexDirection={'row'}>
            <Chip label="Default" />
            <Chip label="Info" color="info" />
            <Chip label="Admin" color="success" />
            <Chip label="Warning" color="warning" />
            <Chip label="Primary" color="primary" />
            <Chip label="Secondary" color="secondary" />
            <Chip label="Error" color="error" />
          </Stack>
        </Stack>

        <Stack className="mb-32">
          <h2>Input</h2>
          <Stack gap={10} alignItems={'center'} flexDirection={'row'}>
            <Input />
            <Select
              onChange={() => {}}
              value={'1'}
              placeholder="Pick one"
              options={pblMembersOption}
            />
            <RadioGroup>
              <Radio checked={false} />
              <Radio checked={true} />
            </RadioGroup>
          </Stack>
        </Stack>

        <Stack className="mb-32" gap={12} flexDirection={'row'}>
          <Button variant="contained" onClick={handleOpenDialog}>
            Content dialog
          </Button>

          <Button variant="outlined" onClick={handleOpenYesNoDialog}>
            Yes/No dialog
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

type Props = {};
export default Dev;

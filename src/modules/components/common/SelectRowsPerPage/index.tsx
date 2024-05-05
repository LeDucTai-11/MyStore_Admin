/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from 'react';
import { MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import appConfig from 'src/appConfig';
import { getRandomId } from 'src/modules/shared';
import { COLOR_CODE } from '../../configs';

const SelectRowsPerPage = ({
  options = [],
  value = appConfig.ROWS_PER_PAGE,
  onChange = (..._args: any[]) => {},
}) => {
  const id = useRef(`select-rows-per-page-${getRandomId()}`);

  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as string);
  };

  const formattedOptions = options.map((o: any) => ({ label: o, value: o }));

  const selectedOption =
    formattedOptions?.find((option: { value: any }) => option.value === value) || null;

  return (
    <Select
      id={id.current}
      value={selectedOption.value}
      onChange={handleChange}
      sx={{
        '&.Mui-focused': {
          fieldset: {
            borderWidth: '1px !important',
            borderColor: `${COLOR_CODE.PRIMARY} !important`,
          },
        },
        fieldset: {
          border: 'none',
        },
        marginX: 1,
        paddingTop: '0px',
        borderRadius: 1,
        height: '36px',
      }}
      size="small"
      MenuProps={{
        PaperProps: {
          style: { backgroundColor: 'white' },
        },
      }}
    >
      {formattedOptions.map((option) => (
        <MenuItem value={option.value} key={`select-row-per-page-${option.value}`}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectRowsPerPage;

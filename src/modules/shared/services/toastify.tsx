/* eslint-disable no-console */
import { AiFillWarning } from 'react-icons/ai';
import { IoCheckmarkCircleSharp, IoInformationCircleOutline } from 'react-icons/io5';
import { MdOutlineErrorOutline } from 'react-icons/md';
import { ToastOptions, toast } from 'react-toastify';
import { COLOR_CODE } from 'src/modules/components';

const error = (
  error?: string,
  options: ToastOptions = {
    icon: <MdOutlineErrorOutline color={COLOR_CODE.DANGER} fontSize={24} />,
  },
) => {
  console.log('errorHandler', error);
  toast.error(error || 'An error has occurred. Please check your data and try again.', options);
};

const success = (
  message: string,
  options: ToastOptions = {
    icon: <IoCheckmarkCircleSharp color={COLOR_CODE.PRIMARY} fontSize={24} />,
  },
) => {
  toast.success(message, options);
};

const warning = (
  message: string,
  options: ToastOptions = {
    icon: <AiFillWarning color={COLOR_CODE.WARNING} fontSize={24} />,
  },
) => {
  console.log('warningHandler', message);
  toast.warning(message, options);
};
const info = (
  message: string,
  options: ToastOptions = {
    icon: <IoInformationCircleOutline color={COLOR_CODE.INFO} fontSize={24} />,
  },
) => {
  toast.info(message, { ...options });
};

export default {
  error,
  success,
  warning,
  info,
};

import dayjs from 'dayjs';

export const formatDate = (dateString: string) => {
  return dayjs(dateString).format('DD MMMM YYYY, HH:mm A');
};

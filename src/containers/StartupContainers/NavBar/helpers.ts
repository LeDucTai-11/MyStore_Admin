export const getShortName = ({ firstName = '', lastName = '' }) => {
  return `${firstName[0]}${lastName[0]}`;
};

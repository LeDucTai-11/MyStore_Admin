import { Chip } from '@mui/material';
import { OrderStatus, OrderStatusId } from '@queries';
import { getCapitalize, isEmpty } from '@shared';

export const customOrderStatusRender = (orderStatusId: number) => {
  if (isEmpty(orderStatusId)) return '--';
  switch (orderStatusId) {
    case OrderStatusId.PENDING_CONFIRM:
      return (
        <Chip label={getCapitalize(OrderStatus[OrderStatusId.PENDING_CONFIRM])} color="warning" />
      );
    case OrderStatusId.CONFIRMED:
      return <Chip label={getCapitalize(OrderStatus[OrderStatusId.CONFIRMED])} color="success" />;
    case OrderStatusId.COMPLETED:
      return <Chip label={getCapitalize(OrderStatus[OrderStatusId.COMPLETED])} color="primary" />;
    case OrderStatusId.PENDING_PAYMENT:
      return (
        <Chip label={getCapitalize(OrderStatus[OrderStatusId.PENDING_PAYMENT])} color="secondary" />
      );
    case OrderStatusId.PAYMENT_CONFIRMED:
      return (
        <Chip label={getCapitalize(OrderStatus[OrderStatusId.PAYMENT_CONFIRMED])} color="info" />
      );
    case OrderStatusId.CANCELED:
      return <Chip label={getCapitalize(OrderStatus[OrderStatusId.CANCELED])} color="error" />;
      case OrderStatusId.DELIVERING:
        return <Chip label={getCapitalize(OrderStatus[OrderStatusId.DELIVERING])} color="warning" />;
    default:
      return '--';
  }
};

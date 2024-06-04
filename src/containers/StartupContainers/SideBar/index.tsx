import { UserRole } from '@components';
import { Stack } from '@mui/material';
import { IRootState } from '@redux/store';
import cn from 'classnames';
import React, { useEffect } from 'react';
import { BsChevronLeft, BsClipboard2Plus, BsClipboard2PlusFill, BsDot } from 'react-icons/bs';
import { FaEject } from 'react-icons/fa';
import {
  IoBag,
  IoBagOutline,
  IoCart,
  IoCartOutline,
  IoGrid,
  IoGridOutline,
  IoHome,
  IoHomeOutline,
  IoPeople,
  IoPeopleOutline,
  IoPerson,
  IoPersonOutline,
  IoPhoneLandscape,
  IoPhoneLandscapeOutline,
  IoReader,
  IoReaderOutline,
  IoStorefront,
  IoStorefrontOutline,
  IoTicketOutline,
  IoTicketSharp,
} from 'react-icons/io5';
import { Menu, MenuItem, Sidebar, SubMenu, useProSidebar } from 'react-pro-sidebar';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { PATHS } from 'src/appConfig/paths';
import { COLOR_CODE } from 'src/modules/components/configs/theme';
import './styles.scss';

type MenuItemType = {
  label: string;
  path?: string;
  activePath: string[] | string;
  icon?: React.ReactNode;
  activeIcon?: React.ReactNode;
  subItems?: MenuItemType[];
  accessRoles?: UserRole[];
};

const MenuItems: MenuItemType[] = [
  {
    label: 'Dashboard',
    path: PATHS.dashboard,
    activePath: PATHS.dashboard,
    icon: (
      <div className="title-icon" aria-details="Dashboard">
        <IoHomeOutline size={20} />
      </div>
    ),
    activeIcon: (
      <div className="title-icon" aria-details="Dashboard">
        <IoHome size={20} />
      </div>
    ),
    accessRoles: [UserRole.ADMIN],
  },
  {
    label: 'Product',
    path: PATHS.product,
    activePath: PATHS.product,
    icon: (
      <div className="title-icon" aria-details="Product">
        <IoBagOutline size={20} />
      </div>
    ),
    activeIcon: (
      <div className="title-icon" aria-details="Product">
        <IoBag size={20} />
      </div>
    ),
    accessRoles: [UserRole.ADMIN, UserRole.STAFF],
  },
  {
    label: 'Category',
    path: PATHS.category,
    activePath: PATHS.category,
    icon: (
      <div className="title-icon" aria-details="Category">
        <IoGridOutline size={20} />
      </div>
    ),
    activeIcon: (
      <div className="title-icon" aria-details="Category">
        <IoGrid size={20} />
      </div>
    ),
    accessRoles: [UserRole.ADMIN, UserRole.STAFF],
  },
  {
    label: 'Invoice',
    path: PATHS.invoice,
    activePath: PATHS.invoice,
    icon: (
      <div className="title-icon" aria-details="Invoice">
        <IoReaderOutline size={20} />
      </div>
    ),
    activeIcon: (
      <div className="title-icon" aria-details="Invoice">
        <IoReader size={20} />
      </div>
    ),
    accessRoles: [UserRole.ADMIN, UserRole.STAFF],
  },
  {
    label: 'Import Order',
    path: PATHS.importOrder,
    activePath: PATHS.importOrder,
    icon: (
      <div className="title-icon" aria-details="Import Order">
        <BsClipboard2Plus size={20} />
      </div>
    ),
    activeIcon: (
      <div className="title-icon" aria-details="Import Order">
        <BsClipboard2PlusFill size={20} />
      </div>
    ),
    accessRoles: [UserRole.ADMIN],
  },
  {
    label: 'Order',
    path: PATHS.order,
    activePath: PATHS.order,
    icon: (
      <div className="title-icon" aria-details="Order">
        <IoCartOutline size={20} />
      </div>
    ),
    activeIcon: (
      <div className="title-icon" aria-details="Order">
        <IoCart size={20} />
      </div>
    ),
    subItems: [
      {
        label: 'Order List',
        path: PATHS.order,
        activePath: PATHS.order,
      },
      {
        label: 'Order Request',
        path: PATHS.orderRequest,
        activePath: PATHS.orderRequest,
      },
    ],
    accessRoles: [UserRole.ADMIN],
  },
  {
    label: 'Store',
    path: PATHS.store,
    activePath: PATHS.store,
    icon: (
      <div className="title-icon" aria-details="Store">
        <IoStorefrontOutline size={20} />
      </div>
    ),
    activeIcon: (
      <div className="title-icon" aria-details="Store">
        <IoStorefront size={20} />
      </div>
    ),
    accessRoles: [UserRole.ADMIN, UserRole.STAFF],
  },
  {
    label: 'Customer',
    path: PATHS.customer,
    activePath: PATHS.customer,
    icon: (
      <div className="title-icon" aria-details="Customer">
        <IoPeopleOutline size={20} />
      </div>
    ),
    activeIcon: (
      <div className="title-icon" aria-details="Customer">
        <IoPeople size={20} />
      </div>
    ),
    accessRoles: [UserRole.ADMIN, UserRole.STAFF],
  },
  // {
  //   label: 'Staff',
  //   path: PATHS.staff,
  //   activePath: PATHS.staff,
  //   icon: (
  //     <div className="title-icon" aria-details="Staff">
  //       <IoPersonOutline size={20} />
  //     </div>
  //   ),
  //   activeIcon: (
  //     <div className="title-icon" aria-details="Staff">
  //       <IoPerson size={20} />
  //     </div>
  //   ),
  //   accessRoles: [UserRole.ADMIN],
  // },
  {
    label: 'Shipper',
    path: PATHS.shipper,
    activePath: PATHS.shipper,
    icon: (
      <div className="title-icon" aria-details="Shipper">
        <IoPersonOutline size={20} />
      </div>
    ),
    activeIcon: (
      <div className="title-icon" aria-details="Shipper">
        <IoPerson size={20} />
      </div>
    ),
    accessRoles: [UserRole.ADMIN],
  },
  {
    label: 'Voucher',
    path: PATHS.voucher,
    activePath: PATHS.voucher,
    icon: (
      <div className="title-icon" aria-details="Voucher">
        <IoTicketOutline size={20} />
      </div>
    ),
    activeIcon: (
      <div className="title-icon" aria-details="Voucher">
        <IoTicketSharp size={20} />
      </div>
    ),
    accessRoles: [UserRole.ADMIN, UserRole.STAFF],
  },
];

const DevItem: MenuItemType = {
  label: 'Dev Container',
  path: PATHS.dev,
  activePath: PATHS.dev,
  icon: (
    <div className="title-icon" aria-details="Dev Container">
      <FaEject size={20} />
    </div>
  ),
  activeIcon: (
    <div className="title-icon" aria-details="Dev Container">
      <FaEject size={20} />
    </div>
  ),
  accessRoles: [UserRole.ADMIN, UserRole.STAFF],
};

const CustomSidebar: React.FC<Props> = () => {
  const currentRole = useSelector((state: IRootState) => state.auth.currentRole);

  const location = useLocation();

  const { collapseSidebar, collapsed, toggleSidebar, broken, toggled } = useProSidebar();

  useEffect(() => {
    if (broken) {
      if (collapsed) {
        toggleSidebar(false);
        collapseSidebar(false);
      }
    } else {
      if (toggled) {
        collapseSidebar(false);
      } else {
        toggleSidebar(true);
        collapseSidebar(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [broken]);

  const handleToggleSidebar = () => (broken ? toggleSidebar() : collapseSidebar());

  return (
    <Sidebar className={cn('cmp-sidebar')} breakPoint="md">
      <Stack
        className="cmp-sidebar__toggle-icon"
        alignItems="center"
        justifyContent="center"
        onClick={handleToggleSidebar}
        color={COLOR_CODE.GREY_600}
      >
        <BsChevronLeft size={14} />
      </Stack>
      <Stack flexGrow={1} sx={{ height: '100%' }} justifyContent="space-between">
        <Menu>
          {[...MenuItems]
            .filter((item) => item?.accessRoles.includes(currentRole))
            .map((item) => {
              const isActive = Array.isArray(item.activePath)
                ? item.activePath.some((path) => location.pathname.includes(path))
                : location.pathname.includes(item.activePath);
              if (!item.subItems) {
                return (
                  <MenuItem
                    active={isActive}
                    icon={isActive ? item.activeIcon : item.icon}
                    component={<Link to={item.path} />}
                    key={item.path}
                  >
                    {item.label}
                  </MenuItem>
                );
              }
              return (
                <SubMenu
                  label={item.label}
                  icon={isActive ? item.activeIcon : item.icon}
                  key={`sub-menu-${item.label}`}
                  defaultOpen
                >
                  {item.subItems.map((subItem) => (
                    <MenuItem
                      active={location.pathname === subItem.path}
                      icon={<BsDot size={24} />}
                      component={<Link to={subItem.path} />}
                      key={subItem.path}
                    >
                      {subItem.label}
                    </MenuItem>
                  ))}
                </SubMenu>
              );
            })}
        </Menu>
      </Stack>
    </Sidebar>
  );
};

type Props = {};

export default CustomSidebar;

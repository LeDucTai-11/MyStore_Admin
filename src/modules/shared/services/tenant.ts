import appConfig from '@appConfig';
import Cookies from 'js-cookie';

export enum Tenant {
  STAFF = 'staff',
  CUSTOMER = 'customer',
}

const COOKIE_KEY_TENANT = 'tenant';

const DEFAULT_TENANT = Tenant.STAFF;

const setTenant = (tenant: Tenant = DEFAULT_TENANT) =>
  Cookies.set(COOKIE_KEY_TENANT, tenant, {
    domain: appConfig.COOKIE_DOMAIN,
    expires: 30,
  });

const getTenant = () => Cookies.get(COOKIE_KEY_TENANT);

const clearTenant = () =>
  Cookies.remove(COOKIE_KEY_TENANT, {
    domain: appConfig.COOKIE_DOMAIN,
    expires: 30,
  });

const isStaff = appConfig.COOKIE_DOMAIN.includes(Tenant.STAFF);
const isCustomer = appConfig.COOKIE_DOMAIN.includes(Tenant.CUSTOMER);

export { setTenant, getTenant, clearTenant, isStaff, isCustomer };

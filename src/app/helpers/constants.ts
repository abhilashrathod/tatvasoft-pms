export const ROLES = {
  USER: 'user',
  ADMIN: 'admin'
};
export const MENU_ITEMS = [
  {title: 'Dashboard', route: ['/', 'admin', 'dashboard'], roles: [ROLES.USER], },
  {title: 'Products', route: ['/', 'admin', 'products'], roles: [ROLES.ADMIN, ROLES.USER], },
  {title: 'Contact', route: ['/', 'admin', 'contact'], roles: [ROLES.ADMIN], },
];

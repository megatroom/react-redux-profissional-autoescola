import React from 'react';

import { AppBar, NavigationDrawer } from '../../components';

import './page-layout.scss';

const PageLayout = ({
  children,
  menu,
  isMenuOpen,
  isLoading,
  saveHasError,
  onSaveRetry,
  onOpenMenu,
  onCloseMenu
}) => (
  <div>
    <AppBar
      isLoading={isLoading}
      saveHasError={saveHasError}
      onSaveRetry={onSaveRetry}
      onOpenMenu={onOpenMenu}
    />
    <div className='container'>{children}</div>
    <NavigationDrawer menu={menu} isOpen={isMenuOpen} onCloseMenu={onCloseMenu} />
  </div>
);

export default PageLayout;

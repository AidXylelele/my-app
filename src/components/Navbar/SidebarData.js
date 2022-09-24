import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as VscIcons from 'react-icons/vsc';
import * as CgIcons from 'react-icons/cg';

export const SidebarData = [
  {
    title: 'Profile',
    path: '/profile/25601',
    icon: <CgIcons.CgProfile style={{ color: 'black' }} />,
    cName: 'nav_text',
  },
  {
    title: 'Messages',
    path: '/dialogs',
    icon: <VscIcons.VscCommentDiscussion style={{ color: 'black' }} />,
    cName: 'nav_text',
  },
  {
    title: 'Users',
    path: '/users',
    icon: <FaIcons.FaUserFriends style={{ color: 'black' }} />,
    cName: 'nav_text',
  },
];

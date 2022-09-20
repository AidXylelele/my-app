import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as CgIcons from 'react-icons/cg'

export const SidebarData = [
  {
    title: 'Profile',
    path: '/profile',
    icon: <CgIcons.CgProfile />,
    cName: 'nav_text',
  },
  {
    title: 'Messages',
    path: '/dialogs',
    icon: <AiIcons.AiOutlineMessage />,
    cName: 'nav_text',
  },
  {
    title: 'Users',
    path: '/users',
    icon: <FaIcons.FaUserFriends />,
    cName: 'nav_text',
  },
];
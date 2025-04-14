import React, { useEffect, useState } from 'react';
import { useEuiTheme } from '@elastic/eui';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import BoomImage from '../assets/animation.gif'; // Import Boom image
import { useAppSelector } from '../app/hooks';
import { useDispatch } from 'react-redux';
import {
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeader,
  EuiText,
  EuiTextColor,
} from '@elastic/eui';
import { firebaseAuth } from '../utils/FirebaseConfig';
import { signOut } from 'firebase/auth';
import { changeTheme } from '../app/slices/AuthSlice';
import {
  getCreateMeetingBreadCrumbs,
  getMeetingsBreadCrumbs,
  getMyMeetingsBreadCrumbs,
  getOneOnOneMeetingBreadCrumbs,
  getVideoConferenceBreadCrumbs,
} from '../utils/breadCrumbs';

const Header = () => {
  const navigate = useNavigate();
  const { colorMode } = useEuiTheme();
  const isDark = colorMode === 'DARK';
  const location = useLocation();
  const username = useAppSelector((zoom) => zoom.auth.userInfo?.name);
  const isDarkTheme = useAppSelector((zoom) => zoom.auth.isDarkTheme);
  const [breadCrumbs, setBreadCrumbs] = useState([{ text: 'Dashboard' }]);
  const [isResponsive, setIsResponsive] = useState(false);
  const dispatch = useDispatch();

  const logout = () => {
    signOut(firebaseAuth);
  };

  useEffect(() => {
    const { pathname } = location;
    if (pathname === '/create') {
      setBreadCrumbs(getCreateMeetingBreadCrumbs(navigate));
    } else if (pathname === '/create1on1') {
      setBreadCrumbs(getOneOnOneMeetingBreadCrumbs(navigate));
    } else if (pathname === '/videoconference') {
      setBreadCrumbs(getVideoConferenceBreadCrumbs(navigate));
    } else if (pathname === '/mymeetings') {
      setBreadCrumbs(getMyMeetingsBreadCrumbs(navigate));
    } else if (pathname === '/meetings') {
      setBreadCrumbs(getMeetingsBreadCrumbs(navigate));
    }
  }, [location, navigate]);

  const invertTheme = () => {
    const theme = localStorage.getItem('zoom-theme');
    localStorage.setItem('zoom-theme', theme === 'light' ? 'dark' : 'light');
    dispatch(changeTheme({ isDarkTheme: !isDarkTheme }));
  };

  const section = [
    {
      items: [
        <Link to="/" key="home-link">
          <EuiText>
            <h2 style={{ padding: '0 1vw', display: 'flex', alignItems: 'center' }}>
              {/* Add Boom image next to the text */}
              <img
                src={BoomImage}
                alt="Boom Icon"
                style={{ width: '80px', height: '60px', marginRight: '8px', marginTop: '18px' }} // Added marginTop to move the icon down
              />
              <EuiTextColor color="#FFA500">Boom</EuiTextColor>
            </h2>
          </EuiText>
        </Link>,
      ],
    },
    {
      items: [
        <>
          {username ? (
            <EuiText>
              <h3>
                <EuiTextColor color="white">Hello, </EuiTextColor>
                <EuiTextColor color="#FFA500">{username}</EuiTextColor>
              </h3>
            </EuiText>
          ) : null}
        </>,
      ],
    },
    {
      items: [
        <EuiFlexGroup
          justifyContent="center"
          alignItems="center"
          direction="row"
          style={{ gap: '2vw' }}
          key="controls-group"
        >
          <EuiFlexItem grow={false} style={{ flexBasis: 'fit-content' }}>
            <EuiButtonIcon
              onClick={logout}
              iconType="lock"
              display="fill"
              size="s"
              color="success"
              aria-label="logout-button"
              title="Log Out" // Tooltip text
            />
          </EuiFlexItem>
        </EuiFlexGroup>,
      ],
    },
  ];

  const responsiveSection = [
    {
      items: [
        <Link to="/" key="home-link-responsive">
          <EuiText>
            <h2 style={{ padding: '0 1vw', display: 'flex', alignItems: 'center' }}>
              {/* Add Boom image next to the text */}
              <img
                src={BoomImage}
                alt="Boom Icon"
                style={{ width: '24px', height: '24px', marginRight: '8px', marginTop: '4px' }} // Added marginTop to move the icon down
              />
              <EuiTextColor color="#FFA500">Zoom</EuiTextColor>
            </h2>
          </EuiText>
        </Link>,
      ],
    },
    {
      items: [
        <EuiFlexGroup
          justifyContent="center"
          alignItems="center"
          direction="row"
          style={{ gap: '2vw' }}
          key="controls-group-responsive"
        >
          <EuiFlexItem grow={false} style={{ flexBasis: 'fit-content' }}>
            {isDarkTheme ? (
              <EuiButtonIcon
                onClick={invertTheme}
                iconType="sun"
                display="fill"
                size="s"
                color="warning"
                aria-label="invert-theme-button"
                title="Switch to Light Theme" // Tooltip text
              />
            ) : (
              <EuiButtonIcon
                onClick={invertTheme}
                iconType="moon"
                display="fill"
                size="s"
                color="ghost"
                aria-label="invert-theme-button"
                title="Switch to Dark Theme" // Tooltip text
              />
            )}
          </EuiFlexItem>
          <EuiFlexItem grow={false} style={{ flexBasis: 'fit-content' }}>
            <EuiButtonIcon
              onClick={logout}
              iconType="lock"
              display="fill"
              size="s"
              color="success"
              aria-label="logout-button"
              title="Log Out" // Tooltip text
            />
          </EuiFlexItem>
        </EuiFlexGroup>,
      ],
    },
  ];

  useEffect(() => {
    if (window.innerWidth < 480) setIsResponsive(true);
  }, []);

  return (
    <>
      <EuiHeader
        style={{ minHeight: '8vh' }}
        theme="dark"
        sections={isResponsive ? responsiveSection : section}
      />
      <EuiHeader
        style={{ minHeight: '8vh' }}
        sections={[
          {
            breadcrumbs: breadCrumbs.map((crumb, index) => ({
              ...crumb,
              color:
                index === 0 && !isDark
                  ? 'primary' // Use primary for the first breadcrumb (leading one) in light mode
                  : 'subdued', // Use subdued for others
            })),
          },
        ]}
      />
    </>
  );
};

export default Header;

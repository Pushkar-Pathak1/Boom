import React from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import {
  EuiCard,
  EuiFlexGroup,
  EuiFlexItem,
  EuiImage,
  useEuiTheme,
} from '@elastic/eui';
import dashboard1 from '../assets/dashboard1.png';
import dashboard2 from '../assets/dashboard2.png';
import dashboard3 from '../assets/dashboard3.png';
import Header from '../components/Header';

const Dashboard = () => {
  useAuth();
  const navigate = useNavigate();
  const { colorMode } = useEuiTheme();

  const cardData = [
    {
      title: 'Create Meeting',
      description: 'Create a new meeting and invite people.',
      icon: dashboard1,
      onClick: () => navigate('/create'),
    },
    {
      title: 'My Meetings',
      description: 'View your created meetings.',
      icon: dashboard2,
      onClick: () => navigate('/mymeetings'),
    },
    {
      title: 'Meetings',
      description: 'View the meetings you are invited to.',
      icon: dashboard3,
      onClick: () => navigate('/meetings'),
    },
  ];

  const hoverShadow =
    colorMode === 'DARK'
      ? '0 10px 25px rgba(255, 165, 0, 0.15)'
      : '0 10px 25px rgba(255, 165, 0, 0.3)';

  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: colorMode === 'DARK' ? '#1a1a1a' : '#f7f7f7' }}>
      <Header />

      {/* Main Centered Content */}
      <div
        style={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '5vh 10vw 160px', // padding bottom for wave
        }}
      >
        <EuiFlexGroup
          justifyContent="center"
          alignItems="center"
          gutterSize="xl"
          wrap
          style={{ maxWidth: '1000px', width: '100%' }}
        >
          {cardData.map((card, index) => (
            <EuiFlexItem key={index} grow={false} style={{ minWidth: '280px', maxWidth: '300px' }}>
              <EuiCard
                icon={<EuiImage size="6rem" alt="icon" src={card.icon} />}
                title={card.title}
                description={card.description}
                onClick={card.onClick}
                paddingSize="xl"
                style={{
                  borderRadius: '16px',
                  height: '300px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = hoverShadow;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </EuiFlexItem>
          ))}
        </EuiFlexGroup>
      </div>

      {/* Bottom Wave SVG */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          zIndex: 1,
          overflow: 'hidden',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '160px' }}
        >
          <path
            fill="#ff5500"
            fillOpacity="0.7"
            d="M0,128L17.1,133.3C34.3,139,69,149,103,138.7C137.1,128,171,96,206,106.7C240,117,274,171,309,186.7C342.9,203,377,181,411,181.3C445.7,181,480,203,514,202.7C548.6,203,583,181,617,192C651.4,203,686,245,720,234.7C754.3,224,789,160,823,154.7C857.1,149,891,203,926,224C960,245,994,235,1029,197.3C1062.9,160,1097,96,1131,80C1165.7,64,1200,96,1234,138.7C1268.6,181,1303,235,1337,234.7C1371.4,235,1406,181,1423,154.7L1440,128L1440,320L0,320Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Dashboard;

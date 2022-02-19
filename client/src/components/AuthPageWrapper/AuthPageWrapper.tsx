import React, { useEffect, useState } from 'react';
import { Box, Paper } from '@mui/material';
import AuthPageHeader from '../AuthPageHeader/AuthPageHeader';
import { useState, useEffect } from 'react';

interface AuthPageWrapperProps {
  header: string;
  children: React.ReactNode;
}

const AuthPageWrapper: React.FC<AuthPageWrapperProps> = ({ header, children }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWindowWidth);
    return () => window.removeEventListener('resize', updateWindowWidth);
  });

  return (
    <Box
      sx={{
        maxWidth: 800,
        minHeight: 700,
        margin: '0 auto',
        padding: windowWidth < 600 ? 0 : 10,
        backgroundColor: '#fff',
        borderRadius: 2,
        boxShadow:
          windowWidth < 600
            ? 'none'
            : '0px 0px 1.9px rgba(0, 0, 0, 0.007),0px 0px 4.9px rgba(0, 0, 0, 0.014),0px 0px 9.9px rgba(0, 0, 0, 0.021),0px 0px 20.4px rgba(0, 0, 0, 0.031),0px 0px 56px rgba(0, 0, 0, 0.05)',
      }}
      component={Paper}
    >
      <AuthPageHeader header={header} />
      <Box
        sx={{
          width: 350,
          margin: '0 auto',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AuthPageWrapper;

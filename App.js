import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import './index.css';

const App = () => {
  const [isFullScreen, setIsFullScreen] = useState(false); 
  const [time, setTime] = useState(new Date());

  const enableFullScreen = useCallback(() => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen(); 
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen(); 
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen(); 
    }
    setIsFullScreen(true); 
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isFullScreen) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#282c34',
          color: '#fff',
          fontSize: '24px',
        }}
        onClick={enableFullScreen} 
      >
        entrar ahora
      </div>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Text style={styles.time}>{time.toLocaleTimeString()}</Text>
      <Text style={styles.date}>{time.toLocaleDateString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282c34',
  },
  time: {
    fontSize: 48,
    color: '#61dafb',
  },
  date: {
    fontSize: 24,
    color: '#fff',
  },
});

export default App;

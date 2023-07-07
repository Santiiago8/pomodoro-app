import { StyleSheet, Text, View, Button, Platform, SafeAreaView, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import Header from './src/components/Header';
import Timer from './src/components/Timer';
import { useEffect } from 'react';

const colors = ["#F7DC6F","#A2D9CE", "#D7BDE2"];

export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK" );
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if(isActive){
      interval = setInterval(() => {
        setTime(time - 1);
      },1000)
    } else {
      clearInterval(interval);
    }

    if (time === 0) {
      setIsActive(false);
      setIsWorking((prev) => !prev);
      setTime(isWorking ? 300 : 1500);
    }

    return () => clearInterval(interval);
  },[isActive, time])

  function handleStartStop(){
    setIsActive(!isActive);
  }
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors[currentTime]}]}>
      <View style={{
          flex: 1,
          paddingHorizontal: 15, 
          paddingTop: Platform.OS === "android" && 30,
        }}>
        <Text style={styles.text}>Pomodoro</Text>
        <Header 
          currentTime={currentTime} 
          setCurrentTime={setCurrentTime}
          setTime={setTime}
        />
        <Timer
          time={time}
        />
        <TouchableOpacity 
          style={styles.button}
          onPress={handleStartStop}
        >
          <Text style={{color: "#FFF", fontWeight: 'bold'}}>
            
            {isActive ? "STOP" : "START"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: "#333333",
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
    alignItems: 'center',
  }
});

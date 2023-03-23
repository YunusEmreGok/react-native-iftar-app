import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ImageBackground } from "react-native";
import axios from "axios";

const IMAGE = require("./assets/bg.jpg");
const BASE_URL = "https://yunusemregok.com.tr";

export default function App() {
  const [iftarTime, setIftarTime] = useState("");
  const [remainingTime, setRemainingTime] = useState(null);

  useEffect(() => {
    const _iftarTime = Number(iftarTime);
    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const diffSeconds = _iftarTime - now;
      setRemainingTime(diffSeconds);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours} saat ${minutes} dakika ${secs} saniye`;
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${BASE_URL}/iftar-saati.php`);
      setIftarTime(response.data);
    };
    fetchData();
  }, []);

  return (
    <ImageBackground source={IMAGE} style={styles.bgImage}>
      <View style={styles.container}>
        <Text style={styles.header}>İftara Kalan Süre</Text>
        <Text style={styles.timer}>{formatTime(remainingTime)}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FFFF",
  },
  timer: {
    fontSize: 20,
    color: "#FFFF",
  },
});

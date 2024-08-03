import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWeather,
  fetchWeatherList,
} from "../../redux/actions/weatherAction";
import { getCurrentLocation } from "../../util/getLocations";
import WeatherList from "../../components/WeatherList";
import { iconUri, texts } from "../../constants/constants";
import { kelvinToCelsius } from "../../helper/numberHelpers";

export default function WeatherScreen() {
  const [isGettingWeatherInfo, setIsGettingWeatherInfo] = useState(false);

  const notes = useSelector(({ weather }: any) => weather?.weather);
  const list = useSelector(({ weather }: any) => weather?.weatherList);

  const weatherData = notes?.weatherData;
  const weatherListData = list?.weatherListData;

  const isGettingWeather = notes?.isLoading;
  const isGettingWeatherList = list?.isLoading;

  const dispatch = useDispatch();

  async function getWeatherInfo() {
    setIsGettingWeatherInfo(true);
    const location = await getCurrentLocation();
    dispatch(
      fetchWeather({
        lat: location?.latitude,
        long: location?.longitude,
      }) as any
    );
    dispatch(
      fetchWeatherList({
        lat: location?.latitude,
        long: location?.longitude,
      }) as any
    );
    setIsGettingWeatherInfo(false);
  }

  useEffect(() => {
    getWeatherInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <View style={styles.scrollwrapper}>
      <ImageBackground
        style={{ flex: 1 }}
        resizeMode="cover"
        source={require("../../assets/background.jpg")}
      >
        {!isGettingWeather && !isGettingWeatherList && !isGettingWeatherInfo ? (
          <>
            <View style={styles.container}>
              <Text style={styles.fs42}>
                {kelvinToCelsius(weatherData?.main?.temp).toFixed(2)}
              </Text>
              <Image
                style={styles.mainImg}
                source={{
                  uri: `${iconUri}${weatherData?.weather?.[0]?.icon}.png`,
                }}
              />
              <Text style={styles.fs32}>{weatherData?.weather?.[0]?.main}</Text>
              <Text style={styles.fs18}>
                {weatherData?.weather?.[0]?.description}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.fs18}>
                {texts.high}
                {kelvinToCelsius(weatherData?.main?.temp_max).toFixed(2)}
              </Text>
              <Text style={(styles.fs18, { marginHorizontal: 16 })}>{"|"}</Text>
              <Text style={styles.fs18}>
                {texts.low}
                {kelvinToCelsius(weatherData?.main?.temp_min).toFixed(2)}
              </Text>
            </View>
            <WeatherList list={weatherListData} />
          </>
        ) : (
          <View style={styles.fullScreenLoader}>
            <ActivityIndicator size="large" color={"white"} />
          </View>
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  fs18: { fontSize: 18 },
  textContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "center",
  },
  fs32: { fontSize: 32 },
  mainImg: { width: 64, height: 64 },
  fs42: { fontSize: 45 },
  container: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 80,
  },
  scrollwrapper: { flex: 1 },
  pb: { paddingBottom: 60 },
  fullScreenLoader: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

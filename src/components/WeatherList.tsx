import { FlatList, Image, Text, View } from "react-native";
import React from "react";
import moment from "moment-timezone";
import { iconUri, texts } from "../constants/constants";
import { styles } from "./styles";

export default function WeatherList({ list }: any) {
  const renderItem = ({ item }: any) => (
    <View>
      <View
        style={{
          backgroundColor: "rgba(	255,255,255,0.5)",
          marginTop: 10,
          padding: 20,
          borderRadius: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.text}>{moment(item?.dt).format("ddd")}</Text>
        <Image
          style={styles.iconStyle}
          source={{
            uri: `${iconUri}${item?.weather?.[0]?.icon}.png`,
          }}
        />
        <View style={styles.view}>
          <Text style={styles.text}>Min : {item?.temp?.min.toFixed(1)}° C</Text>
          <Text style={styles.text}>Max : {item?.temp?.max.toFixed(1)}° C</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.listContainer}>
      <Text style={styles.listHeading}>{texts.forcastHeading}</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={list}
        keyExtractor={(item, index) => String(index)}
        renderItem={renderItem}
      />
      <View style={{ height: 20 }} />
    </View>
  );
}

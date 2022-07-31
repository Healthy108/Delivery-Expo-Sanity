import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../features/basketSlice";
import { useNavigation } from "@react-navigation/native";
import Currency from "react-currency-formatter";

const BasketIcon = () => {
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const basketTotal = useSelector(selectBasketTotal);

  if (items.length == 0) return null;

  return (
    <View className="w-full z-50 bottom-10 absolute">
      <TouchableOpacity
        onPress={() => navigation.navigate("Basket")}
        className="mx-5 bg-[#0CB] p-4 rounded-lg flex-row items-center space-x-1"
      >
        <Text className="font-extrabold text-white text-lg bg-[#01A296] py-1 px-2">
          {items.length}
        </Text>
        <Text className="flex-1 text-center text-lg text-white font-extrabold ">
          Xem giỏ hàng
        </Text>
        <Text className="text-lg text-white font-extrabold">
          <Currency quantity={basketTotal} currency="VND" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;

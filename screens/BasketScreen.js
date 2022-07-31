import { View, Text, SafeAreaView, Image } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../features/basketSlice";
import { TouchableOpacity } from "react-native";
import { XCircleIcon } from "react-native-heroicons/solid";
import { ScrollView } from "react-native";
import { urlFor } from "../sanity";
import Currency from "react-currency-formatter";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  // console.log(groupedItemsInBasket);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#0CB] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Giỏ hàng</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>

          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute rounded-full bg-gray-100 top-3 right-5"
          >
            <XCircleIcon color="#0CB" width={50} height={50} />
          </TouchableOpacity>
        </View>

        <View className="flex-row space-x-4 items-center px-4 py-3 my-5 bg-white w-full">
          <Image
            source={{
              uri: "https://tse2.mm.bing.net/th?id=OIP.Us8fVkzC1Nt7VTsd_VQtwAHaHa&pid=Api&P=0&w=179&h=179",
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Giao hàng trong 10-20 phút!</Text>
          <TouchableOpacity>
            <Text className="text-[#0CB]">Thay đổi</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white px-5 py-2"
            >
              <Text className="text-[#0CB]">{items.length} x</Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{items[0].name}</Text>
              <Text className="text-gray-600">
                <Currency quantity={items[0]?.price} currency="VND" />
              </Text>

              <TouchableOpacity>
                <Text
                  className="text-xs text-[#0CB]"
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Tổng giá tiền</Text>
            <Text className="text-gray-400">
              <Currency quantity={basketTotal} currency="VND" />
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Phí giao hàng</Text>
            <Text className="text-gray-400">
              <Currency quantity={20000} currency="VND" />
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text>Tổng tiền sau phí</Text>
            <Text className="font-extrabold">
              <Currency quantity={basketTotal + 20000} currency="VND" />
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("PreparingOrderScreen")}
            className="rounded-lg bg-[#0CB] p-4"
          >
            <Text className="text-center text-white text-lg font-bold">
              Đặt hàng
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;

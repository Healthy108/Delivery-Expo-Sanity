import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React from "react";
import { useEffect } from "react";
import { useLayoutEffect } from "react";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  UserIcon,
  ChevronDownIcon,
  SearchIcon,
  AdjustmentsIcon,
} from "react-native-heroicons/solid";
import Categories from "../components/Categories";
import FeatureRow from "../components/FeatureRow";
import sanityClient from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `
          *[_type == "feature"] {
            ...,
          restaurant[]->{
            ...,
            dishes[]->
          }
          }
        `
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);

  return (
    <SafeAreaView className="bg-white pt-5">
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{
            uri: "https://tse2.mm.bing.net/th?id=OIP.Us8fVkzC1Nt7VTsd_VQtwAHaHa&pid=Api&P=0&w=179&h=179",
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />

        <View className="flex-1">
          <Text className="font-bold text-blue-500 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Vị trí hiện tại
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>

        <UserIcon
          onPress={() => navigation.navigate("Signin")}
          size={35}
          color="#00CCBB"
        />
      </View>

      {/* {Search} */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
          <SearchIcon color="gray" size={22} />
          <TextInput placeholder="Nhà hàng và ẩm thực" keyboardType="default" />
        </View>

        <AdjustmentsIcon color="#00CCBB" />
      </View>

      {/* Body */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Categories */}
        <Categories />

        {/* Featured */}
        {featuredCategories?.map((category) => (
          <FeatureRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

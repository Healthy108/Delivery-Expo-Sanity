import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";
import sanityClient from "../sanity";

const FeatureRow = ({ id, title, description }) => {
  const [restaurant, setRestaurant] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
        *[_type == "feature" && _id == $id] {
          ...,
        restaurant[]->{
          ...,
          dishes[]->,
          type-> {
            name
          }
        },
        }[0]
        `,
        { id }
      )
      .then((data) => {
        setRestaurant(data?.restaurant);
      });
  }, [id]);

  // console.log(restaurant);

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>

      <Text className="text-xs text-gray-500 px-4">{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {restaurant?.map((restaur) => (
          <RestaurantCard
            key={restaur._id}
            id={restaur._id}
            imgUrl={restaur.image}
            address={restaur.address}
            title={restaur.name}
            dishes={restaur.dishes}
            rating={restaur.string}
            short_description={restaur.short_description}
            genre={restaur.type?.name}
            long={restaur.long}
            lat={restaur.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeatureRow;

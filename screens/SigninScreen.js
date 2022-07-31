import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { SocialIcon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import {
  ArrowLeftIcon,
  LockClosedIcon,
  UserCircleIcon,
} from "react-native-heroicons/solid";
import { useForm, Controller } from "react-hook-form";

const SigninScreen = () => {
  const { control, handleSubmit } = useForm();

  const handlePress = (data) => {
    console.log(data);

    navigation.navigate("Home");
  };

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  return (
    <ScrollView>
      <TouchableOpacity
        onPress={navigation.goBack}
        className="absolute top-14 left-5 p-2 bg-gray-200 rounded-full z-10"
      >
        <ArrowLeftIcon size={22} color="#00CCBB" />
      </TouchableOpacity>
      <Image
        source={{
          uri: "https://i0.wp.com/persedblog.com/wp-content/uploads/2018/07/Post-1-Welcome.jpg?fit=1200%2C675",
        }}
        className="w-full h-44 bg-gray-300 p-4"
      />

      <View className="p-5">
        <Text className="text-center text-[#0CB] text-xl font-bold">
          ĐĂNG NHẬP TÀI KHOẢN
        </Text>

        <View className="pt-5 px-2">
          <View className="flex-row bg-gray-200 p-3 rounded-3xl">
            <UserCircleIcon color="gray" size={22} />
            <Controller
              control={control}
              name="username"
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  className="w-full ml-2"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Nhập email của bạn"
                />
              )}
            />
          </View>
        </View>

        <View className="pt-3 px-2">
          <View className="flex-row bg-gray-200 p-3 rounded-3xl">
            <LockClosedIcon color="gray" size={22} />
            <Controller
              control={control}
              name="password"
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  className="w-full ml-2"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Nhập mật khẩu của bạn"
                  secureTextEntry={true}
                />
              )}
            />
          </View>
        </View>

        <View className="pt-3 px-2">
          <TouchableOpacity
            className="bg-[#0CB] p-4 rounded-3xl "
            onPress={handleSubmit(handlePress)}
          >
            <Text className="text-center text-white font-bold ">ĐĂNG NHẬP</Text>
          </TouchableOpacity>
        </View>

        {/*  */}
        {/*  */}
        {/* Quên mật khẩu */}
        <TouchableOpacity>
          <Text className="text-center pt-3 text-gray-400">Quên mật khẩu?</Text>
        </TouchableOpacity>

        {/* Đăng nhập với MXH */}
        <Text className="text-center pt-3">HOẶC</Text>

        <View className="pt-2">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <SocialIcon title="Đăng nhập với Facebook" button type="facebook" />
          </TouchableOpacity>
        </View>

        <View className="pt-3">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <SocialIcon title="Đăng nhập với Google" button type="google" />
          </TouchableOpacity>
        </View>

        {/* Đăng ký Tài khoản */}
        <View className="pt-3">
          <TouchableOpacity>
            <Text className="text-center text-gray-400 font-bold">
              Chưa có tài khoản - Đăng ký!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SigninScreen;

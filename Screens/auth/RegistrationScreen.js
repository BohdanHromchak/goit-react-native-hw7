import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { authSignUpUser } from "../../Redux/authOperations";

const initialState = {
  email: "",
  password: "",
  login: "",
};

export default function RegistrationScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const [isLoginFocus, setIsLoginFocus] = useState(false);
  const [isEmailFocus, setIsEmailFocus] = useState(false);
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const dispatch = useDispatch();

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    keyboardHide();
    dispatch(authSignUpUser(state))
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
          <View style={styles.container}>
            <Image
              source={require("../../assets/images/screenBg.png")}
              style={styles.image}
            />
            <View style={styles.formWrap}>
              <View style={styles.avatar}>
                <Pressable style={styles.avatarButton}>
                  <AntDesign name="pluscircleo" size={24} color="#FF6C00" />
                </Pressable>
              </View>
              <Text style={styles.title}>Регистрация</Text>

              <View style={styles.inputWrap}>
                <TextInput
                  value={state.login}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, login: value }))
                  }
                  placeholder="Логин"
                  placeholderTextColor={"#BDBDBD"}
                  style={{
                    ...styles.input,
                    borderColor: isLoginFocus ? "#ff6c00" : "#e8e8e8",
                    backgroundColor: isLoginFocus ? "#fff" : "#f6f6f6",
                    marginBottom: 10,
                  }}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setIsLoginFocus(true);
                  }}
                  onBlur={() => setIsLoginFocus(false)}
                />
                <TextInput
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                  placeholder="Адрес электронной почты"
                  placeholderTextColor={"#BDBDBD"}
                  style={{
                    ...styles.input,
                    borderColor: isEmailFocus ? "#ff6c00" : "#e8e8e8",
                    backgroundColor: isEmailFocus ? "#fff" : "#f6f6f6",
                    marginBottom: 10,
                  }}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setIsEmailFocus(true);
                  }}
                  onBlur={() => setIsEmailFocus(false)}
                />
                <View style={{ position: "relative" }}>
                  <TextInput
                    value={state.password}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                    placeholder="Пароль"
                    placeholderTextColor={"#BDBDBD"}
                    secureTextEntry={isPasswordHidden}
                    style={{
                      ...styles.input,
                      borderColor: isPasswordFocus ? "#ff6c00" : "#e8e8e8",
                      backgroundColor: isPasswordFocus ? "#fff" : "#f6f6f6",
                    }}
                    onFocus={() => {
                      setIsShowKeyboard(true);
                      setIsPasswordFocus(true);
                    }}
                    onBlur={() => setIsPasswordFocus(false)}
                  />
                  <Pressable
                    onPress={() =>
                      setIsPasswordHidden((prevState) => !prevState)
                    }
                    style={styles.toggleButton}
                  >
                    <Text style={styles.toggleText}>
                      {isPasswordHidden ? "Показать" : "Скрыть"}
                    </Text>
                  </Pressable>
                </View>
              </View>

              {!isShowKeyboard && (
                <View>
                  <Pressable onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Зарегистрироваться</Text>
                  </Pressable>

                  <Pressable
                    onPress={() => navigation.navigate("Login")}
                    style={{
                      marginBottom: 50,
                    }}
                  >
                    <Text style={styles.logInText}>
                      Уже есть аккаунт? Войти
                    </Text>
                  </Pressable>
                </View>
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-end",
    height: "100%",
    width: "100%",
  },
  formWrap: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    paddingHorizontal: 20,
    // paddingLeft: 20,
    // paddingRight: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 70,
  },
  avatar: {
    width: 110,
    height: 110,
    backgroundColor: "#F6F6F6",
    position: "absolute",
    top: -50,
    left: 150,
    borderRadius: 16,
  },
  avatarButton: {
    position: "absolute",
    right: -12,
    bottom: 10,
  },
  title: {
    fontFamily: "Roboto-Medium",
    textAlign: "center",
    color: "#212121",
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 35,
    letterSpacing: 1.6,
    marginBottom: 20,
  },
  inputWrap: {
    flexDirection: "column",
    // gap: 10,
    marginBottom: 20,
  },
  image: {
    position: "absolute",
    width: "100%",
    top: 0,
  },
  input: {
    height: 45,
    padding: 15,
    borderWidth: 1,
    // backgroundColor: "#F6F6F6",
    // borderColor: "#E8E8E8",
    borderRadius: 8,
    fontFamily: "Roboto-Regular",
  },
  button: {
    height: 51,
    backgroundColor: "#FF6C00",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    marginBottom: 15,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 16,
    fontFamily: "Roboto-Regular",
  },

  logInText: {
    textAlign: "center",
    color: "#1B4371",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
    // marginBottom: 50,
  },
  toggleButton: {
    position: "absolute",
    top: 12,
    right: 20,
  },
  toggleText: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    lineHeight: 19,
  },
});

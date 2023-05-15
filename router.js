import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./Screens/auth/LoginScreen";
import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import Home from "./Screens/mainScreen/Home";
import CommentsScreen from "./Screens/mainScreen/CommentsScreen";
import MapScreen from "./Screens/mainScreen/MapScreen";

const AuthStack = createStackNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Register"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={Home}
      />
      <AuthStack.Screen
        name="Комментарии"
        component={CommentsScreen}
        options={{ headerShown: true, headerTitleAlign: "center" }}
      />
      <AuthStack.Screen
        name="Карта"
        component={MapScreen}
        options={{ headerShown: true, headerTitleAlign: "center" }}
      />
    </AuthStack.Navigator>
  );
};

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";

import Home from "../../screens/Home";
import Signin from "../../screens/Signin";
import Signup from "../../screens/Signup";
import HeaderTabs from "./HeaderTabs";

const Stack = createNativeStackNavigator();

export default function ScreensNav() {
  const [state, setState] = useContext(AuthContext);
  const authenticated = state && state.token !== "" && state.user !== null;
  return (
    <Stack.Navigator
      initialRouteName="Signin"
      screenOptions={{ headerShown: false }}
    >
      {authenticated ? (
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Links Daily", headerRight: () => <HeaderTabs /> }}
        />
      ) : (
        <>
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Signin" component={Signin} />
        </>
      )}
    </Stack.Navigator>
  );
}

import store from "@/lib/store";
import { Stack } from "expo-router";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <Provider store={store}>
       <KeyboardAvoidingView
       behavior={Platform.OS === "ios" ? "padding" : "height"}
       style={{flex: 1}}>
         <Stack>
          <Stack.Screen name="HomeScreen" options={{ headerShown: false }} />;
          <Stack.Screen name="MapScreen" options={{ headerShown: false }} />
        </Stack>
       </KeyboardAvoidingView>
    </Provider>
  );
}



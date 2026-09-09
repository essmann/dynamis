import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { sharedStyles } from '@dynamis/shared';
import { EventProvider } from 'react-native-outside-press';
import { useFonts } from "expo-font";
export default function TabsLayout() {
    const [fontsLoaded] = useFonts({
        'Inter-Regular': require('/home/essmann/Documents/coding/hybrid/dynamis/frontend-mobile/my-app/assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
    });
    if (!fontsLoaded) {
        return null; //Loading screen
    }
    return (
        <Tabs
            screenOptions={{
                sceneStyle: {
                    backgroundColor: sharedStyles.bg
                },

                headerStyle: {
                    backgroundColor: sharedStyles.primary,

                },
                headerTintColor: sharedStyles.bg


            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={size} />
                    ),
                    headerTitleAlign: 'center',

                }}
            />
            <Tabs.Screen
                name="Workouts"
                options={{
                    title: 'Workouts',

                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="compass" color={color} size={size} />
                    ),
                    headerTitleAlign: 'center',

                }}
            />
            <Tabs.Screen
                name="measurements"
                options={{
                    title: 'Measurements',


                    headerTitleAlign: 'center',

                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings" color={color} size={size} />
                    ),
                    headerTitleAlign: 'center',

                }}
            />
        </Tabs>
    );
}
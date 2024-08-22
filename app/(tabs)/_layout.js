import { Tabs } from "expo-router";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const layout = () => {
    return (
        <Tabs>
            <Tabs.Screen name="home" options={
                {
                    tabBarLabel: "home",
                    tabBarLabelStyle: {
                        color: '#7CB9E8'
                    },
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (<FontAwesome5 name="tasks" size={24} color="#7CB9E8" />) : (<FontAwesome5 name="tasks" size={24} color="black" />)
                }
            } />

            <Tabs.Screen name="calender" options={
                {
                    tabBarLabel: "calender",
                    tabBarLabelStyle: {
                        color: '#7CB9E8'
                    },
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (<FontAwesome5 name="calendar" size={24} color="#7CB9E8" />) : (<FontAwesome5 name="calendar" size={24} color="black" />)
                }
            } />

            <Tabs.Screen name="profile" options={
                {
                    tabBarLabel: "profile",
                    tabBarLabelStyle: {
                        color: '#7CB9E8'
                    },
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (<MaterialCommunityIcons name="account-details" size={24} color="#7CB9E8" />) : (<MaterialCommunityIcons name="account-details" size={24} color="black" />)
                }
            } />
        </Tabs>
    )
}

export default layout;


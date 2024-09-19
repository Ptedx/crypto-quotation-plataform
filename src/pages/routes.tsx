import { Hello } from './HelloSection';
import { Login } from './Login';
import { NavigationContainer, Theme, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainPage } from './Main';
import { rootTypes } from '../types/types';
import { Register } from './Register';
import { Details } from './Details';
import { Loading } from './LoadingScreen';

const Stack = createNativeStackNavigator<rootTypes>();
const Tabs = createBottomTabNavigator<rootTypes>();

const MyTheme: Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#000',
    },
  };

export default function Routes() {
  return (
      <NavigationContainer theme={MyTheme}>
            <Stack.Navigator initialRouteName="Loading"> 
                <Stack.Screen 
                    name='Loading' 
                    component={Loading}
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                name="HelloSection" 
                component={Hello} 
                options={{ headerShown: false, contentStyle: { backgroundColor: '#000'} } }
                />
                <Stack.Screen 
                    name='Login' 
                    component={Login}
                    options={{ headerShown: false }}
                />  
                <Stack.Screen 
                    name='Register' 
                    component={Register}
                    options={{ headerShown: false }}
                />  
                  
                <Stack.Screen 
                name='MainTabs' 
                component={MainPage} 
                options={{ headerShown: false, headerTitle:''}
                  
                }
                />  
                <Stack.Screen 
                name='Details' 
                component={Details} 
                options={{ 
                    headerTitle:'',
                    headerTitleStyle:{
                        fontWeight:'bold'
                    },
                    headerStyle:{
                        backgroundColor:'#0e0e0e',
                    },
                    headerTintColor:'white'
                }}
                />  
            </Stack.Navigator>
        </NavigationContainer>
    
  );
}
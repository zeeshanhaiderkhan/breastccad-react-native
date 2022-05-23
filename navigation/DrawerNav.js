import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator,DrawerContentScrollView,DrawerItemList,DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeNavigation from './HomeNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function DrawerNav({navigation}) {

  const logout=()=>{
    AsyncStorage.clear().then(()=>{console.log("User Logged Out!")})
  }

    return (
   
      <Drawer.Navigator  initialRouteName="Home" screenOptions={{drawerPosition:'right', drawerType:'back', headerShown:false}} drawerContent={props => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Logout" onPress={logout} />
          </DrawerContentScrollView>
        )
      }}>
        <Drawer.Screen name="Home" component={HomeNavigation} />
        
      </Drawer.Navigator>
  
  );
}
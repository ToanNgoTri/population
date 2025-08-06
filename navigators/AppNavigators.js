import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Population} from '../screen/population';
// import {Crime} from '../screen/crime';
import {Crime} from '../screen/crime';
import {GetOneFamily} from '../screen/getOneFamily';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

export function AppNavigators() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown:false,
        tabBarLabelPosition: 'beside-icon',
        tabBarLabelStyle: {
          fontWeight: '700',
          fontSize: 15,
        },
        tabBarIconStyle: {display: 'none'},
      }}>
      <Tab.Screen name="Tìm công dân" component={Population} />
      <Tab.Screen name="Tìm đối tượng" component={Crime} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'green',
          },
          headerBlurEffect: 'extraLight',
          headerShadowVisible: false,
        }}>
        <Stack.Screen
          name="HomeStack"
          component={AppNavigators}
          options={{
            header: () => null,
          }}
        />

        <Stack.Screen
          name={`getOneFamily`}
          component={GetOneFamily}
          options={({navigation}) => ({
            headerTitleAlign: 'center',
            animation: 'simple_push',
            animationTypeForReplace: 'push',
            headerTitle: () => <>
            <Text style={{fontWeight:'bold',fontSize:20}}>
              Thông tin hộ
            </Text>
            </>,
          })}
        />
      </Stack.Navigator>
    </>
  );
};

export default StackNavigator;

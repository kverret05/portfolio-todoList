import { StyleSheet} from 'react-native'
import { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import DetailsScreen from "./src/screens/DetailsScreen"
import TodoScreen from './src/screens/ToDoScreen'


const Tab = createBottomTabNavigator()

let taskData = [
  { 
    description: "Do homework", 
    completed: false, 
    key: 1, 
    relatedTasks: [2]
   },
  { 
    description: "Play video games", 
    completed: false, 
    key: 2 
  },
];

const Stack = createNativeStackNavigator()


function ToDoHomeScreen() {
  let [tasks, setTasks] = useState(taskData)
  useEffect(() => {
    async function getValue() {
      const value = await AsyncStorage.getItem("@tasks")
      if (value === null) {
        console.log("Sorting serialized version of tasks" + JSON.stringify(tasks))
        await AsyncStorage.setItem("@tasks", JSON.stringify(tasks))
      } else {
        let parsedValue = JSON.parse(value)
        console.log("Retrieving serialized version of tasks")
        console.log(parsedValue)
        setTasks(JSON.parse(value))
      }
    }
    getValue()
  }, [])

  return <Stack.Navigator initialRouteName='To Do List'>
    <Stack.Screen name="Todo List">
      {(props) => (
        <TodoScreen
          {...props} tasks={tasks} setTasks={setTasks} />
      )}
    </Stack.Screen>
    <Stack.Screen name="Details">
      {(props) => (
        <DetailsScreen
          {...props} setTasks={setTasks} tasks={tasks} />
      )}
    </Stack.Screen>
  </Stack.Navigator>
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={ToDoHomeScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export const styles = StyleSheet.create({
  image: {
    flex: 1,
    aspectRatio: 1,
    width: '50%',
    backgroundColor: '#0553',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 30,
  },
})
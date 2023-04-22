import { StatusBar } from 'expo-status-bar'
import { Alert, StyleSheet, View } from 'react-native'
import { FlatList } from "react-native"
import { Button, CheckBox, Input, Text } from '@rneui/themed'
import * as Font from 'expo-font'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StackActions } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

const Tab = createBottomTabNavigator()

async function cacheFonts(fonts) {
  return fonts.map(async (font) => await Font.loadAsync(font))
}

let initTasks = [
  { description: "Do Homework", completed: false, key: 1, relatedTasks: [2] },
  { description: "Take a shower", completed: false, key: 2, relatedTasks: [1] },
]

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={ToDoHomeScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

function SettingsScreen() {
  return <Text>Settings Screen</Text>
}

function ToDoHomeScreen() {
  let [tasks, setTasks] = useState(initTasks)
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

function DetailsScreen({ navigation, route, setTasks, tasks }) {
  let { description, completed, key, relatedTasks } = route.params.item
  useEffect(() => {
    navigation.setOptions({
      title: description === "" ? "No title" : description,
    })
  }, [navigation])
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen New</Text>
      <Text>{description}</Text>
      {
        relatedTasks !== undefined && relatedTasks.length > 0 ?
          <>
            <Text>Related Tasks:</Text>
            {tasks.filter(tasks = relatedTasks.includes(tasks.key))
              .map(cTask => <Button key={cTask.key} title={cTask.description}
                onPress={() => {
                  navigation.dispatch(StackActions.push('Details', { item: cTask }));
                }}
              />)
            }
          </>
          : undefined}
    </View>
  )
}

function TodoScreen({ navigation, tasks, setTasks }) {
  cacheFonts([FontAwesome.font])
  let [input, setInput] = useState("")
  let updateTask = async (task) => {
    console.log(task)
    task.completed = !task.completed
    setTasks([...tasks])
    await AsyncStorage.setItem('@tasks', JSON.stringify(tasks))
  }
  let addTask = async () => {
    let maxKey = 0
    tasks.forEach(task => {
      if (task.key > maxKey) {
        maxKey = task.key
      }
    })

    let newTasks = [
      ...tasks,
      {
        description: input,
        completed: false,
        key: maxKey + 1,
      },
    ]

    setTasks(newTasks)
    console.log(newTasks)
    await AsyncStorage.setItem('@tasks', JSON.stringify(newTasks))
    setInput("")
  }
  
// new added component: removeTask
let removeTask = async (taskToRemove) => {
  let newTasks = tasks.filter(task => task.key !== taskToRemove.key)
  setTasks(newTasks)
  console.log(newTasks)
  await AsyncStorage.setItem('@tasks', JSON.stringify(newTasks))
}

  let renderItem = ({ item }) => {
    return (
      <View style={styles.horizontal}>
        <CheckBox
          textStyle={item.completed ? {
            textDecorationLine: "line-through",
            textDecorationStyle: "solid",
          } : undefined}
          title={item.description}
          checked={item.completed}
          onPress={() => updateTask(item)}
        />
        <Button title="Details" onPress={() => navigation.navigate("Details", { item })} /> 
        <Button title="Remove?" onPress={() => removeTask(item)} />
      </View>
    )

  }

  return (
    <View style={[styles.container]}>
      <StatusBar style="auto" />
      <FlatList data={tasks} renderItem={renderItem} />
      <View style={[styles.horizontal]}>
        <Input
          onChangeText={setInput}
          value={input}
          placeholder="New task...">
        </Input>
        <Button title="Add task" onPress={addTask} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
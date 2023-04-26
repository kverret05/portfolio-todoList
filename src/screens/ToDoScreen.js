import AsyncStorage from "@react-native-async-storage/async-storage"
import { Button, CheckBox, Input } from '@rneui/themed'
import { StatusBar } from "expo-status-bar"
import { StyleSheet, View, FlatList } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import * as Font from 'expo-font'
import React, { useState } from "react"
import { styles } from "../../App"

export async function cacheFonts(fonts) {
    return fonts.map(async (font) => await Font.loadAsync(font))
  }

export function TodoScreen({ navigation, tasks, setTasks }) {
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
    // working on adding confirmation alert 
    let removeTask = async (tasktoRemove) => {
      let newTasks = tasks.filter(task => task.key !== tasktoRemove.key)
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
          <Button title="Details" onPress={() => {
            navigation.navigate("Details", { item });
            navigation.setParams({ setTasks: setTasks });
          }} />
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

  export default TodoScreen
  export { StyleSheet };
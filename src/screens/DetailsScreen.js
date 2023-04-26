import { StackActions } from "@react-navigation/native";
import { Text } from "@rneui/themed";
import { useEffect } from "react";
import { View } from "react-native";

export function DetailsScreen({ navigation, route, setTasks, tasks }) {
    console.log(route.params.item.relatedTasks);
    let { description, relatedTasks } = route.params.item
    useEffect(() => {
      navigation.setOptions({
        title: description === "" ? "No title" : description,
      })
    }, [navigation])
  
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Details Screen</Text>
        <Text>{description}</Text>
        {
          relatedTasks !== undefined && relatedTasks.length > 0 ?
            <>
              <Text>Related Tasks:</Text>
              {tasks.filter(task => relatedTasks.includes(task.key))
                .map(cTask => <Button key={cTask.key} title={cTask.description}
                  onPress={() => {
                    navigation.dispatch(StackActions.push('Details', { item: cTask, setTasks, tasks, relatedTasks: cTask.relatedTasks }));
                  }}
                />)
              }
            </>
            : undefined}
      </View>
    )
  }
  
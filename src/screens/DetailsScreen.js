import { StackActions } from "@react-navigation/native";
import { Text, Button } from "@react-native-elements";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

function DetailsScreen({ navigation, route, setTasks, tasks }) {
  let { description, relatedTasks } = route.params.item;
  const [relatedTasksState, setRelatedTasksState] = useState(relatedTasks);

  useEffect(() => {
    setRelatedTasksState(route.params.item.relatedTasks);
  }, [route.params.item]);

  useEffect(() => {
    navigation.setOptions({
      title: description === "" ? "No title" : description,
    });
  }, [navigation, description]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Text>{description}</Text>
      {relatedTasksState !== undefined && relatedTasksState.length > 0 ? (
        <>
          <Text>Related Tasks:</Text>
          {tasks
            .filter((task) => relatedTasksState.includes(task.key))
            .map((cTask) => (
              <Button
                key={cTask.key}
                title={cTask.description}
                onPress={() => {
                  navigation.dispatch(
                    StackActions.push("Details", {
                      item: cTask,
                      setTasks,
                      tasks,
                      relatedTasks: cTask.relatedTasks,
                    })
                  );
                }}
              />
            ))}
        </>
      ) : null}
    </View>
  );
}

export default DetailsScreen;

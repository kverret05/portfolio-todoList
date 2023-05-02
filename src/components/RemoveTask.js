import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Button, Text, View } from 'react-native';
import { useState } from 'react';

const RemoveTask = ({tasktoRemove, tasks, setTasks}) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const handleRemove = async () => {
    setIsRemoving(true);

    Alert.alert(
      `Remove task ${tasktoRemove.key}?`,
      'Are you sure you want to remove this task?',
      [
        { text: 'Cancel', style: 'cancel', onPress: () => setIsRemoving(false) },
        { text: 'Remove', style: 'destructive', onPress: doRemove },
      ],
    );
  };

  const doRemove = async () => {
    console.log("Tasks before removal:", tasks);
    const newTasks = tasks.filter(task => {
      console.log("Comparing task key", task.key, tasktoRemove.key);
      return task.key !== tasktoRemove.key;
    });
    console.log("New tasks after removal:", newTasks);
    await AsyncStorage.setItem('@tasks', JSON.stringify(newTasks));
    setTasks(newTasks);
    setIsRemoving(false);
  };

  console.log("Task to remove:", tasktoRemove);

  return (
    <View>
      {isRemoving ? (
        <Text>Removing...</Text>
      ) : (
        <Button title="Remove" onPress={handleRemove} />
      )}
    </View>
  );
};

export default RemoveTask;




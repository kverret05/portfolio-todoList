import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Button, Text, View } from 'react-native';
import { useState } from 'react';

const RemoveTask = ({tasktoRemove, tasks, setTasks}) => {
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
    const newTasks = tasks.filter(task => task.key !== tasktoRemove.key);
    await AsyncStorage.setItem('@tasks', JSON.stringify(newTasks));
    setTasks(newTasks);
    setIsRemoving(false);
  };

  const [isRemoving, setIsRemoving] = useState(false);

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

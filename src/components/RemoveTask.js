import AsyncStorage from "@react-native-async-storage/async-storage";

const RemoveTask = async (tasktoRemove, tasks, setTasks) => {
  let newTasks = tasks.filter((task) => task.key !== tasktoRemove.key);
  setTasks(newTasks);
  console.log(newTasks);
  await AsyncStorage.setItem("@tasks", JSON.stringify(newTasks));
};

export default RemoveTask;

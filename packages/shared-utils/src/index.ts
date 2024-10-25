import * as TaskManager from 'expo-task-manager'
import * as BackgroundFetch from 'expo-background-fetch'

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const registerBackgroundTask = async <T>(
  taskName: string,
  taskFunction: () => Promise<T>,
  intervalInSeconds = 15 * 60 // Default interval of 15 minutes
): Promise<void> => {
  try {
    // Define the task using Expo Task Manager
    TaskManager.defineTask(taskName, async () => {
      try {
        const result = await taskFunction()

        console.log(`${taskName} completed`, result)

        // We can log or handle the result here
        return result ? BackgroundFetch.BackgroundFetchResult.NewData : BackgroundFetch.BackgroundFetchResult.NoData
      }
      catch (error) {
        console.error(`${taskName} failed`, error)
        return BackgroundFetch.BackgroundFetchResult.Failed
      }
    })

    // Register the background task with the desired interval
    await BackgroundFetch.registerTaskAsync(taskName, {
      minimumInterval: intervalInSeconds, // Default interval of 15 minutes
      stopOnTerminate: false, // Keep the task running even if the app is terminated
      startOnBoot: true // Start the task when the device is rebooted
    })

    console.log(`Background task ${taskName} registered successfully`)
  }
  catch (error) {
    console.error(`Failed to register background task ${taskName}`, error)
  }
}

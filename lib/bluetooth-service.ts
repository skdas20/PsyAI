// This is a simplified demonstration of a Bluetooth service
// In a real implementation, this would use the Web Bluetooth API

export interface SensorData {
  timestamp: number
  heartRate: number
  gsrValue: number
  stressLevel: number
}

export interface BluetoothDevice {
  id: string
  name: string
  connected: boolean
}

class BluetoothService {
  private device: BluetoothDevice | null = null
  private listeners: ((data: SensorData) => void)[] = []
  private interval: NodeJS.Timeout | null = null

  // Connect to a Bluetooth device
  async connect(): Promise<BluetoothDevice> {
    // In a real implementation, this would use the Web Bluetooth API
    // to connect to an Arduino or other IoT device

    // For demonstration purposes, we'll simulate a connection
    return new Promise((resolve) => {
      setTimeout(() => {
        this.device = {
          id: "arduino-nano-33-ble",
          name: "Arduino Nano 33 BLE",
          connected: true,
        }

        // Start simulating data
        this.startDataSimulation()

        resolve(this.device)
      }, 1500)
    })
  }

  // Disconnect from the device
  disconnect(): void {
    if (this.device) {
      this.device.connected = false
      this.device = null

      // Stop simulating data
      if (this.interval) {
        clearInterval(this.interval)
        this.interval = null
      }
    }
  }

  // Check if a device is connected
  isConnected(): boolean {
    return this.device !== null && this.device.connected
  }

  // Get the connected device
  getDevice(): BluetoothDevice | null {
    return this.device
  }

  // Add a data listener
  addDataListener(listener: (data: SensorData) => void): void {
    this.listeners.push(listener)
  }

  // Remove a data listener
  removeDataListener(listener: (data: SensorData) => void): void {
    this.listeners = this.listeners.filter((l) => l !== listener)
  }

  // Simulate data from the device
  private startDataSimulation(): void {
    // Initial values
    let heartRate = 70 + Math.floor(Math.random() * 20)
    let gsrValue = 500 + Math.floor(Math.random() * 500)

    // Simulate data every 1 second
    this.interval = setInterval(() => {
      // Simulate changes in heart rate and GSR
      heartRate += Math.floor(Math.random() * 5) - 2 // -2 to +2
      heartRate = Math.max(60, Math.min(100, heartRate))

      gsrValue += Math.floor(Math.random() * 100) - 50 // -50 to +50
      gsrValue = Math.max(300, Math.min(1000, gsrValue))

      // Calculate stress level (0-100)
      // Higher GSR and heart rate indicate higher stress
      const heartRateNormalized = (heartRate - 60) / 40 // 60-100 -> 0-1
      const gsrNormalized = (gsrValue - 300) / 700 // 300-1000 -> 0-1

      // Weighted average for stress level
      const stressLevel = Math.floor((0.7 * gsrNormalized + 0.3 * heartRateNormalized) * 100)

      // Create sensor data object
      const data: SensorData = {
        timestamp: Date.now(),
        heartRate,
        gsrValue,
        stressLevel,
      }

      // Notify all listeners
      this.listeners.forEach((listener) => listener(data))
    }, 1000)
  }

  // Scan for available devices
  async scanForDevices(): Promise<BluetoothDevice[]> {
    // In a real implementation, this would scan for nearby Bluetooth devices
    // For demonstration purposes, we'll return a list of simulated devices
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "arduino-nano-33-ble",
            name: "Arduino Nano 33 BLE",
            connected: false,
          },
          {
            id: "heart-rate-monitor",
            name: "Heart Rate Monitor",
            connected: false,
          },
          {
            id: "gsr-sensor",
            name: "GSR Sensor",
            connected: false,
          },
        ])
      }, 2000)
    })
  }
}

// Export a singleton instance
export const bluetoothService = new BluetoothService()


import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Represents a handler for AsyncStorage operations.
 * @class
 * @constructor
 * @param {string} key - The key used to store the values in AsyncStorage.
 */
class StorageHandler {
  constructor(key) {
    this.key = key;
  }

  /**
   * Retrieves all the values stored in AsyncStorage.
   * @async
   * @returns {Promise<Array>} A promise that resolves to an array of values.
   */
  async getValues() {
    try {
      const values = await AsyncStorage.getItem(this.key);
      return values ? JSON.parse(values) : [];
    } catch (e) {
      console.log(e);
    }
  }
  
  /**
   * Retrieves a specific value from AsyncStorage based on its ID.
   * @async
   * @param {string} id - The ID of the value to retrieve.
   * @returns {Promise<Object>} A promise that resolves to the value object.
   */
  async getValue(id) {
    try {
      const values = await this.getValues();
      return values.find((value) => value.id === id);
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Retrieves a specific value from AsyncStorage based on a field and its value.
   * @async
   * @param {string} field - The field to search for.
   * @param {any} value - The value to match.
   * @returns {Promise<Object>} A promise that resolves to the value object.
   */
  async getValueByField(field, value) {
    try {
      const values = await this.getValues();
      return values.find((item) => item[field] === value);
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Sets a new value in AsyncStorage.
   * @async
   * @param {Object} value - The value object to store.
   */
  async setValue(value) {
    try {
      const previousValues = await this.getValues() || [];
      await AsyncStorage.setItem(this.key, JSON.stringify([...previousValues, value]));
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Removes a value from AsyncStorage based on its ID.
   * @async
   * @param {string} id - The ID of the value to remove.
   */
  async removeValue(id) {
    try {
      const previousValues = await this.getValues() || [];
      const newValues = previousValues.filter((value) => value.id !== id);
      await AsyncStorage.setItem(this.key, JSON.stringify(newValues));
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Updates a value in AsyncStorage based on its ID.
   * @async
   * @param {string} id - The ID of the value to update.
   * @param {Object} newValue - The updated value object.
   */
  async updateValue(id, newValue) {
    try {
      const previousValues = await this.getValues() || [];
      const newValues = previousValues.map((value) => {
        if (value.id === id) {
          return newValue;
        }
        return value;
      });
      await AsyncStorage.setItem(this.key, JSON.stringify(newValues));
    } catch (e) {
      console.log(e);
    }
  }
}

export const usersStorage = new StorageHandler('@taskfy:users');
export const tasksStorage = new StorageHandler('@taskfy:tasks');
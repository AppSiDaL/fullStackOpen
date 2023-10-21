const express = require('express');
const {getAsync,setAsync} = require('../redis/index');
const router = express.Router();

async function getKey(key) {
  try {
    const value = await getAsync(key);
    console.log('Value:', value);
    return value
  } catch (error) {
    console.error('Error getting the key:', error);
  }
}

async function setKey(key, value) {
  try {
    await setAsync(key, value);
    console.log("Key set successfully.");
  } catch (error) {
    console.error("Error setting the key:", error);
  }
}

router.get('/', async (_, res) => {
  let value =await getKey("added")
  console.log("first",value);
  if (value==null) {
      await setKey("added", 0);
      console.log("added")
  }
  value =await getKey("added")
  res.json({added_todos:value});
});

module.exports = router;

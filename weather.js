#!/usr/bin/env node

import { getArgs } from './helpers/args.js' ;
import { getWeather } from './services/api.service.js';
import { printHelp, printSuccess, printError } from './services/log.service.js';
import { saveKeyValue } from './services/storage.service.js';


const saveToken = async (token) => {
  if(!token.length) {
    printError('token not transferred');
    return;
  }
  try {
    await saveKeyValue('token', token)
    printSuccess('token saved')
  } catch (e) {
    printError(e.message)
  }
}

const getForcast = async () => {
  try {
    const weather = await getWeather('ufa');
    console.log(weather);
  } catch (e) {
    if(e?.response?.status == 404) {
      printError('the city is incorrect')
    } else if(e?.response?.status == 401) {
      printError('the token is incorrect')
    } else {
      printError(e.message);
    }
  }
}

const initCLI = () => {
  const args = getArgs(process.argv);
  if(args.h) {
    printHelp()
  }
  if(args.s) {
    //save city
  }
  if(args.t) {
    return saveToken(args.t);
    // token
  }
  getForcast()
}

initCLI()
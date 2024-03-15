#!/usr/bin/env node

import { getArgs } from './helpers/args.js' ;
import { getWeather } from './services/api.service.js';
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js';
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

const saveCity = async (city) => {
  if (!city.length) {
    printError('city not saved');
    return;
  }
  try {
    await saveKeyValue('city', city)
    printSuccess('city saved')
  } catch (e) {
    printError(e.message)
  }
}

const getForcast = async () => {
  try {
    const weather = await getWeather();
    printWeather(weather);
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
    return printHelp()
  }
  if(args.s) {
    return saveCity(args.s)
  }
  if(args.t) {
    return saveToken(args.t);
  }
  getForcast()
}

initCLI()
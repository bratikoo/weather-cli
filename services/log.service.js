import chalk from 'chalk';
import dedent from 'dedent-js';

const getIcon = (icon) => {
	switch (icon.slice(0, -1)) {
		case '01':
			return '☀️';
		case '02':
			return '🌤️';
		case '03':
			return '☁️';
		case '04':
			return '☁️';
		case '09':
			return '🌧️';
		case '10':
			return '🌦️';
		case '11':
			return '🌩️';
		case '13':
			return '❄️';
		case '50':
			return '🌫️';
	}
};

const printError  = (error) => {
  console.log(chalk.bgRed(" ERROR ") + " " + error);
}

const printSuccess = (message) => {
  console.log(chalk.bgGreen(" SUCCESS ") + " " + message);
}

const printWeather = (data) => {
  console.log(
    dedent`
    Location📍: ${data.name}
    Temperature🌡️: ${Math.round(data.main.temp)} °C (feels like ${Math.round(data.main.feels_like)} °C)
    ${getIcon(data.weather[0].icon)}   ${data.weather[0].description}
    `
    );
}


const printHelp = () => {
  console.log(
    dedent`${chalk.bgCyan(" HELP ")} 
    'Without params - view weather
    -s [CITY] set city
    -h help
    -t [API_KEY] save token
    `
  );
}


export { printError, printSuccess, printHelp, printWeather}
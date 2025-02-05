import YAML from 'yaml';
import path from 'path';
import fs from 'fs';

function sar(str, sarObj) {
	for (const key in sarObj) {
		str = str.replaceAll(key, sarObj[key]);
	}
	return str;
}

function getSarObj(confReplacesList: any[], upReplacesList: string[]) {
	let sarObj = {};
	confReplacesList.forEach(item => {
		for (const key in item) {
			if (upReplacesList.includes(key)) {
				sarObj = { ...sarObj, ...item[key][0] };
			}
		}
	});
	return sarObj;
}

function createRecursiveFolder(folderPath: string) {
	if (!fs.existsSync(folderPath)) {
		const previousFolderPath = folderPath
			.split('/')
			.slice(0, -1)
			.join('/');
		createRecursiveFolder(previousFolderPath);
		fs.mkdirSync(folderPath);
	}
}

console.log(`START`);
const content = fs.readFileSync(path.join(__dirname, '../toto.yaml'), { encoding: 'utf8' });

const configFile = YAML.parse(content);

// Files get folders...
// Create Folders if they don't exsist .fft, modulename, ... ui, ...

configFile.up.forEach(up => {
	up.files.forEach((file: string) => {
		const sarObj = getSarObj(configFile.replacesList, up.replacesList);
		const fileName = path.basename(file);
		const folders = file.split('/').slice(0, -1);
		const fileFrom = path.join(up.basePathFrom, file);
		const fileContent = fs.readFileSync(fileFrom, { encoding: 'utf8' }).split('\n');
		const fileTo = path.join(up.basePathTo, ...folders, sar(fileName, sarObj));

		const dirTo = fileTo
			.split('/')
			.slice(0, -1)
			.join('/');
		createRecursiveFolder(dirTo);

		let pushLine = true;
		let specialLine = false;
		let preLineStart = '';
		let preLineEnd = '';
		let fileContentNew = [];
		for (let i = 0; i < fileContent.length; i++) {
			specialLine = false;

			// Pre Delete
			const preKeyWordDelete = fileContent[i].split('//kitql Delete');
			if (preKeyWordDelete.length > 1) {
				specialLine = true;
				pushLine = !pushLine;
			}

			// Pre Comment
			const preKeyWordCom = fileContent[i].split('//kitql C(');
			if (preKeyWordCom.length > 1) {
				specialLine = true;
				const preFrom = preKeyWordCom[1].split(')')[0];
				if (preLineStart !== '') {
					preLineStart = '';
					preLineEnd = '';
				} else {
					if (preFrom === 'ts') {
						preLineStart = '//';
					}
				}
			}

			// Pre replace
			const preKeyWord = fileContent[i].split('//kitql R(');
			if (preKeyWord.length > 1) {
				const preFrom = preKeyWord[1].split(')(')[0];
				const preTo = preKeyWord[1].split(')(')[1].split(')')[0];

				fileContent[i] = preKeyWord[0].replaceAll(preFrom, preTo);
			}

			if (!specialLine && pushLine) {
				fileContentNew.push(preLineStart + fileContent[i] + preLineEnd);
			}
		}

		fs.writeFileSync(fileTo, sar(fileContentNew.join('\n'), sarObj), { encoding: 'utf8' });
	});
});

console.log(`DONE`);

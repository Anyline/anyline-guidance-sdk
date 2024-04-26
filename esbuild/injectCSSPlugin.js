import fs from 'fs';
import path from 'path';
import postcss from 'postcss';
import postcssModules from 'postcss-modules';
import { fileURLToPath } from 'url';

const pluginName = 'css-modules-plugin';

export const injectCSSPlugin = baseDir => {
	return {
		name: pluginName,
		setup(build) {
			let allCSS = '';

			build.onResolve({ filter: /\.css$/ }, args => {
				return {
					path: path.resolve(args.resolveDir, args.path),
					namespace: 'css',
				};
			});

			build.onLoad({ filter: /.*/, namespace: 'css' }, async args => {
				const css = await fs.promises.readFile(args.path, 'utf8');
				let cssModulesJSON = {};
				const result = await postcss([
					postcssModules({
						getJSON(cssFileName, json, outputFileName) {
							cssModulesJSON = json;
						},
					}),
				]).process(css, { from: args.path });

				allCSS += result.css;

				return {
					contents: `export default ${JSON.stringify(cssModulesJSON)};`,
					loader: 'js',
				};
			});

			build.onEnd(async result => {
				const _filename = fileURLToPath(import.meta.url);
				const _dirname = path.dirname(_filename);
				const filePath = path.join(_dirname, baseDir, 'index.js');
				fs.readFile(filePath, 'utf8', (err, data) => {
					if (err != null) {
						console.error('Error reading the file:', err);
						return;
					}
					const regex =
						/(\w+)\.id="anyline-guidance-sdk-style",\1\.textContent=""/;
					const replacement = `$1.id="anyline-guidance-sdk-style",$1.textContent=\`${allCSS}\``;
					const updatedData = data.replace(regex, replacement);
					fs.writeFile(filePath, updatedData, 'utf8', err => {
						if (err != null) {
							console.error('Error writing to the file:', err);
						}
					});
				});
			});
		},
	};
};

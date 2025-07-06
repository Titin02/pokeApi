import fs from 'fs/promises'

const inputPath = './pokemonList.json'
const outputPath = './pokemonFullList.json'

async function main() {
	try {
		const raw = await fs.readFile(inputPath, 'utf-8')
		const list = JSON.parse(raw)

		const extended = await Promise.all(
			list.map(async (pokemon) => {
				const id = pokemon.id || pokemon.url.split('/').filter(Boolean).pop()
				let generation = 'unknown'

				try {
					const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
					const speciesData = await speciesRes.json()
					generation = speciesData.generation.name
				} catch (e) {
					console.warn(`No se pudo obtener generación para ID ${id}:`, e.message)
				}

				return {
					...pokemon,
					id: Number(id),
					generation,
				}
			})
		)

		await fs.writeFile(outputPath, JSON.stringify(extended, null, 2), 'utf-8')
		console.log(`Archivo generado con ${extended.length} pokemon en ${outputPath}`)
	} catch (e) {
		console.error('Error:', e.message)
	}
}

main()

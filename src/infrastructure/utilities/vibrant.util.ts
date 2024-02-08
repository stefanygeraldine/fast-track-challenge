import Vibrant from 'node-vibrant/lib/bundle'

interface IVibrant {
  vibrant: string
  light: string
}

export const getPalette = async (img: string): Promise<IVibrant> => {
  const vibrant = await Vibrant.from(img ?? '')
    .getPalette()
    .then((palette) => {
      const vibrant = palette.Vibrant?.hex ?? '#132939'
      const light = palette.LightVibrant?.hex ?? '#132939'
      return {
        vibrant,
        light
      }
    })
  return vibrant
}

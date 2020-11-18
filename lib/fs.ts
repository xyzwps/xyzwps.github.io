import fse from "fs-extra"

export async function readTextFile(filePath: string): Promise<string> {
  const file = await fse.readFile(filePath)
  return file.toString()
}

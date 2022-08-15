import { NextApiResponse, NextApiRequest, PageConfig } from 'next'
import formidable from 'formidable'
import fs from 'fs'
//IPFS
import { addFileToIpfs } from '@ipfs/methods'
//Types
import { UploadResponse } from '@roottypes/api/files'

export const config: PageConfig = {
  api: {
    bodyParser: false
  }
}

const handleFileParsing = (_req: NextApiRequest): Promise<Buffer> => new Promise((resolve, reject) => {
  const form = formidable({ multiples: false })

  form.parse(_req, (err, _, files) => {
    if (!err) {
      const filePath = (files.file as formidable.File).filepath
      const data = fs.readFileSync(filePath)
      fs.unlinkSync(filePath)

      resolve(data)
    } else {
      reject(err)
    }
  })
})

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<UploadResponse>
) {
  try {
    const file = await handleFileParsing(_req)
    const ipfsResult = await addFileToIpfs(file)

    return res.status(200).json({
      error: null,
      hash: ipfsResult.payload?.path
    })
  } catch (error) {
    const err = error as Error
    console.log(error, 'error')
    return res.status(500).json({
      error: err,
      hash: null
    })
  }
}
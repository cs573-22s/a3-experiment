import { DatasetRow } from 'Types/DatasetRow'

// Schema of the entire dataset taken in
export type Dataset = {
  id: string,
  type: string,
  data: DatasetRow[]
}

import axios from 'axios'

type NamesPayload = string[] | { names: string[] }

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string')

export const fetchNames = async (url = '/names.json'): Promise<string[]> => {
  const res = await axios.get<NamesPayload>(url, { responseType: 'json' })
  const payload = res.data

  if (isStringArray(payload)) {
    return payload.map((name) => name.trim()).filter(Boolean)
  }

  if (payload && typeof payload === 'object' && 'names' in payload && isStringArray(payload.names)) {
    return payload.names.map((name) => name.trim()).filter(Boolean)
  }

  throw new Error('names.json 格式不正确，期望 string[] 或 { names: string[] }')
}

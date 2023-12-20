import localforage from 'localforage';

export const useMemoData = async () => {
    let memoStoreCacheData: string = await localforage.getItem<string>('memoData') || '';
    let memoStoreData: Array<NoteDataItem> = [];
    try {
        memoStoreData = JSON.parse(memoStoreCacheData);
    } catch (error) {
        memoStoreData = [];
    }
    return memoStoreData;
}

export const useSetMemoData = async (data: Array<NoteDataItem>, isGetCache = true) => {
    let memoStoreCacheData = isGetCache ? await useMemoData() : [];
    let memoStoreData: Array<NoteDataItem> = [
        ...memoStoreCacheData,
        ...data
    ];
    localforage.setItem('memoData', JSON.stringify(memoStoreData));
}